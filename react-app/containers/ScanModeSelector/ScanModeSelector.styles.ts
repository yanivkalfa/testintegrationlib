import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  backButton: {
    position: 'absolute',
    left: 16,
    top: 0,
    padding: 8,
  },
  backButtonText: {
    color: '#007BFF',
    fontSize: 16,
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
  fingerprintContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  fingerprintImage: {
    width: 200,
    height: 200,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 12,
  },
  fingerprintText: {
    color: '#aaa',
    fontSize: 16,
  },
  deviceInfo: {
    fontSize: 14,
    color: '#555',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
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
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerText: {
    fontSize: 12,
    color: '#aaa',
    textAlign: 'center',
  },
});
