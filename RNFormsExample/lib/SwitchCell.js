import React, { PropTypes } from 'react';
import {
  View,
  Text,
  Switch,
} from 'react-native';
import { FormSettings, SCStyles } from './DefaultStyles';

export default class SwitchCell extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };
    props.onChange && props.onChange(props.value || false);
  }

  getSwitch(propsTint) {
    if (propsTint) {
      return (
        <Switch
          value={this.state.value}
          style={SCStyles.switch}
          onTintColor={propsTint}
          onValueChange={this.handleChange.bind(this)}
        />
      );
    }
    return (
      <Switch
        value={this.state.value}
        style={SCStyles.switch}
        onValueChange={this.handleChange.bind(this)}
      />
    );
  }

  getRightIcon(props) {
    if (props.icon) {
      return React.cloneElement(props.icon, {
        style: SCStyles.icon,
      });
    }
    return null;
  }

  handleChange(value) {
    this.setState({
      value,
    });
    this.props.onChange && this.props.onChange(value);
  }

  render() {
    const height = this.props.cellHeight || FormSettings.defaultCellHeight;
    const containerStyle = this.props.containerStyle || SCStyles.container;
    const titleStyle = this.props.titleStyle || SCStyles.titleStyle;
    return (
      <View style={[containerStyle, { height, flex: 1 }]}>
        {this.getRightIcon(this.props)}
        <Text style={[titleStyle, { color: this.props.titleColor || 'black' }]}>
          {this.props.title}
        </Text>
        {this.getSwitch(this.props.switchTintColor)}
      </View>
    );
  }
}

SwitchCell.propTypes = {
  cellHeight: PropTypes.number,
  containerStyle: PropTypes.object,
  onChange: PropTypes.func,
  switchTintColor: PropTypes.string,
  title: PropTypes.string,
  titleColor: PropTypes.string,
  titleStyle: PropTypes.object,
  icon: PropTypes.element,
  value: PropTypes.bool,
};
