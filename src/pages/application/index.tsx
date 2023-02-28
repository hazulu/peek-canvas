import { useState, useEffect } from 'react';
import Canvas from 'Components/canvas';
import Toolbar from 'Components/toolbar';
import FeatureApplication from "../../classes/application";
import { retrieveImageFromClipboardAsBlob, blobToData } from "../../services/clipboard";
import Dropzone from "Components/dropzone";
import LayerWidget from "Components/layer-widget";
import SettingsModal from '@/components/settings';
import { UserSettingChanges } from '@/types/settings';
import ZoomWidget from '@/components/zoom-widget';
import { ApplicationSaveData } from '@/types/canvas';
import { saveType } from '@/types/application';

const application = new FeatureApplication(600, 400, {})

function App() {
    const [selectedTool, setSelectedTool] = useState(0);
    const [selectedLayer, setSelectedLayer] = useState(0);
    const [layerCount, setLayerCount] = useState(0);
    const [currentZoom, setCurrentZoom] = useState(1);
    const [overlayState, setOverlayState] = useState(false);
    const [showSettingsModal, setShowSettingsModal] = useState(false);
    const [canvasBackgroundColor, setCanvasBackgroundColor] = useState('333333');
    const [overlayOpacity, setOverlayOpacity] = useState(50);

    useEffect(() => {
        window.addEventListener("paste", onPaste);
        const stopListeningToOverlayStateChange = window.electronAPI.handleOverlayStateChange(onOverlayStateChange);
        const stopListeningForSettings = window.electronAPI.handleRetrieveSettings(handleLoadSettings);
        const stopListeningForOpenProject = window.electronAPI.handleOpenProject(handleOpenProject);
        const stopListeningForSaveRequests = window.electronAPI.handleRetrieveSaveData(handleGetSaveData);
        window.electronAPI.retrieveSettings();

        if (application)
            application.onUpdateZoom(onChangeZoom);

        return () => {
            window.removeEventListener('paste', onPaste);
            stopListeningToOverlayStateChange();
            stopListeningForSettings();
            stopListeningForOpenProject();
            stopListeningForSaveRequests();
        };
    }, []);

    // Rebind New State Values
    useEffect(() => {
        window.addEventListener("keyup", onKeyUp);
        return () => window.removeEventListener('keyup', onKeyUp);
    }, [selectedLayer, layerCount]);

    const handleLoadSettings = (event: string, settings: any) => {
        const {
            overlayOpacity,
            canvasBackgroundColor,
        } = settings;

        setOverlayOpacity(overlayOpacity);
        setCanvasBackgroundColor(canvasBackgroundColor);
    }

    const handleNewProject = (event: string): void => {
        const layersInfo = application.reset();

        if (layersInfo) {
            const {
                layerCount,
                selectedLayer,
            } = layersInfo;

            setLayerCount(layerCount);
            setSelectedLayer(selectedLayer);
        }
    }

    const handleOpenProject = (event: string, saveData: ApplicationSaveData): void => {
        const layersInfo = application.loadApplicationSaveData(saveData);

        if (layersInfo) {
            const {
                layerCount,
                selectedLayer,
            } = layersInfo;

            setLayerCount(layerCount);
            setSelectedLayer(selectedLayer);
        }
    }

    const handleGetSaveData = (event: string, saveType: saveType): void => {
        window.electronAPI.sendSaveData({ saveData: application.getApplicationSaveData(), saveType });
    }

    const onOverlayStateChange = (e: string, overlayState: boolean) => setOverlayState(overlayState);

    const onPaste = (e: Event) => {
        const clipboardImage = retrieveImageFromClipboardAsBlob(e as ClipboardEvent);

        if (clipboardImage) onImport(clipboardImage);
    }

    const onKeyUp = (e: KeyboardEvent): void => {
        const key = e.key;
        let nextLayer;

        switch (key) {
            case 'V':
            case 'v':
                handleToolSelected(0);
                break;
            case 'T':
            case 't':
                handleToolSelected(1);
                break;
            case 'O':
            case 'o':
                console.log(application.getApplicationSaveData());
                break;
            case '[':
                nextLayer = selectedLayer - 1;
                if (nextLayer < 0) return;
                handleLayerSelected(nextLayer);
                break;
            case ']':
                nextLayer = selectedLayer + 1;
                if (nextLayer >= layerCount) return;
                handleLayerSelected(nextLayer);
                break;
            case 'Delete':
                handleLayerDeleted(selectedLayer);
                break;
        }
    }

    const onFilesImported = (files: Array<File>) => {
        if (files) {
            const file = files[0];
            onImport(file);
        }
    }

    const onImport = async (file: Blob) => {
        const base64 = await blobToData(file);
        let layerCount = application.addImageLayer(base64 as string);
        setLayerCount(layerCount);
        setSelectedLayer(layerCount - 1);
        application.selectLayer(layerCount - 1);
    }

    const onChangeZoom = (zoom: number, fromApplication: boolean): void => {
        setCurrentZoom(zoom);

        if (!fromApplication)
            application.setZoom(zoom);
    }

    const handleShowSettings = () => setShowSettingsModal(true);

    const handleToolSelected = (toolId: number): void => {
        setSelectedTool(toolId);
        application.selectTool(toolId);
    }

    const handleLayerSelected = (layerId: number): void => {
        setSelectedLayer(layerId);
        application.selectLayer(layerId);
    }

    const handleLayerDeleted = (layerId: number): void => {
        const layersInfo = application.deleteLayer(layerId);

        if(layersInfo) {
            const {
                layerCount,
                selectedLayer,
            } = layersInfo;

            setLayerCount(layerCount);
            setSelectedLayer(selectedLayer);
        }
    }

    const handleSaveSettings = (overlayOpacity: number, canvasBackgroundColor: string): void => {
        // Only changes are passed into function.
        if (overlayOpacity || canvasBackgroundColor) {
            let changedSettings: UserSettingChanges = {};

            if (overlayOpacity) {
                changedSettings.overlayOpacity = overlayOpacity;
                setOverlayOpacity(overlayOpacity);
            }

            if (canvasBackgroundColor) {
                changedSettings.canvasBackgroundColor = canvasBackgroundColor;
                setCanvasBackgroundColor(canvasBackgroundColor);
            }

            window.electronAPI.saveSettings(changedSettings);
        }

        setShowSettingsModal(false);
    };

    return (
        <div className="App flex flex-col h-screen w-screen relative" style={{ background: `#${canvasBackgroundColor}` }}>
            <Dropzone onFilesDropped={onFilesImported} />
            <SettingsModal
                show={showSettingsModal}
                overlayOpacity={overlayOpacity}
                canvasBackgroundColor={canvasBackgroundColor}
                onSaveSettings={handleSaveSettings}
            />

            <div className='flex h-full w-full flex-1 relative'>
                <Canvas application={application} />

                <ZoomWidget
                    onChangeZoom={onChangeZoom}
                    currentZoom={currentZoom}
                    inOverlayState={overlayState}
                />

                <Toolbar
                    onShowOptions={handleShowSettings}
                    selectedTool={selectedTool}
                    onToolSelected={handleToolSelected}
                    onImportImage={onFilesImported}
                    inOverlayState={overlayState}
                />

                <LayerWidget
                    selectedLayer={selectedLayer}
                    layerCount={layerCount}
                    onLayerSelected={handleLayerSelected}
                    onLayerDeleted={handleLayerDeleted}
                    inOverlayState={overlayState}
                />
            </div>
        </div>
    )
}

export default App
