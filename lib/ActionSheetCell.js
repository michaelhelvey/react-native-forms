import React, { PropTypes } from 'react';
import {
  ActionSheetIOS,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { FormSettings, ASStyles } from './DefaultStyles';

export default class ActionSheetCell extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: this.getValueTextFromIndex(props.selectedValueIndex) || '',
    };

    if (this.state.value.length) {
      props.onChange && props.onChange(this.state.value);
    }
  }


  getWrappedChildren(titleText, valueText) {
    let children = [];
    if (this.props.icon) {
      children.push(
        React.cloneElement(this.props.icon, {
          key: `${this.props.icon.type}titleTextIcon`,
          style: ASStyles.icon,
        })
      );
    }
    children.push(titleText);
    children.push(valueText);
    return (
      <View style={ASStyles.container}>
        {children}
      </View>
    );
  }

  getValueTextFromIndex(index) {
    if (typeof(index) !== 'undefined') {
      return this.props.options[index];
    }
    return undefined;
  }

  handleChange(index) {
    const value = this.getValueTextFromIndex(index);
    this.setState({
      value,
    });
    this.props.onChange && this.props.onChange(value);
    try {
      this.props.validator && this.props.validator(value);
      this.props.onValidationPass && this.props.onValidationPass();
    } catch (e) {
      this.props.onValidationError && this.props.onValidationError(e);
    }
  }

  handlePress() {
    const cancelButtonIndex = this.props.options.length;
    ActionSheetIOS.showActionSheetWithOptions({
      options: [...this.props.options, 'Cancel'],
      cancelButtonIndex,
    }, (index) => {
      if (index !== cancelButtonIndex) {
        this.handleChange.bind(this)(index);
      }
    });
  }

  render() {
    if (Platform.OS === 'android') {
      return null;
    }
    const titleStyle = this.props.titleStyle || ASStyles.defaultTitleStyle;
    const titleText = (
      <Text
        key={'titleText'}
        style={titleStyle}
      >
        {this.props.title}
      </Text>
    );
    const valueStyle = this.props.valueStyle || ASStyles.defaultValueStyle;
    const valueText = (
      <Text
        key={'valueText'}
        style={valueStyle}
      >
        {this.state.value}
      </Text>
    );
    let wrapped = this.getWrappedChildren.bind(this)(titleText, valueText);
    const containerStyle = this.props.containerStyle || ASStyles.container;
    const cellHeight = this.props.cellHeight || FormSettings.defaultCellHeight;
    return (
      <TouchableOpacity
        style={[
          containerStyle,
          { height: cellHeight },
        ]}
        onPress={this.handlePress.bind(this)}
      >
        {wrapped}
      </TouchableOpacity>
    );
  }
}

ActionSheetCell.propTypes = {
  cellHeight: PropTypes.number,
  containerStyle: PropTypes.object,
  icon: PropTypes.element,
  onChange: PropTypes.func,
  onValidationError: PropTypes.func,
  onValidationPass: PropTypes.func,
  options: PropTypes.array.isRequired,
  selectedValueIndex: PropTypes.number,
  title: PropTypes.string,
  titleStyle: PropTypes.object,
  validator: PropTypes.func,
  valueStyle: PropTypes.object,
};
