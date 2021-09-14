const { contextBridge, ipcRenderer } = require('electron');

const validChannels = ['close-window', 'maximize', 'minimize'];

contextBridge.exposeInMainWorld('api', {
  send: channel => {
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel);
    }
  },
});
