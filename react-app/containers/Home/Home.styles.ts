import {StyleSheet} from 'react-native';
import {palette} from '../../theme/global.colors';

export const styles = StyleSheet.create({
  button: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: palette.primary.main,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
  },
  buttonText: {
    fontSize: 16,
    color: palette.text.primary,
    fontWeight: '600',
  },
});
