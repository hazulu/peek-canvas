import electron_settings from 'electron-settings';

export type UserSettings = {
    canvasBackgroundColor: string,
    overlayOpacity: number,
    // overlayKeybind: string,
}

const defaultSettings: UserSettings = {
    canvasBackgroundColor: '#333333',
    overlayOpacity: 0.5,
    // overlayKeybind: 'Alt+CommandOrControl+I',
}

export async function getOrInitializeSettings(): Promise<UserSettings> {

    let canvasBackgroundColor = await electron_settings.get('canvasBackgroundColor') as string;
    if (!canvasBackgroundColor) {
        canvasBackgroundColor = defaultSettings.canvasBackgroundColor;
        await electron_settings.set('canvasBackgroundColor', defaultSettings.canvasBackgroundColor);
    }

    let overlayOpacity = await electron_settings.get('overlayOpacity') as number;
    if (!overlayOpacity) {
        overlayOpacity = defaultSettings.overlayOpacity;
        await electron_settings.set('overlayOpacity', defaultSettings.overlayOpacity);
    }


    // let overlayKeybind = await electron_settings.get('overlayKeybind') as string;
    // if (!overlayKeybind) {
    //     overlayKeybind = defaultSettings.overlayKeybind;
    //     await electron_settings.set('overlayKeybind', defaultSettings.overlayKeybind);
    // }

    return {
        canvasBackgroundColor,
        overlayOpacity,
        // overlayKeybind
    }
}