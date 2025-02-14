import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  fingerButton: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 5,
    borderRadius: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  fingerButtonChecked: {
    backgroundColor: '#E8F5E9',
    borderColor: '#81C784',
  },
  fingerButtonError: {
    backgroundColor: '#FFEBEE',
    borderColor: '#E57373',
  },
  fingerText: {
    fontSize: 12,
  },
  statusText: {
    maxWidth: 100,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#555',
  },
  fingerButtonLeft: {
    padding: 10,
    paddingRight: 0,
  },
  fingerButtonRight: {
    flexGrow: 1,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  handContainer: {
    marginTop: -2,
    // minHeight: 35,
  },
  textContainer: {
    flexGrow: 1,
    paddingHorizontal: 10,
    paddingBottom: 5,
    justifyContent: 'center',
  },
});
