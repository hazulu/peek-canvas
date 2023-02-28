import { BrowserWindow, dialog, Menu } from "electron";
import fs from 'fs';

const applicationMenuTemplate = [
    {
        label: 'File',
        submenu: [
            // isMac ? { role: 'close' } : { role: 'quit' }
            {
                label: 'New...',
                click: (manuItem, browserWindow, event) => handleNewProject(browserWindow),
            },
            {
                label: 'Open...',
                click: (manuItem, browserWindow, event) => handleOpenProject(browserWindow),
            },
            {
                label: 'Save',
                click: (manuItem, browserWindow, event) => handleSaveProject(browserWindow, 0),
            },
            {
                label: 'Save As...',
                click: (manuItem, browserWindow, event) => handleSaveProject(browserWindow, 1),
            },
            {
                label: 'Save A Copy',
                click: (manuItem, browserWindow, event) => handleSaveProject(browserWindow, 2),
            }
        ]
    }
];

// Keep project paths for open project saving
const currentProjectPath: Map<BrowserWindow, string> = new Map<BrowserWindow, string>();

export const handleNewProject = (browserWindow: BrowserWindow) => {
    browserWindow.webContents.send('new-project');
    currentProjectPath.delete(browserWindow);
    browserWindow.setTitle(`Peek Canvas`);
}

export const handleOpenProject = async (browserWindow): Promise<void> => {
    const dialogResult = await createOpenDialog(browserWindow);

    if (dialogResult) {
        const { filePaths } = dialogResult;
        const filePath = filePaths[0];

        if (filePath) {
            fs.readFile(filePath, "utf8", (err, data) => {
                if (err) throw err;
                let saveData = JSON.parse(data);

                browserWindow.webContents.send('open-project', saveData);
                currentProjectPath.set(browserWindow, filePath);
                browserWindow.setTitle(`Peek Canvas (${filePath})`);
            });
        }
    }
}

export const handleSaveProject = (browserWindow, saveType) =>
    browserWindow.webContents.send('retrieve-save-data', saveType);

const save = async (browserWindow: BrowserWindow, saveData: string) => {
    // Save to Existing Working Directory OR Create and Set
    const currentPath = currentProjectPath.get(browserWindow);

    if (currentPath) {
        saveFile(currentPath, saveData);
    } else {
        const dialogResult = await createSaveDialog(browserWindow);

        if (dialogResult) {
            const { filePath } = dialogResult;

            if (filePath)
                _save(browserWindow, saveData, filePath, true);
        }
    }
}

const saveAs = async (browserWindow: BrowserWindow, saveData: string) => {
    // Save Copy and Update Working Directory
    const dialogResult = await createSaveDialog(browserWindow);

    if (dialogResult) {
        const { filePath } = dialogResult;

        if (filePath)
            _save(browserWindow, saveData, filePath, true);
    }
}

const saveACopy = async (browserWindow: BrowserWindow, saveData: string) => {
    // Not Not Update Working Directory
    const dialogResult = await createSaveDialog(browserWindow);

    if (dialogResult) {
        const { filePath } = dialogResult;

        if (filePath)
            _save(browserWindow, saveData, filePath, false);
    }
}

const _save = (browserWindow: BrowserWindow, saveData: string, filePath, updateWorkingDirectory: boolean) => {
    if (filePath) {
        saveFile(filePath, saveData);
        if (updateWorkingDirectory) {
            currentProjectPath.set(browserWindow, filePath);
            browserWindow.setTitle(`Peek Canvas (${filePath})`);
        }
    }
}

export const onSaveProject = async (event, data, browserWindow): Promise<void> => {
    const { saveData, saveType } = data;
    const fileSaveData = JSON.stringify(saveData);

    switch (saveType) {
        // Save
        case 0:
            return save(browserWindow, fileSaveData);
        // Save As
        case 1:
            return saveAs(browserWindow, fileSaveData);
        // Save A Copy
        case 2:
            return saveACopy(browserWindow, fileSaveData);
    }
}

const createSaveDialog = (browserWindow: BrowserWindow) => dialog.showSaveDialog(browserWindow, {
    defaultPath: 'My Canvas',
    filters: [{
        name: 'Peek Canvas (.peekcanvas)',
        extensions: ['peekcanvas']
    }]
})

const createOpenDialog = (browserWindow: BrowserWindow) => dialog.showOpenDialog(browserWindow, {
    filters: [{
        name: 'Peek Canvas (.peekcanvas)',
        extensions: ['peekcanvas']
    }]
});

const saveFile = async (filePath: string, fileData) => {
    console.log(filePath);
    fs.writeFile(filePath, fileData, (err) => {
        if (err)
            return dialog.showErrorBox('Error', err.message);
    })
}

export const applicationMenu = Menu.buildFromTemplate(applicationMenuTemplate);