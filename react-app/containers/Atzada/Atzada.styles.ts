import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 8,
  },
  instructionsText: {
    fontSize: 14,
    textAlign: 'center',
  },
  qrScanner: {
    flex: 1, // Take up remaining space
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 16,
  },
  qrText: {
    fontSize: 16,
    color: '#6B7280',
  },
  footer: {
    width: '100%',
    justifyContent: 'flex-end',
  },
  input: {
    width: '100%',
    height: 48,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    textAlign: 'right',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  primaryButton: {
    flex: 1,
    height: 48,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginLeft: 8,
  },
  primaryButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  secondaryButton: {
    flex: 1,
    height: 48,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  secondaryButtonText: {
    color: '#6B7280',
    fontWeight: 'bold',
  },
});
