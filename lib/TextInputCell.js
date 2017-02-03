import React, { PropTypes } from 'react';
import {
  View,
  TextInput,
} from 'react-native';
import { FormSettings, TIStyles } from './DefaultStyles';

export default class TextInputCell extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: props.value || '',
    };

    if (props.value) {
      props.onChange && props.onChange(props.value);
    }
  }

  getWrappedChildren(textInput) {
    const children = [];
    if (this.props.icon) {
      children.push(
        React.cloneElement(this.props.icon, {
          key: `${this.props.icon.type}textInputIcon`,
          style: TIStyles.icon,
        })
      );
    }
    children.push(textInput);
    return children;
  }

  handleChange(event) {
    const value = event.nativeEvent.text;
    this.setState({
      value,
    });
    this.props.onChange && this.props.onChange(value);
    try {
      this.props.validator && this.props.validator(value);
      this.props.onValidationPass && this.props.onValidationPass();
    } catch (e) {
      this.props.onValidationError && this.props.onValidationError(e.message);
    }
  }

  render() {
    const inputStyle = this.props.inputStyle || TIStyles.defaultInputStyle;
    const textInput = (
      <TextInput
        key={'textInput'}
        value={this.state.value}
        style={inputStyle}
        onChange={this.handleChange.bind(this)}
        {...this.props.inputProps}
      />
    );
    const wrapped = this.getWrappedChildren.bind(this)(textInput);
    const height = this.props.cellHeight || FormSettings.defaultCellHeight;
    const containerStyle = this.props.containerStyle || TIStyles.container;
    return (
      <View style={[containerStyle, { height }]}>
        {wrapped}
      </View>
    );
  }
}

TextInputCell.propTypes = {
  cellHeight: PropTypes.number,
  containerStyle: PropTypes.object,
  icon: PropTypes.element,
  inputProps: PropTypes.object,
  inputStyle: PropTypes.object,
  onChange: PropTypes.func,
  onValidationError: PropTypes.func,
  onValidationPass: PropTypes.func,
  validator: PropTypes.func,
  value: PropTypes.string,
};
