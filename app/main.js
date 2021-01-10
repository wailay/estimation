const { app, BrowserWindow, nativeTheme } = require('electron');
const path = require('path');
const ProjectService = require('./service/project/project');
const EquipementService = require('./service/resource/equipements');
const ResourceService = require('./service/resource/resource');
const TeamService = require('./service/resource/team');
const { syncDb } = require('./store/db');
let win;
const args = process.argv.slice(1);
// const serve = args.some((val) => val === '--serve');
const serve = true;
console.log(args, 'serve', serve);
async function createWindow() {
    nativeTheme.themeSource = 'light';

    win = new BrowserWindow({
        width: 1600,
        height: 1200,
        webPreferences: {
            nodeIntegration: true,
        },
    });

    if (serve) {
        win.webContents.openDevTools();

        console.log('syncing db');
        await syncDb();
        win.loadURL('http://localhost:4200');
    } else {
        console.log('loading');
        win.loadFile('./dist/index.html');
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
} catch (e) {
    console.log('ERROR', e);
    // Catch Error
    // throw e;
}
