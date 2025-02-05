import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 16,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#555',
  },
  section: {
    padding: 16,
    marginTop: 8,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginHorizontal: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    backgroundColor: '#e8f0fe',
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 4,
  },
  label: {
    marginTop: 16,
    marginBottom: 8,
    fontSize: 14,
  },
  genderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  genderButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    backgroundColor: '#e8f0fe',
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 4,
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  timestamp: {
    fontSize: 12,
    color: '#555',
  },
  buttonContainer: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
});
