import Store from 'electron-store';

export type UserSettings = {
    canvasBackgroundColor: string,
    overlayOpacity: number,
    // overlayKeybind: string,
}

const defaultSettings: UserSettings = {
    canvasBackgroundColor: '333333',
    overlayOpacity: 50,
    // overlayKeybind: 'Alt+CommandOrControl+I',
}

export function getOrInitializeSettings(store: Store): UserSettings {

    let canvasBackgroundColor = store.get('canvasBackgroundColor') as string;
    if (!canvasBackgroundColor) {
        canvasBackgroundColor = defaultSettings.canvasBackgroundColor;
        store.set('canvasBackgroundColor', defaultSettings.canvasBackgroundColor);
    }

    let overlayOpacity = store.get('overlayOpacity') as number;
    if (!overlayOpacity) {
        overlayOpacity = defaultSettings.overlayOpacity;
        store.set('overlayOpacity', defaultSettings.overlayOpacity);
    }


    // let overlayKeybind = store.get('overlayKeybind') as string;
    // if (!overlayKeybind) {
    //     overlayKeybind = defaultSettings.overlayKeybind;
    //     store.set('overlayKeybind', defaultSettings.overlayKeybind);
    // }

    return {
        canvasBackgroundColor,
        overlayOpacity,
        // overlayKeybind
    }
}