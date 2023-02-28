import { saveType } from "./application";
import { ApplicationSaveData } from "./canvas";

export interface IElectronAPI {
  retrieveSettings: () => Promise<void>,
  handleRetrieveSettings: (cb: Function) => Promise,
  handleOpenProject: (cb: Function) => Promise,
  handleRetrieveSaveData: (cb: Function) => Promise,
  sendSaveData: ({ saveData: ApplicationSaveData, saveType: saveType }) => Promise<void>,
  saveSettings: (settings) => Promise<void>,
  handleOverlayStateChange: (cb: Function) => Promise,
}
  
declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}