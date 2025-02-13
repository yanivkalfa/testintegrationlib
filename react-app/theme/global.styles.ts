import {StyleSheet} from 'react-native';
import {palette} from './global.colors';
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
    rowEnd: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
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
      color: colorScheme.sectionBodyTitleText?.color,
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

    // sectionFullHeight: {
    //   ...baseSection,
    //   flexGrow: 1,
    // },
    // sectionHorizontal: {
    //   ...baseSection,
    //   flexDirection: 'row',
    // },
    // sectionWithHeader: {
    //   ...baseSection,
    //   justifyContent: 'flex-start',
    // },
    // sectionSubTitle: {
    //   fontSize: 16,
    //   color: '#555',
    // },
    // actionButton: {
    //   flex: 1,
    //   marginHorizontal: 8,
    //   padding: 12,
    //   backgroundColor: '#007BFF',
    //   borderRadius: 8,
    //   borderWidth: 1,
    //   borderColor: '#007BFF',
    //   alignItems: 'center',
    //   justifyContent: 'center',
    // },
    // actionButtonSelected: {
    //   backgroundColor: '#E3F2FD',
    //   borderColor: '#64B5F6',
    // },
    // actionButtonText: {
    //   color: '#fff',
    //   fontSize: 16,
    //   fontWeight: 'bold',
    // },
    // abortButton: {
    //   flex: 1,
    //   marginRight: 8,
    //   padding: 12,
    //   backgroundColor: '#fff',
    //   borderWidth: 1,
    //   borderColor: '#007BFF',
    //   borderRadius: 8,
    //   alignItems: 'center',
    // },
    // abortButtonText: {
    //   fontSize: 16,
    //   color: '#007BFF',
    //   fontWeight: 'bold',
    // },
    // abortButton_12: {
    //   flex: 1,
    //   marginRight: 8,
    //   padding: 3,
    //   backgroundColor: '#fff',
    //   borderWidth: 1,
    //   borderColor: '#007BFF',
    //   borderRadius: 8,
    //   alignItems: 'center',
    //   justifyContent: 'center',
    // },
    // textSize_12: {
    //   fontSize: 12,
    //   color: '#007BFF',
    // },
    // spacer: {
    //   marginTop: 8,
    // },
    // disabled: {
    //   backgroundColor: '#7a7a7a',
    //   borderColor: '#7a7a7a',
    //   color: '#b5b5b5',
    // },
    ...abstractStyles,
  });
};

export default getGlobalStyles;

// width: '100%',
//     backgroundColor: '#ffffff',
//     borderRadius: 10,
//     padding: 15,
//     marginBottom: 20,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
