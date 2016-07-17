import React, { PropTypes } from 'react';
import { ScrollView } from 'react-native';
import {
  KeyboardAwareScrollView,
} from 'react-native-keyboard-aware-scroll-view';
import { FCStyles } from './DefaultStyles';
import isEqual from 'lodash.isequal';

export default class Form extends React.Component {

  constructor(props) {
    super(props);
    this.data = {};
    this.validationErrors = {};
    this.getData = this.getData.bind(this);
  }

  getData() {
    return { ...this.data };
  }

  getValidationErrors() {
    return { ...this.validationErrors };
  }

  handleOnChange(ref, value) {
    const oldData = { ...this.data };
    this.data[ref] = value;
    if (this.props.onChange) {
      // diff the old and new for display
      Object.keys(oldData).forEach(key => {
        if (!isEqual(this.data[key], oldData[key])) {
          Object.keys(oldData[key]).forEach(k => {
            if (this.data[key][k] !== oldData[key][k]) {
              this.props.onChange(k, this.data[key][k]);
            }
          });
        }
      });
    }
  }

  handleValidationError(ref, message) {
    this.validationErrors[ref] = message;
    this.props.onValidationError && this.props.onValidationError(ref, message);
  }

  handleValidationPass(ref, child) {
    this.validationErrors[ref] = child;
  }

  handleOnPress(ref) {
    this.props.onPress && this.props.onPress(ref);
  }

  render() {
    const wrapped = React.Children.map(this.props.children,
      (child, i) => React.cloneElement(child, {
        key: child.ref || child.type + i,
        ref: child.ref,
        onPress: this.handleOnPress.bind(this),
        onChange: this.handleOnChange.bind(this, child.ref),
        onValidationError: this.handleValidationError.bind(this, child.ref),
        onValidationPass: this.handleValidationPass.bind(this, child.ref),
      }),
    this);

    const containerStyle = this.props.containerStyle || FCStyles.container;

    if (this.props.keyboardAware) {
      return (
        <KeyboardAwareScrollView
          contentContainerStyle={containerStyle}
          style={{ flex: 1 }}
          resetScrollToCoords={{ x: 0, y: 0 }}
          keyboardShouldPersistTaps={true}
        >
          {wrapped}
        </KeyboardAwareScrollView>
      );
    }
    return (
      <ScrollView
        contentContainerStyle={containerStyle}
        style={{ flex: 1 }}
        keyboardShouldPersistTaps={true}
      >
        {wrapped}
      </ScrollView>
    );
  }
}

Form.propTypes = {
  containerStyle: PropTypes.object,
  keyboardAware: PropTypes.bool,
  onChange: PropTypes.func,
  onPress: PropTypes.func,
  onValidationError: PropTypes.func,
};
