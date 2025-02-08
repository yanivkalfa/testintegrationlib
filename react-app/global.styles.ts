import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  section: {
    padding: 16,
    marginTop: 8,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  sectionMain: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionHorizontal: {
    flexDirection: 'row',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  sectionSubTitle: {
    fontSize: 16,
    color: '#555',
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 8,
    padding: 12,
    backgroundColor: '#007BFF',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonDisabled: {
    backgroundColor: 'grey',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  abortButton: {
    flex: 1,
    marginRight: 8,
    padding: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#007BFF',
    borderRadius: 8,
    alignItems: 'center',
  },
  abortButtonText: {
    fontSize: 16,
    color: '#007BFF',
    fontWeight: 'bold',
  },
});
