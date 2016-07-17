/* eslint-disable */

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
} from 'react-native';

import ExampleForm from './ExampleForm';

class RNFormsExample extends Component {
  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: ExampleForm,
          title: "React Native Forms",
        }}
        style={{flex: 1}}
      />
    );
  }
}

AppRegistry.registerComponent('RNFormsExample', () => RNFormsExample);
