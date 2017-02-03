import React, { PropTypes } from 'react';
import {
  Platform,
  Text,
  TouchableOpacity,
  View,
  DatePickerIOS,
} from 'react-native';
import { FormSettings, DPStyles } from './DefaultStyles';

export default class DatePickerCell extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: props.value || new Date(),
      isShowingPicker: false,
    };
    this.startPressY = 0;
    this.endPressY = 0;
    if (props.value) {
      props.onChange && props.onChange(props.value);
    }
  }

  getWrappedChildren(titleText, valueText) {
    const children = [];
    if (this.props.icon) {
      children.push(
        React.cloneElement(this.props.icon, {
          key: `${this.props.icon.type}titleTextIcon`,
          style: DPStyles.icon,
        })
      );
    }
    children.push(titleText);
    children.push(valueText);
    return (
      <View style={DPStyles.container}>
        {children}
      </View>
    );
  }

  getValueTextFromDate(date) {
    if (!date) {
      return '';
    }
    if (this.props.getDateString) {
      return this.props.getDateString(date);
    }
    const value = date.toLocaleDateString ? date.toLocaleDateString() : '';
    return value;
  }

  getPicker() {
    if (!this.state.isShowingPicker) {
      return null;
    }
    return (
      <DatePickerIOS
        date={this.state.value}
        onDateChange={this.handleChange.bind(this)}
        {...this.props.datePickerProps}
      />
    );
  }

  handleChange(date) {
    this.setState({
      value: date,
    });
    this.props.onChange && this.props.onChange(date);
    try {
      this.props.validator && this.props.validator(date);
      this.props.onValidationPass && this.props.onValidationPass();
    } catch (e) {
      this.props.onValidationError && this.props.onValidationError(e);
    }
  }

  handlePressIn(event) {
    this.startPressY = event.nativeEvent.locationY;
  }

  handlePressOut(event) {
    this.endPressY = event.nativeEvent.locationY;
    const cellHeight = this.props.cellHeight || FormSettings.defaultCellHeight;
    if (Math.abs(this.startPressY - this.endPressY) < 3) {
      if (event.nativeEvent.locationY <= cellHeight && event.nativeEvent.locationY > 0) {
        this.setState({ isShowingPicker: !this.state.isShowingPicker });
      }
    }
  }

  render() {
    if (Platform.OS === 'android') {
      return null;
    }
    const titleStyle = this.props.titleStyle || DPStyles.defaultTitleStyle;
    const titleText = (
      <Text
        key={'titleText'}
        style={titleStyle}
      >
        {this.props.title}
      </Text>
    );
    const valueStyle = this.props.valueStyle || DPStyles.defaultValueStyle;
    const valueText = (
      <Text
        key={'valueText'}
        style={valueStyle}
      >
        {this.getValueTextFromDate.bind(this)(this.state.value)}
      </Text>
    );
    const wrapped = this.getWrappedChildren.bind(this)(titleText, valueText);
    const containerStyle = this.props.containerStyle || DPStyles.container;
    const cellHeight = this.props.cellHeight || FormSettings.defaultCellHeight;
    let styleProp;
    if (!this.state.isShowingPicker) {
      styleProp = [
        containerStyle,
        { height: cellHeight },
      ];
    } else {
      styleProp = [
        containerStyle,
        { paddingTop: 12 },
      ];
    }
    return (
      <TouchableOpacity
        style={styleProp}
        onPressIn={this.handlePressIn.bind(this)}
        onPressOut={this.handlePressOut.bind(this)}
      >
        <View style={{ flex: 1 }}>
          {wrapped}
          {this.getPicker.bind(this)()}
        </View>
      </TouchableOpacity>
    );
  }
}

DatePickerCell.propTypes = {
  cellHeight: PropTypes.number,
  containerStyle: PropTypes.object,
  datePickerProps: PropTypes.object,
  getDateString: PropTypes.func,
  icon: PropTypes.element,
  onChange: PropTypes.func,
  onValidationError: PropTypes.func,
  onValidationPass: PropTypes.func,
  title: PropTypes.string,
  titleStyle: PropTypes.object,
  validator: PropTypes.func,
  value: PropTypes.object, // must be a Date object
  valueStyle: PropTypes.object,
};
