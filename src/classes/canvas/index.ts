import { clamp } from "@/util/math";
import { Container, Sprite, Graphics } from "pixi.js"


// Canvas is a class that contains a container, all images / image manipulation are managed in this class
// Methods to manipulate the canvas are provided to the application

export default class FeatureApplicationCanvas {

    #scene: Container;
    #imageLayers: Map<number, Graphics>;

    constructor() {
        this.#scene = new Container();
        this.#imageLayers = new Map<number, Graphics>();
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
        square.drawRect(0, 0, 100, 100);
        square.endFill();
        this.#scene.addChild(square);
        this.#imageLayers.set(0, square);
        square.pivot.set(50);

        const square2 = new Graphics();
        square2.beginFill(0xcecece);
        square2.drawRect(0, 0, 20, 20);
        square2.endFill();
        this.#scene.addChild(square2);
    }

    // createLayer

    // assignImageToLayer

    // addImage

    setLayerPosition(x: number, y: number, layerId: number): void {
        const layer = this.#imageLayers.get(layerId);

        if (layer) {
            layer.position.x = x;
            layer.position.y = y;
        }
    }

    setLayerScale(scale: number, layerId: number): void {
        const layer = this.#imageLayers.get(layerId);

        if (layer) {
            layer.scale.x = scale;
            layer.scale.y = scale;
        }
    }

    moveLayerPositionByAmount(x: number, y: number, layerId: number): void {
        const layer = this.#imageLayers.get(layerId);

        if (layer) {
            const newX = layer.position.x + x;
            const newY = layer.position.y + y;
            this.setLayerPosition(newX, newY, layerId);
        }
    }

    moveLayerScaleByAmount(scale: number, layerId: number): void {
        const layer = this.#imageLayers.get(layerId);

        if (layer) {
            const newScale = layer.scale.x + scale;
            const clampedScale = clamp(newScale, 0.01, 100);

            this.setLayerScale(clampedScale, layerId);
        }
    }

}