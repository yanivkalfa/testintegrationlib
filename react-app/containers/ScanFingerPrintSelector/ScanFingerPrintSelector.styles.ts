import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  selectionContainer: {
    flexGrow: 1,
    padding: 16,
    marginTop: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  fingerButton: {
    flex: 1,
    marginHorizontal: 4,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  fingerButtonSelected: {
    backgroundColor: '#E3F2FD',
    borderColor: '#64B5F6',
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
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statusText: {
    fontSize: 12,
    color: '#555',
  },
});
