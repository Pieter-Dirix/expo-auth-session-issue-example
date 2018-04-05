import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Linking } from 'react-native';
import { AuthSession } from 'expo';

const FB_APP_ID = '2059449127404706';

export default class App extends React.Component {
  state = {
    initialUri: ''
  };

  _startAuthSession = async () => {
    const redirectUrl = AuthSession.getRedirectUrl();
    const result = await AuthSession.startAsync({
      authUrl:
        `https://www.facebook.com/v2.8/dialog/oauth?response_type=token` +
        `&client_id=${FB_APP_ID}` +
        `&redirect_uri=${encodeURIComponent(redirectUrl)}`,
    });
  }

  async componentWillMount() {
    const initialUri = await Linking.getInitialURL();
    if (initialUri && initialUri.includes('expo-auth-session')) {
      this.setState({ initialUri });
    }
  }

  render() {
    const { initialUri } = this.state;
    return (
      <View style={styles.container}>
        <Text>Test AuthSession</Text>
        <TouchableOpacity onPress={this._startAuthSession} style={styles.button}>
          <Text style={styles.buttonText}>Test AuthSession right now</Text>
        </TouchableOpacity>
        {!!initialUri &&
          <View>
            <Text style={styles.error}>
              {'Initial URI from AuthSession set, did bundle reload?'}
            </Text>
            <Text style={styles.infoText}>
              {'Kill app to reset.'}
            </Text>
          </View>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'blue',
    margin: 20,
    padding: 12,
    borderRadius: 6,
    borderWidth: 0
  },
  buttonText: {
    color: '#fff'
  },
  error: {
    color: 'red'
  },
  infoText: {
    color: '#ccc',
    fontSize: 12
  }
});
