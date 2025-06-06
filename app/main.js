const { app, BrowserWindow, nativeTheme } = require('electron');
const path = require('path');
const ProjectService = require('./service/project/project');
const BordereauService = require('./service/resource/bordereau');
const EquipementService = require('./service/resource/equipements');
const ResourceService = require('./service/resource/resource');
const TeamService = require('./service/resource/team');
const FGService = require('./service/resource/fg');
const { syncDb } = require('./store/db');
const url = require('url');
let win;

async function createWindow() {
    nativeTheme.themeSource = 'light';

    win = new BrowserWindow({
        width: 1600,
        height: 1200,
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js'),
        },
    });

    if (process.env.NODE_ENV === 'development') {
        win.webContents.openDevTools();

        await syncDb();
        win.loadURL('http://localhost:4200');
    } else {
        win.webContents.closeDevTools();
        win.loadURL(
            url.format({
                pathname: path.join(__dirname, `/dist/index.html`),
                protocol: 'file:',
                slashes: true,
            }),
        );
    }

    win.on('closed', () => {
        win = null;
    });

    return win;
}

try {
    app.whenReady().then(createWindow);

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit();
        }
    });

    app.on('activate', () => {
        if (win === null) {
            createWindow();
        }
    });

    const pjService = new ProjectService();
    pjService.handle();

    const resService = new ResourceService();
    resService.handle();

    const equipement = new EquipementService();
    equipement.handle();

    const team = new TeamService();
    team.handle();

    const bord = new BordereauService();
    bord.handle();

    const fg = new FGService();
    fg.handle();
} catch (e) {
    console.log('ERROR', e);
    // Catch Error
    // throw e;
}
