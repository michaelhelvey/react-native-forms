import React, { PropTypes } from 'react';
import {
  Text,
  TouchableHighlight,
} from 'react-native';
import { FormSettings, BCStyles } from './DefaultStyles';

export default class ButtonCell extends React.Component {

  handlePress() {
    this.props.onPress && this.props.onPress();
  }

  render() {
    const height = this.props.cellHeight || FormSettings.defaultCellHeight;

    const containerStyle = this.props.containerStyle || BCStyles.container;
    const textStyle = this.props.textStyle || BCStyles.titleStyle;

    const customTextTyles = { backgroundColor: 'transparent' };
    if (this.props.titleColor) {
      customTextTyles.color = this.props.titleColor;
    }

    if (this.props.textAlign) {
      customTextTyles.textAlign = this.props.textAlign;
    }

    return (
      <TouchableHighlight
        onPress={this.handlePress.bind(this)}
        style={[containerStyle, { height }]}
        underlayColor={'#C7C7CC'}
      >
        <Text
          style={[textStyle, customTextTyles]}
        >
          {this.props.title}
        </Text>
      </TouchableHighlight>
    );
  }
}

ButtonCell.propTypes = {
  cellHeight: PropTypes.number,
  containerStyle: PropTypes.object,
  onPress: PropTypes.func,
  textAlign: PropTypes.string,
  textStyle: PropTypes.object,
  title: PropTypes.string,
  titleColor: PropTypes.string,
};
