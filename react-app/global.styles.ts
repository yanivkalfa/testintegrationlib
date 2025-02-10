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
  sectionFullHeight: {
    flexGrow: 1,
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
    borderWidth: 1,
    borderColor: '#007BFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonSelected: {
    backgroundColor: '#E3F2FD',
    borderColor: '#64B5F6',
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
  abortButton_12: {
    flex: 1,
    marginRight: 8,
    padding: 3,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#007BFF',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textSize_12: {
    fontSize: 12,
    color: '#007BFF',
  },
  spacer: {
    marginTop: 8,
  },
  disabled: {
    backgroundColor: '#7a7a7a',
    borderColor: '#7a7a7a',
    color: '#b5b5b5',
  },
});
