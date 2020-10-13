# Overview
This is a basic calculator Electron app that can sum two numbers. The app targets MacOs, andIn order to run the app, clone the repo, and run `open calmi2-calculator-darwin-x64/calmi2-calculator.app` at the root of the project folder (or manually open the Electron app from Finder).

This application uses [electron-python-example](https://github.com/fyears/electron-python-example) as a template.

# For Development

## Setting up Python Backend Environment
To avoid compatibility errors, we use Python 3.7.0 with the "--enable-shared" flag.

```bash
brew install pyenv # install pyenv, a Python version manager
env PYTHON_CONFIGURE_OPTS="--enable-shared" pyenv install 3.7.0 # install a compatible python version using pyenv
pyenv local 3.7.0 # use the just-installed Python version
python3 -m venv .venv # create a Python virtual environment, to keep local and global dependencies clean
source .venv/bin/activate # activate the virtual environment
pip install pip-tools # install pip-tools to easily manage your python packages
cd pycalc 
pip-compile # create the requirements.txt file
pip-sync # installs the packages listed in the requireents.txt file
```

## Setting up the Electron Environment and Frontend
To avoid compatibility errors, we use Node 8.2.1.

```bash
brew install nvm # install a node version manager
nvm install 8.2.1 
nvm use 8.2.1
brew install zeromq # install zeromq for your platform (in this case, brew is for MacOs)
npm install # install dependencies listed in package.json
npx electron # to check if Electron installation works
```

## Packaging the Python Backend
Make sure you are using Python 3.7.0

```bash
pyinstaller pycalc/api.py --distpath pycalcdist # execute from the root of the project folder
rm -rf build/
rm -rf api.spec
```

## Packaging the Electron Application (with the Python Backend)
Make sure you are using Node 8.2.1

```bash
npx electron-packager . --overwrite --ignore="pycalc/.*" --ignore=".venv/.*"
```
