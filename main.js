const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu} = electron;

let mainWindow;
let addWindow;

// Listen for app to be ready
app.on('ready', function() {
  // Create new window
  mainWindow = new BrowserWindow({});

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'mainWindow.html'),
    protocol:'file:',
    slashes: true
  })); // fancy way of passing this:	file://dirname//mainWindow.html

  // Quit whole app when main window closed
  mainWindow.on('closed', function(){
    app.quit();
  });

  // Build menu from template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  // Insert menu
  Menu.setApplicationMenu(mainMenu);
});

// Handle create add window
function createAddWindow() {
  // Create new window
  addWindow = new BrowserWindow({
    width: 300,
    height: 200,
    title: 'Add Shopping List Item'
  });

  // Garbage collection handle
  addWindow.on('close', function(){
    addWindow = null;
  });

  addWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'addWindow.html'),
    protocol:'file:',
    slashes: true
  })); // fancy way of passing this:	file://dirname//mainWindow.html
}

// Create menu template
const mainMenuTemplate = [ // just an array of objects
  {
    label:'File',
    submenu: [
      {
	 label: 'Add item',
	 click() {
	   createAddWindow();
	 }
      },
      {
	 label: 'Clear items'
      },
      {
	 label: 'Quit',
	 accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
	 click() {
	   app.quit();
	 }
      }
    ]
  }
];
