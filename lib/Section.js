import React, { PropTypes } from 'react';
import {
  Text,
  View,
} from 'react-native';
import { FormSettings, SectionStyles } from './DefaultStyles';
import Line from './Line';

export default class Section extends React.Component {

  constructor(props) {
    super(props);
    this.data = {};
    this.validationErrors = {};
    this.getData = this.getData.bind(this);
  }

  shouldComponentUpdate() {
    return false;
  }

  getData() {
    return { ...this.data };
  }

  getValidationErrors() {
    return { ...this.validationErrors };
  }

  getFinalWrapped(wrapped) {
    const finalWrapped = [];
    if (this.props.title) {
      finalWrapped.push((
        <Text
          key={'sectionTitle'}
          style={SectionStyles.sectionTitle}
        >
          {this.props.title}
        </Text>
      ));
    }
    finalWrapped.push(
      <View
        key={'sectionView'}
        style={SectionStyles.sectionWrapper}
      >
        {wrapped}
      </View>
    );
    if (this.props.helpText) {
      finalWrapped.push((
        <Text
          key={'sectionHelpText'}
          style={SectionStyles.sectionHelpText}
        >
          {this.props.helpText}
        </Text>
      ));
    }
    return finalWrapped;
  }

  handleOnChange(ref, value) {
    this.data[ref] = value;
    this.props.onChange && this.props.onChange(this.getData());
  }

  handleOnPress(ref) {
    this.props.onPress && this.props.onPress(ref);
  }

  handleValidationError(ref, message) {
    this.validationErrors[ref] = message;
    this.props.onValidationError && this.props.onValidationError(this.getValidationErrors());
  }

  handleValidationPass(ref) {
    delete this.validationErrors[ref];
    this.props.onValidationPass && this.props.onValidationPass(this.getValidationErrors());
  }

  render() {
    const wrapped = React.Children.map(this.props.children, (child, i) => {
      const newChild = React.cloneElement(child, {
        key: child.ref || child.type + i,
        ref: child.ref,
        onPress: this.handleOnPress.bind(this, child.ref),
        onChange: this.handleOnChange.bind(this, child.ref),
        onValidationError: this.handleValidationError.bind(this, child.ref),
        onValidationPass: this.handleValidationPass.bind(this, child.ref),
      });

      let wrappedLine;
      if ((i !== this.props.children.length - 1)
      && this.props.children.length && !this.props.hideLine) {
        const marginLeft = child.props.icon ? 35 : FormSettings.textMarginLeft;
        wrappedLine = (
          <View>
            {newChild}
            <Line key={`line_${i}`} marginLeft={marginLeft} />
          </View>
        );
      } else {
        wrappedLine = newChild;
      }

      return wrappedLine;
    }, this);

    return (
      <View style={[SectionStyles.container, this.props.containerStyle]}>
        {this.getFinalWrapped.bind(this)(wrapped)}
      </View>
    );
  }
}

Section.propTypes = {
  containerStyle: PropTypes.object,
  helpText: PropTypes.string,
  hideLine: PropTypes.bool,
  onChange: PropTypes.func,
  onPress: PropTypes.func,
  onValidationError: PropTypes.func,
  onValidationPass: PropTypes.func,
  title: PropTypes.string,
};
