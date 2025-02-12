import {StyleSheet} from 'react-native';
import {palette} from './global.colors';
import {ColorScheme} from './global.types';

// const defaultColorScheme: ColorScheme = {
//   navBar: {
//     backgroundColor: '#',
//     color: '#',
//   },
//   header: {
//     backgroundColor: '#',
//     color: '',
//   },
//   headerMachal: {
//     backgroundColor: '#',
//     color: '#',
//   },
//   headerWounded: {
//     backgroundColor: '#',
//     color: '#',
//   },
//   body: {
//     backgroundColor: '#',
//     color: '#',
//   },
//   bodyTitle: {
//     color: '#',
//   },
//   section: {
//     backgroundColor: '#',
//     color: '#',
//   },
//   sectionTitle: {
//     color: '#',
//   },
//   sectionBody: {
//     backgroundColor: '#',
//     color: '#',
//   },
//   sectionBodyTitle: {
//     color: '#',
//   },
//   buttonApprove: {
//     backgroundColor: '#',
//     borderColor: '#',
//   },
//   buttonApproveText: {
//     color: '#',
//   },
//   buttonCancel: {
//     backgroundColor: '#',
//     borderColor: '#',
//   },
//   buttonCancelText: {
//     color: '#',
//   },
// };
const abstractStyles = {
  sectionPadding: {
    padding: 12,
  },
  sectionMargin: {
    marginTop: 8,
  },
  alignCenter: {
    alignItems: 'center' as 'center',
  },
  titleBase: {
    fontSize: 18,
    ffontWeight: 'bold',
  },
};

const getGlobalStyles = (colorScheme: ColorScheme) => {
  const baseEmptySection = {
    ...abstractStyles.sectionPadding,
    ...abstractStyles.sectionMargin,
  };

  const baseSection = {
    ...baseEmptySection,
    backgroundColor: colorScheme.section?.backgroundColor,
    borderBottomWidth: 1,
    borderBottomColor: colorScheme.section?.borderBottomColor,
  };

  const baseContainer = {
    flex: 1,
    backgroundColor: colorScheme.body?.backgroundColor,
  };
  return StyleSheet.create({
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
    sectionTransparent: {
      ...baseEmptySection,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    section: {
      ...baseSection,
      ...abstractStyles.alignCenter,
    },
    sectionMain: {
      ...baseSection,
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    sectionFullHeight: {
      ...baseSection,
      flexGrow: 1,
    },
    sectionHorizontal: {
      ...baseSection,
      flexDirection: 'row',
    },
    sectionWithHeader: {
      ...baseSection,
      justifyContent: 'flex-start',
    },
    sectionHeader: {
      ...abstractStyles.titleBase,
      ...colorScheme.sectionHeader,
    },
    sectionHeaderMachal: {
      ...abstractStyles.titleBase,
      ...colorScheme.sectionHeaderMachal,
    },
    sectionHeaderWounded: {
      ...abstractStyles.titleBase,
      ...colorScheme.sectionHeaderWounded,
    },
    sectionBodyTitle: {
      ...abstractStyles.titleBase,
      color: colorScheme.sectionBodyTitle?.color,
    },
    sectionSubTitle: {
      fontSize: 16,
      color: '#555',
    },
    actionButton: {
      flex: 1,
      marginHorizontal: 8,
      padding: 12,
      backgroundColor: '#007BFF',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#007BFF',
      alignItems: 'center',
      justifyContent: 'center',
    },
    actionButtonSelected: {
      backgroundColor: '#E3F2FD',
      borderColor: '#64B5F6',
    },
    actionButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    abortButton: {
      flex: 1,
      marginRight: 8,
      padding: 12,
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: '#007BFF',
      borderRadius: 8,
      alignItems: 'center',
    },
    abortButtonText: {
      fontSize: 16,
      color: '#007BFF',
      fontWeight: 'bold',
    },
    abortButton_12: {
      flex: 1,
      marginRight: 8,
      padding: 3,
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: '#007BFF',
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    textSize_12: {
      fontSize: 12,
      color: '#007BFF',
    },
    spacer: {
      marginTop: 8,
    },
    disabled: {
      backgroundColor: '#7a7a7a',
      borderColor: '#7a7a7a',
      color: '#b5b5b5',
    },
  });
};

export default getGlobalStyles;
