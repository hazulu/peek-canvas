import { clamp } from "@/util/math";
import { Container, Sprite, Graphics, Point } from "pixi.js"


// Canvas is a class that contains a container, all images / image manipulation are managed in this class
// Methods to manipulate the canvas are provided to the application

export default class FeatureApplicationCanvas {

    #scene: Container;
    #imageLayers: Array<Sprite>;

    constructor() {
        this.#scene = new Container();
        this.#imageLayers = [];

        this.setupOriginSquare();
    }

    setupOriginSquare(): void {
        const square = new Graphics();
        square.beginFill(0xffffff);
        square.drawRect(0, 0, 32, 32);
        square.endFill();
        this.#scene.addChild(square);
    }

    getScene(): Container {
        return this.#scene;
    }

    removeLayer(layerId: number): void {
        this.#imageLayers.splice(layerId, 1);
    }

    selectLayer(layerId: number): void {
        return;
    }

    getLayerCount(): number {
        return this.#imageLayers.length;
    }

    addImage(position: Point, base64: string): number {
        const image: Sprite = Sprite.from(base64);
        image.anchor.set(0.5);
        image.x = position.x;
        image.y = position.y;
        this.#scene.addChild(image);
        const count = this.#imageLayers.push(image);
        return count;
    }

    setLayerPosition(x: number, y: number, layerId: number): void {
        const layer = this.#imageLayers[layerId];

        if (layer) {
            layer.position.x = x;
            layer.position.y = y;
        }
    }

    setLayerScale(scale: number, layerId: number): void {
        const layer = this.#imageLayers[layerId];

        if (layer) {
            layer.scale.x = scale;
            layer.scale.y = scale;
        }
    }

    moveLayerPositionByAmount(x: number, y: number, layerId: number): void {
        const layer = this.#imageLayers[layerId];

        if (layer) {
            const newX = layer.position.x + x;
            const newY = layer.position.y + y;
            this.setLayerPosition(newX, newY, layerId);
        }
    }

    moveLayerScaleByAmount(scale: number, layerId: number): void {
        const layer = this.#imageLayers[layerId];

        if (layer) {
            const newScale = layer.scale.x + scale;
            const clampedScale = clamp(newScale, 0.01, 100);

            this.setLayerScale(clampedScale, layerId);
        }
    }

}