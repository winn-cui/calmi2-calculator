const electron = require("electron");
const log = require("electron-log");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");

/*************************************************************
 * py process
 *************************************************************/

const PY_DIST_FOLDER = "pycalcdist";
const PY_FOLDER = "pycalc";
const PY_MODULE = "api"; // without .py suffix

let pyProc = null;
let pyPort = null;

const guessPackaged = () => {
  const fullPath = path.join(__dirname, PY_DIST_FOLDER);
  log.info("20", require("fs").existsSync(fullPath));
  return require("fs").existsSync(fullPath);
};

const getScriptPath = () => {
  if (!guessPackaged()) {
    return path.join(__dirname, PY_FOLDER, PY_MODULE + ".py");
  }
  if (process.platform === "win32") {
    return path.join(__dirname, PY_DIST_FOLDER, PY_MODULE, PY_MODULE + ".exe");
  }
  log.info("31");
  return path.join(__dirname, PY_DIST_FOLDER, PY_MODULE, PY_MODULE);
};

const selectPort = () => {
  pyPort = 4242;
  return pyPort;
};

const createPyProc = () => {
  let script = getScriptPath();
  let port = "" + selectPort();
  log.info("41", script);
  log.info("42", script);
  if (guessPackaged()) {
    console.log("46");
    pyProc = require("child_process").execFile(script, [port]);
  } else {
    pyProc = require("child_process").spawn("python", [script, port]);
  }

  if (pyProc != null) {
    // console.log(pyProc)
    console.log("child process success on port " + port);
  }
};

const exitPyProc = () => {
  pyProc.kill();
  pyProc = null;
  pyPort = null;
};

app.on("ready", createPyProc);
app.on("will-quit", exitPyProc);

/*************************************************************
 * window management
 *************************************************************/

let mainWindow = null;

const createWindow = () => {
  mainWindow = new BrowserWindow(
    {
      width: 1080,
      height: 608,
      minWidth: 250,
      minHeight: 475,
    },
  );
  mainWindow.loadURL(
    require("url").format({
      pathname: path.join(__dirname, "index.html"),
      protocol: "file:",
      slashes: true,
    }),
  );
  // mainWindow.webContents.openDevTools();

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
};

const ret = globalShortcut.register("CommandOrControl+Shift+I", () => {
  mainWindow.webContents.toggleDevTools();
});

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
