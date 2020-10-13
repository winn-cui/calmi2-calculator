import setuptools

with open("README.md", "r") as fh:
    long_description = fh.read()

setuptools.setup(
    name="calmi2-challenge",
    version="0.0.1",
    author="Winn Cui",
    author_email="winn.yc@berkeley.edu",
    description="A simple calculator application.",
    long_description=long_description,
    url="https://github.com/pypa/sampleproject",
    packages=setuptools.find_packages(),
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
    python_requires="==3.7.0",
    install_requires=[
        "mypy",
        # linter that supports type hinting
        # must enable linter in vscode settings
        # uninstall "Python for VSCode" extension if there are wrong syntax errors
        # if on macOS and run into pip ssl error: https://stackoverflow.com/questions/35280956/ignoring-ensurepip-failure-pip-7-1-2-requires-ssl-tls-python-3-x-os-x#35282183
        "flake8",
        # linter
        # must enable linter in vscode settings
        "black",  # python formatter
        "pip-tools",  # package dependency manager
        "pipdeptree",  # package dependency manager
        "zerorpc",
        "pyinstaller",
        "zerorpc",
        "pyzmq",
        "future",
        "msgpack-python",
        "gevent",
    ],
)