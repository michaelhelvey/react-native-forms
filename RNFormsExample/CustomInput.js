import React, { PropTypes } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
  container: {
    height: 44,
    flexDirection: 'row',
  },
  rightTextInput: {
    height: 44,
    width: 200,
    marginRight: 10,
    fontSize: 16,
    alignSelf: 'center',
    textAlign: 'right',
  },
  title: {
    flex: 1,
    marginLeft: 10,
    alignSelf: 'center',
    fontSize: 16,
  },
  icon: {
    paddingLeft: 10,
    alignSelf: 'center',
  },
});

export default class CustomInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || '',
    };
    if (props.value) {
      this.props.onChange && this.props.onChange(props.value);
    }
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
    return (
      <View style={styles.container}>
        <Icon name={'ios-ionic'} size={20} style={styles.icon} />
        <Text style={styles.title}>{this.props.title}</Text>
        {/* <Text style={styles.rightTextInput}>{this.props.title}</Text>*/}
        <TextInput
          value={this.state.value}
          placeholder={'Value Text'}
          maxLength={25}
          style={styles.rightTextInput}
          onChange={this.handleChange.bind(this)}
        />
      </View>
    );
  }
}

CustomInput.propTypes = {
  onChange: PropTypes.func,
  onValidationError: PropTypes.func,
  onValidationPass: PropTypes.func,
  title: PropTypes.string,
  validator: PropTypes.func,
  value: PropTypes.string,
};
