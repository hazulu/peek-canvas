import { Application, settings, SCALE_MODES, Point, InteractionEvent } from 'pixi.js'
import { ShaderSystem } from "@pixi/core";
import { install } from "@pixi/unsafe-eval";
import { Viewport } from 'pixi-viewport'
import FeatureApplicationCanvas from '../canvas'
import { MAX_ZOOM, MIN_ZOOM } from '@/util/global';
import { ApplicationSaveData } from '@/types/canvas';

type FeatureApplicationOptions = {
}

type FlickerState = 'on' | 'off'

const DOCUMENT_WIDTH: number = 1000;
const DOCUMENT_HEIGHT: number = 1000;
const SCALE_FACTOR: number = 0.025;

export default class FeatureApplication {

    #application: Application;
    #canvas: FeatureApplicationCanvas;
    #viewport: Viewport;
    ready: Boolean = false;

    #mouseDown: boolean = false;
    #mouseDownAt = [0, 0];

    #selectedTool: number = 0;
    #selectedLayer: number = 0;

    #isDragging: boolean = false;

    #flickerTimer: ReturnType<typeof setInterval> | undefined = undefined;
    #flickerCount: number = 0;
    #flickerState: FlickerState = 'off';

    #updateCursorEvent: Function | null = null;
    #updateZoomEvent: Function | null = null;

