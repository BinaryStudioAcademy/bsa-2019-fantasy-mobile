# BSA 2019 Fantasy Football project (React Native)

This project was inspired by the English Premier League Fantasy Football application (http://fantasy.premierleague.com). Fantasy football is an online game where participants select a team of real players and all the results of the players totally depend on the statistics of those players in real games.

## Installation

1. Getting Started with [React Native](https://facebook.github.io/react-native/docs/getting-started).
2. Use the [npm](https://www.npmjs.com/get-npm) to install app.

```bash
npm install
```

## Usage

```bash
react-native run-android
react-native start
```

## Important Notices

1. Please notice that the Windows file system isn't case sensitive, so it treats these names as the same file. On Linux, the file system is case sensitive (configure the ```ANDROID_HOME``` environment variable).

2. Do not forget to type ```source $HOME/.bash_profile``` or ```source $HOME/.bashrc``` to load the config into your current shell.

3. If you are using fish as the default shell.

```bash
# ~/.config/fish/config.fish
set --export ANDROID $HOME/Android;
set --export ANDROID_HOME $ANDROID/Sdk;
set -gx PATH $ANDROID_HOME/tools $PATH;
set -gx PATH $ANDROID_HOME/tools/bin $PATH;
set -gx PATH $ANDROID_HOME/platform-tools $PATH;
set -gx PATH $ANDROID_HOME/emulator $PATH;
```

```bash
source ~/.config/fish/config.fish
```

4. Error: spawnSync ./gradlew EACCES.

```bash
chmod 755 android/gradlew 
```

5. Keystore file '/Project-Folder/android/app/debug.keystore' not found for signing config 'debug'.

```bash
cd /android/app
keytool -genkey
```

6. If your device does not show the RSA dialog in debug mode.

```bash
dba kill-server
rm -rf ~/.android/adbkey
rm -rf ~/.android/adbkey.pub
# then try to plug-in the device again
dba start-server
dba devices -l # it should be authorized
```

## License
[MIT](https://choosealicense.com/licenses/mit/)
