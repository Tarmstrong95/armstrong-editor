import { app, BrowserWindow } from "electron";
import * as path from 'path'

interface Constructable<T> {
    new(...args: any) : T;
}


export default class Main {
    static mainWindow: Electron.BrowserWindow | null
    static application: Electron.App
    static BrowserWindow: Constructable<Electron.BrowserWindow>

    private static onWindowClosed() {
        if(process.platform !== 'darwin'){
            Main.application.quit()
        }
    }

    private static onClose() {
        Main.mainWindow = null
    }

    private static createWindow(){
        Main.mainWindow = new Main.BrowserWindow({width: 800, height: 600, webPreferences:{
            webviewTag: false,
            preload: path.join(__dirname, '../preload/index.cjs')
        }})
        const pageUrl = process.env.DEV
    ? 'http://localhost:3000'
    : new URL('../dist/renderer/index.html', `file://${__dirname}`).toString()
        Main.mainWindow?.loadURL(pageUrl)
    }

    private static onReady(){
        Main.createWindow()
        Main.mainWindow?.on('closed', Main.onClose)
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


Main.main(app, BrowserWindow)