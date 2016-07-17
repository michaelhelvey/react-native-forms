/* eslint-disable no-console */

import React from 'react';
import { View } from 'react-native';
import {
  ActionSheetCell,
  ButtonCell,
  createValidator,
  DatePickerCell,
  emailValidator,
  Form,
  PushButtonCell,
  Section,
  SwitchCell,
  TextInputCell,
} from 'react-native-forms';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomInput from './CustomInput';

class ExampleForm extends React.Component {

  onValidationError(ref, message) {
    console.log(ref, message);
  }

  handleChange(ref, change) {
    console.log(ref, change);
  }

  handlePress(ref) {
    if (ref === 'LogData') {
      console.log(this.form.getData());
    } else if (ref === 'LogValidationErrors') {
      console.log(this.form.getValidationErrors());
    }
  }

  render() {
    const forwardIcon = <Icon name={"ios-arrow-forward"} color={"gray"} size={20} />;
    const alertIcon = <Icon name={"ios-alert"} color={"gray"} size={20} />;
    return (
      <View style={{ flex: 1, backgroundColor: '#EFEFF4' }}>
        <Form
          ref={(ref) => { this.form = ref; }}
          onPress={this.handlePress.bind(this)}
          onChange={this.handleChange.bind(this)}
        >
          <Section
            ref={"firstSection"}
            title={"FIRST SECTION"}
          >
            <ButtonCell
              ref={"ButtonCell"}
              title={"ButtonCell"}
              textAlign={"center"}
              titleColor={"red"}
            />
            <PushButtonCell
              ref={"PushButtonCell"}
              rightIcon={forwardIcon}
              icon={alertIcon}
              title={"PushButtonCell"}
            />
            <SwitchCell
              ref={"SwitchCell"}
              switchTintColor={"blue"}
              title={"SwitchCell"}
              titleColor={"black"}
              icon={alertIcon}
            />
          </Section>
          <Section
            ref={"secondSection"}
            title={"SECOND SECTION"}
            helpText={"The helpText prop allows you to place text at the section bottom."}
          >
            <ActionSheetCell
              ref={"ActionSheetCell"}
              title={"ActionSheetCell"}
              options={['Option 1', 'Option 2', 'Option 3']}
              icon={alertIcon}
              selectedValueIndex={0}
            />
            <TextInputCell
              ref="SingleLineTextInput"
              validator={createValidator(emailValidator, { errorMessage: 'Invalid Email' })}
              inputProps={{ placeholder: 'Single line TextInputCell' }}
            />
            <TextInputCell
              ref={"MultiLineTextInput"}
              inputProps={{ multiline: true, color: 'green' }}
              cellHeight={100}
              value={"Multiline TextInputCell with specified value and color."}
            />
            <DatePickerCell
              ref={"DatePickerCell"}
              title={"DatePickerCell"}
              datePickerProps={{ mode: 'datetime' }}
              value={new Date('7/1/16')}
              getDateString={(date) => {
                const options = {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  timeZone: 'UTC',
                  timeZoneName: 'short',
                };
                return date.toLocaleDateString('en-US', options);
              }}
            />
          </Section>
          <Section
            ref={"customSection"}
            title={"CUSTOM COMPONENTS"}
          >
            <CustomInput title={"CustomInput"} ref={"CustomInput"} />
          </Section>
          <Section
            title={"DATA"}
            ref={"dataSection"}
          >
            <ButtonCell
              ref={"LogData"}
              title={"Log Form Data"}
              textAlign={"center"}
              titleColor={"blue"}
            />
            <ButtonCell
              ref={"LogValidationErrors"}
              title={"Log Validation Errors"}
              textAlign={"center"}
              titleColor={"blue"}
            />
          </Section>
        </Form>
      </View>
    );
  }
}

export default ExampleForm;
