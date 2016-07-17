import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

export default class Line extends React.Component {

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <View
        style={{
          height: StyleSheet.hairlineWidth,
          backgroundColor: '#D3D3D3',
          ...this.props,
        }}
      />
    );
  }
}
