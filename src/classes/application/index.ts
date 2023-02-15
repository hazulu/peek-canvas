import { Application, settings, SCALE_MODES, Point } from 'pixi.js'
import { Viewport } from 'pixi-viewport'
import FeatureApplicationCanvas from 'Components/canvas'

type FeatureApplicationOptions = {
}

const DOCUMENT_WIDTH: number = 1000;
const DOCUMENT_HEIGHT: number = 1000;

export default class FeatureApplication {

    #application: Application;
    #canvas: any;
    #viewport: Viewport;
    ready: Boolean = false;

    constructor(width: number, height: number, options: FeatureApplicationOptions | null) {

        this.#application = new Application({
            width,
            height,
            backgroundColor: 0x333333,
            resolution: window.devicePixelRatio || 1,
            autoDensity: true
        });

        this.#application.renderer.on("resize", (e) => {
            console.log('resized!!!')

            const { clientWidth, clientHeight } = this.#application.view.parentNode;
            
            this.#application.resize();
            this.#viewport.resize(clientWidth, clientHeight);
        });

        // settings.SCALE_MODE = SCALE_MODES.NEAREST;

        this.#canvas = new FeatureApplicationCanvas();

        this.#viewport = this.buildViewport(width, height);
        this.#viewport.addChild(this.#canvas.getScene());

        this.update();
    }

    buildViewport(width: number, height: number): Viewport {
        const bleed = 10;

        const viewport = new Viewport({
            screenWidth: width,
            screenHeight: height,
            worldWidth: DOCUMENT_WIDTH,
            worldHeight: DOCUMENT_HEIGHT,
            interaction: this.#application.renderer.plugins.interaction,
            passiveWheel: false,
        });

        viewport
            .clampZoom({
                minScale: 0.75,
                maxScale: 50,
            })
            .drag()
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

    update() : void {
        if (this.ready) {
            this.#application.render();
        }
        requestAnimationFrame(this.update.bind(this));
    }
}