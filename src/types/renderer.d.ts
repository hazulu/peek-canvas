export interface IElectronAPI {
  setTitle: (title: number) => Promise<void>,
}
  
declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}