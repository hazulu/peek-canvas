import { Container, Sprite } from "pixi.js"


// Canvas is a class that contains a container, all images / image manipulation are managed in this class
// Methods to manipulate the canvas are provided to the application

export default class FeatureApplicationCanvas {

    #scene: Container;
    #imageLayers: Map<number, Sprite>;

    constructor() {
        this.#scene = new Container();
        this.#imageLayers = new Map<number, Sprite>();
    }

    getScene(): Container {
        return this.#scene;
    }

    removeLayer(layerId: number): void {
        this.#imageLayers.delete(layerId);
    }

    // createLayer

    // assignImageToLayer

    // addImage

}