import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  iconContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
  },
  iconButton: {
    flexBasis: '29%',
    marginBottom: 12,
    paddingVertical: 12,
    backgroundColor: '#e8f0fe',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginHorizontal: 6,
  },
  selectedButton: {
    borderColor: 'blue',
  },
  iconText: {
    color: '#000',
    fontSize: 14,
  },
  iconTextSelected: {
    color: 'blue',
    fontSize: 14,
  },
  genderRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
  },
});
