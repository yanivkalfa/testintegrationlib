import {StyleSheet} from 'react-native';
import {ColorScheme} from './global.types';

const abstractStyles = {
  marginRight: {
    marginRight: 10,
  },
  marginLeft: {
    marginLeft: 10,
  },
  sectionPadding: {
    padding: 12,
  },
  sectionMargin: {
    marginTop: 10,
  },
  fieldMargin: {
    marginBottom: 15,
  },
  alignCenter: {
    alignItems: 'center' as const,
  },
  alignEnd: {
    alignItems: 'flex-end' as const,
  },
  titleBase: {
    fontSize: 18,
    fontWeight: 'bold' as const,
  },
};

const getGlobalStyles = (colorScheme: ColorScheme) => {
  const baseEmptySection = {
    ...abstractStyles.sectionMargin,
  };

  const baseSection = {
    ...baseEmptySection,
    backgroundColor: colorScheme.section?.backgroundColor,
  };

  const baseContainer = {
    flex: 1,
    padding: 12,
    backgroundColor: colorScheme.container?.backgroundColor,
  };

  const baseButton = {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    ...abstractStyles.sectionPadding,
  };

  const baseInput = {
    padding: 12,
    textAlign: 'right',
    writingDirection: 'rtl',
  };

  return StyleSheet.create({
    sectionSpacer: {
      marginTop: 30,
    },
    sectionSpacer20: {
      marginTop: 20,
    },
    sectionSpacer10: {
      marginTop: 10,
    },
    horizontalDivider: {
      ...colorScheme.horizontalDivider,
      borderBottomWidth: 1,
      marginVertical: 10,
      width: '100%',
    },
    verticalDividier: {
      ...colorScheme.verticalDividier,
      borderLeftWidth: 1,
      marginHorizontal: 10,
      height: '100%',
    },
    row: {
      flexDirection: 'row',
    },
    rowSpace: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    rowAround: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    rowEnd: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    rowStart: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
    },
    logo: {
      width: '70%',
      height: 50,
    },
    navbar: {
      padding: 5,
      ...colorScheme.navBar,
    },
    container: {
      ...baseContainer,
      justifyContent: 'space-between',
    },
    containerScroll: {
      ...baseContainer,
    },
    containerTitle: {
      ...colorScheme.containerTitle,
    },
    containerTitleText: {
      ...colorScheme.containerTitleText,
    },
    sectionTransparent: {
      ...baseEmptySection,
    },
    section: {
      ...baseSection,
    },
    sectionHeader: {
      ...abstractStyles.sectionPadding,
      ...colorScheme.sectionHeader,
    },
    sectionHeaderText: {
      ...abstractStyles.titleBase,
      ...colorScheme.sectionHeaderText,
    },
    sectionBody: {
      ...abstractStyles.sectionPadding,
      ...colorScheme.sectionBody,
    },
    sectionBodyText: {
      fontSize: 16,
      ...colorScheme.sectionBodyText,
    },
    sectionBodyTitle: {
      ...colorScheme.sectionBodyTitle,
    },
    sectionBodyTitleText: {
      ...abstractStyles.titleBase,
      ...colorScheme.sectionBodyTitleText,
    },
    sectionBodyTitleSecondaryText: {
      ...abstractStyles.titleBase,
      ...colorScheme.sectionBodyTitleSecondaryText,
    },
    sectionHeaderMachal: {
      ...abstractStyles.sectionPadding,
      ...colorScheme.sectionHeaderMachal,
    },
    sectionHeaderMachalText: {
      ...abstractStyles.titleBase,
      ...colorScheme.sectionHeaderMachalText,
    },
    sectionHeaderWounded: {
      ...abstractStyles.sectionPadding,
      ...colorScheme.sectionHeaderWounded,
    },
    sectionHeaderWoundedText: {
      ...abstractStyles.titleBase,
      ...colorScheme.sectionHeaderWoundedText,
    },
    sectionMain: {
      ...baseSection,
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    primaryButton: {
      ...baseButton,
      ...colorScheme.primaryButton,
    },
    primaryButtonText: {
      ...colorScheme.primaryButtonText,
      fontWeight: 'bold',
    },
    secondaryButton: {
      ...baseButton,
      ...colorScheme.secondaryButton,
    },
    secondaryButtonText: {
      ...colorScheme.secondaryButtonText,
      fontWeight: 'bold',
    },
    secondaryButtonActive: {
      ...colorScheme.secondaryButtonActive,
    },
    secondaryButtonTextActive: {
      ...colorScheme.secondaryButtonTextActive,
    },
    buttonDisabled: {
      ...colorScheme.buttonDisabled,
    },
    buttonDisabledText: {
      ...colorScheme.buttonDisabledText,
    },
    inputGray: {
      ...baseInput,
      ...colorScheme.inputGray,
    },
    inputWhite: {
      ...baseInput,
      ...colorScheme.inputWhite,
    },
    ...abstractStyles,
  });
};

export default getGlobalStyles;
