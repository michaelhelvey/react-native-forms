import { StyleSheet } from 'react-native';

export const FormSettings = {
  textMarginLeft: 15,
  defaultCellHeight: 44,
};

export const FCStyles = StyleSheet.create({
  container: {
    backgroundColor: '#EFEFF4',
  },
});

export const BCStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  titleStyle: {
    alignSelf: 'center',
    backgroundColor: 'white',
    color: '#007AFF',
    flex: 1,
    fontSize: 16,
    marginLeft: FormSettings.textMarginLeft,
    textAlign: 'left',
  },
});

export const ASStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  defaultTitleStyle: {
    flex: 1,
    marginLeft: FormSettings.textMarginLeft,
    alignSelf: 'center',
    fontSize: 16,
  },
  defaultValueStyle: {
    marginRight: FormSettings.textMarginLeft,
    fontSize: 16,
    alignSelf: 'center',
    color: '#696969',
  },
  icon: {
    paddingLeft: 10,
    alignSelf: 'center',
  },
});

export const DPStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  defaultTitleStyle: {
    flex: 1,
    marginLeft: FormSettings.textMarginLeft,
    alignSelf: 'center',
    fontSize: 16,
  },
  defaultValueStyle: {
    marginRight: FormSettings.textMarginLeft,
    fontSize: 16,
    alignSelf: 'center',
    color: '#696969',
  },
  icon: {
    paddingLeft: 10,
    alignSelf: 'center',
  },
});

export const PBStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  titleStyle: {
    flex: 1,
    marginLeft: FormSettings.textMarginLeft,
    fontSize: 16,
    backgroundColor: 'white',
    alignSelf: 'center',
  },
  rightIcon: {
    marginRight: 10,
    alignSelf: 'center',
  },
  icon: {
    marginLeft: 10,
    alignSelf: 'center',
  },
});

export const SectionStyles = StyleSheet.create({
  container: {
    marginTop: 15,
    marginBottom: 15,
  },
  sectionWrapper: {
    backgroundColor: 'white',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#D3D3D3',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#D3D3D3',
  },
  sectionTitle: {
    color: '#808080',
    fontSize: 14,
    marginBottom: 10,
    marginLeft: FormSettings.textMarginLeft,
  },
  sectionHelpText: {
    color: '#808080',
    fontSize: 13,
    marginTop: 10,
    marginLeft: FormSettings.textMarginLeft,
    marginRight: FormSettings.textMarginLeft,
  },
});

export const SCStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  titleStyle: {
    flex: 1,
    marginLeft: FormSettings.textMarginLeft,
    fontSize: 16,
    backgroundColor: 'white',
    alignSelf: 'center',
  },
  switch: {
    marginRight: 20,
    alignSelf: 'center',
  },
  icon: {
    marginLeft: 10,
    alignSelf: 'center',
  },
});

export const TIStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  defaultInputStyle: {
    flex: 1,
    marginLeft: FormSettings.textMarginLeft,
    fontSize: 16,
    backgroundColor: 'white',
  },
  icon: {
    paddingLeft: 10,
    alignSelf: 'center',
  },
});
