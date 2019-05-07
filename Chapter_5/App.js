/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  BackHandler
} from 'react-native';
import { RootStack } from './app/navigate/AppStack';

export default class App extends Component {
constructor(props) {
  super(props);

}

  render() {
    return (
      <RootStack />
    );
  }
}


