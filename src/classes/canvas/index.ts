import { Container, Sprite, Graphics } from "pixi.js"


// Canvas is a class that contains a container, all images / image manipulation are managed in this class
// Methods to manipulate the canvas are provided to the application

export default class FeatureApplicationCanvas {

    #scene: Container;
    #imageLayers: Map<number, Sprite>;

    constructor() {
        this.#scene = new Container();
        this.#imageLayers = new Map<number, Sprite>();
        this.debugTest();
    }

    getScene(): Container {
        return this.#scene;
    }

    removeLayer(layerId: number): void {
        this.#imageLayers.delete(layerId);
    }

    debugTest(): void {
        const square = new Graphics();
        square.beginFill(0xffffff);
        square.drawRect(0, 0, 1000, 1000);
        square.endFill();
        this.#scene.addChild(square);
    }

    // createLayer

    // assignImageToLayer

    // addImage

}