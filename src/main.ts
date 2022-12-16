import { BrowserWindow } from "electron";
import path from 'path'

export default class Main {
    static mainWindow: Electron.BrowserWindow
    static application: Electron.App
    static BrowserWindow

    private static onWindowClosed() {
        if(process.platform !== 'darwin'){
            Main.application.quit()
        }
    }

    private static onClose() {
        Main.mainWindow = null
    }

    private static createWindow(){
        console.log(path.join(__dirname, 'preload.js'))
        Main.mainWindow = new Main.BrowserWindow({width: 800, height: 600, webPreferences:{
            preload: path.join(__dirname, 'preload.js')
        }})
        Main.mainWindow.loadFile('index.html')
    }

    private static onReady(){
        Main.createWindow()
        Main.mainWindow.on('closed', Main.onClose)
        Main.application.on('activate', () => {
            if (BrowserWindow.getAllWindows().length === 0) Main.createWindow()
        })
    }

    static main(app: Electron.App, browserWindow: typeof BrowserWindow){
        Main.BrowserWindow = browserWindow
        Main.application = app
        Main.application.on('window-all-closed', Main.onWindowClosed)
        Main.application.on('ready', Main.onReady)
    }
}