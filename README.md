# Steps to reproduce

1. Node version = 8.11.1, Expo Version = 26
1. Start XDE/exp packager
1. Plug in android device or start a Genymotion emulator
1. `cd android; ./gradlew installDevDebug`
1. On the app, click the button and login via FB
1. Does the app bundle reload? It should not