    constructor(width: number, height: number, options: FeatureApplicationOptions | null) {
        // Install Unsafe-eval Fix For Pixi.js
        install({ ShaderSystem });

        this.#application = new Application({
            width,
            height,
            backgroundAlpha: 0,
            resolution: window.devicePixelRatio || 1,
            autoDensity: true,
        });

        settings.SCALE_MODE = SCALE_MODES.NEAREST;

        this.#viewport = this.buildViewport(width, height);
        this.#application.stage.addChild(this.#viewport);

        this.#canvas = new FeatureApplicationCanvas();
        this.#viewport.addChild(this.#canvas.getScene());

        this.#application.renderer.on("resize", (e) => {
            // console.log('called!')
            const { width, height } = this.#application.renderer
            this.#viewport.resize(width, height);
            this.#application.render();
        });

        this.#viewport.on("mousedown", e => this.onViewportMouseDown(e));
        this.#viewport.on("mouseup", e => this.onViewportMouseUp(e));
        this.#viewport.on("mousemove", e => this.onViewportMouseMove(e));
        this.#viewport.on("drag-start", e => this.onViewportDragStart(e));
        this.#viewport.on("drag-end", e => this.onViewportDragEnd(e));
        this.#viewport.on("zoomed", e => this.onViewportZoom(e));

        this.ready = true;
        this.update();
    }

    buildViewport(width: number, height: number): Viewport {
        const viewport = new Viewport({
            screenWidth: width,
            screenHeight: height,
            worldWidth: DOCUMENT_WIDTH,
            worldHeight: DOCUMENT_HEIGHT,
            interaction: this.#application.renderer.plugins.interaction,
            passiveWheel: false,
            disableOnContextMenu: true,
        });

        viewport
            .clampZoom({
                minScale: MIN_ZOOM,
                maxScale: MAX_ZOOM,
            })
            .drag({
                mouseButtons: 'right'
            })
            .pinch()
            .wheel({
                smooth: 15,
            });

        return viewport;
    }

    start(onComplete: Function): void {
        this.ready = true;
        // this.centerViewport();
        // this.viewport.setZoom(2);
        onComplete(this.getApplicationView());
    }

    stop(): void {
        this.ready = false;
        this.#application.stop();
    }

    getApplicationView(): HTMLWebViewElement {
        return this.#application.view;
    }

    setParent(parent: HTMLElement): void {
        this.#application.resizeTo = parent;
    }

    onViewportMouseDown(e: InteractionEvent): void {
        const { x, y } = this.#viewport.toWorld(e.data.global);
        const position = [Math.floor(x), Math.floor(y)];

        this.#mouseDown = true;
        this.#mouseDownAt = position;
    }

    onViewportMouseUp(e: InteractionEvent): void {
        this.#mouseDown = false;
    }

    onViewportMouseMove(e: InteractionEvent): void {
        // Handle
        if (this.#mouseDown) {
            // Add Switch For Action Type
            const { x, y } = this.#viewport.toWorld(e.data.global);
            const position = [Math.floor(x), Math.floor(y)];

            const differenceX = position[0] - this.#mouseDownAt[0];
            const differenceY = position[1] - this.#mouseDownAt[1];

            const layerId = this.#selectedLayer;

            switch (this.#selectedTool) {
                case 0:
                    this.#canvas.moveLayerPositionByAmount(differenceX, differenceY, layerId);
                    break;
                case 1:
                    this.#canvas.moveLayerScaleByAmount(differenceX * SCALE_FACTOR, layerId);
                    break;
                default: break;
            }

            this.#mouseDownAt = position;
        };
    }

    onViewportZoom(e: any): void {
        if (e.viewport?.scale?.x)
            this.updateZoom(e.viewport.scale.x);
    }

    onViewportDragStart(e: InteractionEvent): void {
        this.#isDragging = true;
        this.updateCursor();
    }

    onViewportDragEnd(e: InteractionEvent): void {
        this.#isDragging = false;
        this.updateCursor();
    }

    onUpdateCursor(cb: Function): void {
        this.#updateCursorEvent = cb;
        this.updateCursor();
    }

    onUpdateZoom(cb: Function): void {
        this.#updateZoomEvent = cb;
    }

    updateCursor(): void {
        let cursor;
        
        if (this.#isDragging)
            cursor = 'cursor-grabbing';
        else
            switch (this.#selectedTool) {
                case 0:
                    cursor = 'cursor-all-scroll';
                    break;
                case 1:
                    cursor = 'cursor-ne-resize';
                    break;
                default:
                    cursor = 'cursor-default';
            }

        if (typeof this.#updateCursorEvent === 'function')
            this.#updateCursorEvent(cursor);
    }

    updateZoom(zoom: number): void {
        // pass zoom value into callback
        if (this.#updateZoomEvent)
            this.#updateZoomEvent(zoom);
    }

    selectTool(toolId: number): void {
        this.#selectedTool = toolId;
        this.updateCursor();
    }

    selectLayer(layerId: number): void {
        if (this.getLayerCount() <= 0)
            return;

        if (this.#flickerTimer != undefined)
            this.resetFlicker(this.#selectedLayer);

        const interval = this.onFlicker.bind(this);
        this.#flickerTimer = setInterval(() => interval(layerId), 110);

        this.#selectedLayer = layerId;
    }

    deleteLayer(layerId: number) {
        if (layerId >= this.getLayerCount()) return;

        const newLayerCount = this.#canvas.removeLayer(layerId);
        const newSelectedLayer = layerId >= newLayerCount ? layerId - 1 : layerId;

        this.selectLayer(newSelectedLayer);

        return {
            layerCount: newLayerCount,
            selectedLayer: newSelectedLayer
        }
    }

    addImageLayer(base64: string): number {
        return this.#canvas.addImage(this.#viewport.center, base64);
    }

    getLayerCount(): number {
        return this.#canvas.getLayerCount();
    }

    resetFlicker(layerId: number): void {
        this.#canvas.setLayerOpacity(1, layerId);
        this.#flickerCount = 0;
        clearInterval(this.#flickerTimer);
        this.#flickerTimer = undefined;
    }

    onFlicker(layerId: number): void {
        if (this.#flickerCount >= 4)
            return this.resetFlicker(layerId);

        switch (this.#flickerState) {
            case 'on':
                this.#canvas.setLayerOpacity(1, layerId);
                this.#flickerCount++;
                this.#flickerState = 'off';
                break;
            case 'off':
                this.#canvas.setLayerOpacity(0.65, layerId);
                this.#flickerState = 'on';
                break;
        }
    }

    setZoom(zoom: number): void {
        this.#viewport.setZoom(zoom, true);
    }

    getApplicationSaveData(): ApplicationSaveData {
        return {
            layerData: this.#canvas.getCanvasSaveData(),
            viewport: {
                zoom: this.#viewport.scale.x,
                position: {
                    x: this.#viewport.position.x,
                    y: this.#viewport.position.y
                }
            }
        };
    }

    loadApplicationSaveData(saveData: ApplicationSaveData): void {
        this.#canvas.reset();
        this.#viewport.position.set(0, 0);
        this.#viewport.setZoom(1);

        if (saveData.layerData) {
            saveData.layerData.forEach(layer => {
                const id = this.#canvas.addImage(layer.position as Point, layer.imageDataBase64);
                this.#canvas.setLayerScale(layer.scale, id - 1);
            });
        }
        if (saveData.viewport) {
            const { position: { x, y }, zoom } = saveData.viewport;
            this.#viewport.position.set(x, y);
            this.#viewport.setZoom(zoom);
            if (this.#updateZoomEvent)
                this.#updateZoomEvent(zoom);
        }
    }

    update() : void {
        if (this.ready) {
            this.#application.render();
        }
        requestAnimationFrame(this.update.bind(this));
    }
}