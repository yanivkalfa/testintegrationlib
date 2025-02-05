import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  instructions: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  selectionContainer: {
    flexGrow: 1,
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
  fingerText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statusText: {
    fontSize: 12,
    color: '#555',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  abortButton: {
    flex: 1,
    marginRight: 8,
    padding: 16,
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
  continueButton: {
    flex: 1,
    marginLeft: 8,
    padding: 16,
    backgroundColor: '#007BFF',
    borderRadius: 8,
    alignItems: 'center',
  },
  continueButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});
