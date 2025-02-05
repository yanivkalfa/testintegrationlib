import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 20,
    color: '#007BFF',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#555',
  },
  fingerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  fingerprintContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  fingerprintImage: {
    width: 150,
    height: 150,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  fingerprintText: {
    color: '#aaa',
    fontSize: 16,
  },
  fingerprintInstruction: {
    fontSize: 14,
    color: '#555',
    marginBottom: 12,
    textAlign: 'center',
  },
  progressBar: {
    width: '80%',
    height: 8,
    backgroundColor: '#eee',
    borderRadius: 4,
    overflow: 'hidden',
    marginTop: 8,
  },
  progress: {
    width: '40%', // Adjust the width dynamically based on scan progress
    height: '100%',
    backgroundColor: '#28a745',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  secondaryButton: {
    flex: 1,
    marginHorizontal: 4,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#007BFF',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: 14,
    color: '#007BFF',
  },
  continueButton: {
    backgroundColor: '#007BFF',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  continueButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});