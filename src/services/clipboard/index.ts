// https://ourcodeworld.com/articles/read/491/how-to-retrieve-images-from-the-clipboard-with-javascript-in-the-browser
export const retrieveImageFromClipboardAsBlob = (pasteEvent: ClipboardEvent): Blob | null => {
    if (pasteEvent.clipboardData) {
        var items = pasteEvent.clipboardData.items;

        if (items == undefined) return null;

        for (var i = 0; i < items.length; i++) {
            // Skip content if not image
            if (items[i].type.indexOf("image") == -1) continue;

            // Retrieve image on clipboard as blob
            var blob = items[i].getAsFile();

            return blob;
        }
    };
    
    return null;
}

export const blobToData = (blob: Blob): Promise<string | null | ArrayBuffer> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = e => reject(e);
        reader.readAsDataURL(blob);
    })
}