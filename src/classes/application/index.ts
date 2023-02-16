import { Application, settings, SCALE_MODES, Point } from 'pixi.js'
import { ShaderSystem } from "@pixi/core";
import { install } from "@pixi/unsafe-eval";
import { Viewport } from 'pixi-viewport'
import FeatureApplicationCanvas from '../canvas'

type FeatureApplicationOptions = {
}

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

    constructor(width: number, height: number, options: FeatureApplicationOptions | null) {
        // Install Unsafe-eval Fix For Pixi.js
        install({ ShaderSystem });

        this.#application = new Application({
            width,
            height,
            backgroundColor: 0x333333,
            resolution: window.devicePixelRatio || 1,
            autoDensity: true
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
        });

        this.#viewport.on("mousedown", e => {
            const { x, y } = e.data.global;
            const position = [Math.floor(x), Math.floor(y)];

            this.#mouseDown = true;
            this.#mouseDownAt = position;
        });

        this.#viewport.on("mouseup", e => {
            this.#mouseDown = false;
            console.log('Mouse Up!');
        });

        this.#viewport.on("mousemove", e => {
            // Handle
            if (this.#mouseDown) {
                // Add Switch For Action Type
                const { x, y } = e.data.global;
                const position = [Math.floor(x), Math.floor(y)];

                const differenceX = position[0] - this.#mouseDownAt[0];
                const differenceY = position[1] - this.#mouseDownAt[1];
                this.#canvas.moveLayerPositionByAmount(differenceX, differenceY, 0);
                this.#mouseDownAt = position;
            };
        });

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
            // .clampZoom({
            //     minScale: 1,
            //     maxScale: 50,
            // })
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

    update() : void {
        if (this.ready) {
            this.#application.render();
        }
        requestAnimationFrame(this.update.bind(this));
    }
}