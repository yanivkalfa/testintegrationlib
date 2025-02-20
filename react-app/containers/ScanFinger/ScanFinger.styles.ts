import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  fingerprintContainer: {
    alignItems: 'center',
    marginVertical: 16,
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
    width: '100%',
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
  continueButtonContainer: {
    width: '100%',
    marginTop: 10,
  },
  continueButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});
