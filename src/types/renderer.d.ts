export interface IElectronAPI {
  setTitle: (title: number) => Promise<void>,
  onResize: (event: string, { width: number, height: number }) => Promise<void>,
}
  
declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}