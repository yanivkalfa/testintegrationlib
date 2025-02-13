import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    color: '#333',
  },
  spinner: {
    marginHorizontal: 10,
  },
  iconContainer: {
    padding: 8,
  },
  error: {
    color: 'red',
    fontSize: 14,
    marginTop: 8,
  },
});
