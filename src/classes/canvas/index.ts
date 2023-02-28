import { LayerSaveData } from "@/types/canvas";
import { clamp } from "@/util/math";
import { Container, Sprite, Graphics, Point } from "pixi.js"


// Canvas is a class that contains a container, all images / image manipulation are managed in this class
// Methods to manipulate the canvas are provided to the application

export type CanvasLayerData = {
    imageDataBase64: string,
    spriteRef: Sprite
}

export default class FeatureApplicationCanvas {

    #scene: Container;
    #imageLayers: Array<CanvasLayerData>;

    constructor() {
        this.#scene = new Container();
        this.#imageLayers = [];

        this.setupOriginSquare();
    }

    setupOriginSquare(): void {
        const square = new Graphics();
        square.beginFill(0xffffff);
        square.drawRect(0, 0, 4, 4);
        square.endFill();
        this.#scene.addChild(square);
    }

    getScene(): Container {
        return this.#scene;
    }

    reset(): void {
        this.#scene.removeChildren();
        this.#imageLayers = [];
        this.setupOriginSquare();
    }

    removeLayer(layerId: number): number {
        const image = this.#imageLayers.splice(layerId, 1);
        this.#scene.removeChild(image[0].spriteRef);
        return this.getLayerCount();
    }

    setLayerOpacity(opacity: number, layerId: number): void {
        const layer = this.#imageLayers[layerId];

        if (layer.spriteRef) layer.spriteRef.alpha = opacity;
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
        const count = this.#imageLayers.push({
            imageDataBase64: base64,
            spriteRef: image
        });
        return count;
    }

    setLayerPosition(x: number, y: number, layerId: number): void {
        const layer = this.#imageLayers[layerId];

        if (layer?.spriteRef) {
            layer.spriteRef.position.x = Math.round(x);
            layer.spriteRef.position.y = Math.round(y);
        }
    }

    setLayerScale(scale: number, layerId: number): void {
        const layer = this.#imageLayers[layerId];

        if (layer?.spriteRef) {
            layer.spriteRef.scale.x = scale;
            layer.spriteRef.scale.y = scale;
        }
    }

    moveLayerPositionByAmount(x: number, y: number, layerId: number): void {
        const layer = this.#imageLayers[layerId];

        if (layer?.spriteRef) {
            const newX = layer.spriteRef.position.x + x;
            const newY = layer.spriteRef.position.y + y;
            this.setLayerPosition(newX, newY, layerId);
        }
    }

    moveLayerScaleByAmount(scale: number, layerId: number): void {
        const layer = this.#imageLayers[layerId];

        if (layer?.spriteRef) {
            const newScale = layer.spriteRef.scale.x + scale;
            const clampedScale = clamp(newScale, 0.01, 100);

            this.setLayerScale(clampedScale, layerId);
        }
    }

    getCanvasSaveData(): Array<LayerSaveData> {
        return this.#imageLayers.map(layer => {
            return {
                imageDataBase64: layer.imageDataBase64,
                position: {
                    x: layer.spriteRef.position.x,
                    y: layer.spriteRef.position.y,
                },
                scale: layer.spriteRef.scale.x
            }
        })
    }

}