export type LayerSaveData = {
    imageDataBase64: string,
    position: {
        x: number,
        y: number,
    },
    scale: number,
}

export type ApplicationSaveData = {
    layerData: Array<LayerSaveData>,
    selectedLayer: number,
    viewport: {
        position: {
            x: number,
            y: number
        },
        zoom: number
    }
};