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
  iconContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Wrap buttons to the next line when needed
    padding: 8,
    justifyContent: 'space-evenly', // Even spacing between buttons
  },
  iconButton: {
    flexBasis: '29%', // Buttons take up nearly one-third of the container
    marginBottom: 12,
    paddingVertical: 12,
    backgroundColor: '#e8f0fe', // Default background color
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1, // Default border width
    borderColor: '#e0e0e0', // Default border color (unselected)
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
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  genderButtonSelected: {
    color: 'blue',
    borderColor: 'blue',
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
