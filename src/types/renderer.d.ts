export interface IElectronAPI {
  retrieveSettings: () => Promise<void>,
  handleRetrieveSettings: (cb: Function) => Promise,
  saveSettings: (settings) => Promise<void>,
  handleOverlayStateChange: (cb: Function) => Promise,
}
  
declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}