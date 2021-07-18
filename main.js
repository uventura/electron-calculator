const {app, BrowserWindow} = require('electron')
const path = require('path')

function createWindow()
{
    const window = new BrowserWindow
    ({
        width: 400,
        height: 520,

        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    window.loadFile('index.html')
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', function(){
        if(BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', function(){
    if(process.platform !== 'darwin') app.quit()
})