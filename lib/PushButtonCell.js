import React, { PropTypes } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
} from 'react-native';
import { FormSettings, PBStyles } from './DefaultStyles';

export default class PushButtonCell extends React.Component {

  getWrappedChildren(text) {
    const children = [];
    if (this.props.icon) {
      children.push(
        React.cloneElement(this.props.icon, {
          key: `${this.props.icon.type}PushButtonLeftIcon`,
          style: PBStyles.icon,
        })
      );
    }
    children.push(React.cloneElement(text, {
      key: `${this.props.rightIcon.type}PushButtonTitle`,
    }));
    if (this.props.rightIcon) {
      children.push(
        React.cloneElement(this.props.rightIcon, {
          key: `${this.props.rightIcon.type}PushButtonRightIcon`,
          style: PBStyles.rightIcon,
        })
      );
    }
    return children;
  }

  handlePress() {
    this.props.onPress && this.props.onPress();
  }

  render() {
    const height = this.props.cellHeight || FormSettings.defaultCellHeight;
    const containerStyle = this.props.containerStyle || PBStyles.container;
    const titleStyle = this.props.titleStyle || PBStyles.titleStyle;

    const customTitleStyle = { backgroundColor: 'transparent' };
    if (this.props.titleColor) {
      customTitleStyle.color = this.props.titleColor;
    }

    const text = (
      <Text style={[titleStyle, customTitleStyle]}>
        {this.props.title}
      </Text>
    );
    const children = this.getWrappedChildren.bind(this)(text);

    return (
      <TouchableHighlight
        onPress={this.handlePress.bind(this)}
        style={[containerStyle, { height }]}
        underlayColor={'#C7C7CC'}
      >
        <View style={[containerStyle, { flex: 1 }]}>
          {children}
        </View>
      </TouchableHighlight>
    );
  }
}

PushButtonCell.propTypes = {
  cellHeight: PropTypes.number,
  containerStyle: PropTypes.object,
  icon: PropTypes.element,
  onPress: PropTypes.func,
  rightIcon: PropTypes.element,
  title: PropTypes.string,
  titleColor: PropTypes.string,
  titleStyle: PropTypes.string,
};
