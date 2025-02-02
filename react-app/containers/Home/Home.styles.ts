import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5fa',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  headerText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#3f3f46',
  },
  subHeaderText: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 5,
  },
  fingerprint: {
    width: 50,
    height: 50,
    marginTop: 10,
  },
  instructionsContainer: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 10,
  },
  instructions: {
    paddingHorizontal: 5,
  },
  instructionText: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 5,
  },
  buttonsContainer: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#e5e7eb',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 16,
    color: '#1f2937',
    fontWeight: '600',
  },
});