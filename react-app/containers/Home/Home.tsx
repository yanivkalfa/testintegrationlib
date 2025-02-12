import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {NavigationProp, useNavigation} from '@react-navigation/native';

import {styles} from './Home.styles';

import {CaseType, RootStackParamList, SyncStatus} from '../../config/types';

import {createImagesFolder} from '../../managers/FileManager';
import {
  getAccessToken,
  initClientMsal,
  login,
  updateIsLoggedIn,
} from '../../managers/AuthManager';
import {checkSyncStatus} from '../../managers/SyncMachalsManager';
import {checkConnectedDevicesPermissions} from '../../managers/ScannerManager';

import {
  AppDispatch,
  RootState,
  selectMachals,
  selectUnsyncedMachals,
} from '../../store/store';
import {updateConfig} from '../../store/configsSlice';
import {updateCurrentMachal} from '../../store/machalSlice';
import {deleteMachalThunk, updateMachal} from '../../store/machalsSlice';
import {useTheme} from '../../theme/hook/useTheme';

import Logo from '../../assets/logo.svg';

const App: React.FC = () => {
  const globalStyles = useTheme();

  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {isOnline, isLoggedIn, imgFolderCreated} = useSelector(
    (state: RootState) => state.appConfig,
  );

  const unsyncedMachals = useSelector(selectUnsyncedMachals);
  const allMachals = useSelector(selectMachals);
  console.log('unsyncedMachals', unsyncedMachals);
  console.log('allMachals', allMachals);

  useEffect(() => {
    if (!imgFolderCreated) {
      createImagesFolder()
        .then(() => {
          dispatch(updateConfig({name: 'imgFolderCreated', value: true}));
        })
        .catch(() => {
          console.log('Something went wrong');
        });
    }
  }, [imgFolderCreated, createImagesFolder, updateConfig, console]);

  useEffect(() => {
    checkSyncStatus(isOnline, isLoggedIn, unsyncedMachals);
  }, [isOnline, isLoggedIn, unsyncedMachals]);

  useEffect(() => {
    const authenticate = async () => {
      await initClientMsal();
      const accessToken = await getAccessToken();
      if (accessToken) {
        console.log('yes access token');
        updateIsLoggedIn(true);
      } else {
        console.log('No access token');
        login();
      }
    };

    checkConnectedDevicesPermissions();
    authenticate();
  }, []);

  const handlePress = (caseType: CaseType) => {
    dispatch(updateCurrentMachal({caseType}));
    navigation.navigate('Atzada');
  };

  useEffect(() => {
    // console.log('zzzzzzzzzzzzzzzzzzzzzzzzzzzzz');
    // dispatch(
    //   updateMachal({
    //     id: '9876543210',
    //     updatedMachal: {syncStatus: SyncStatus.NEED_SYNC},
    //   }),
    // );
  }, []);

  // useEffect(() => {
  //   const deleteAllMachal = async () => {
  //     try {
  //       for (const machal of allMachals) {
  //         console.log('Deleting machal:', machal);
  //         await dispatch(deleteMachalThunk(machal.id)).unwrap();
  //       }
  //     } catch (error) {
  //       console.error('Error while deleting machals:', error);
  //     }
  //   };

  //   deleteAllMachal();
  // }, [allMachals, dispatch]);

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.sectionTransparent}>
        <Logo />
      </View>
      <View style={styles.instructionsContainer}>
        <Text style={styles.sectionTitle}>הוראות בטיחות</Text>
        <View style={styles.instructions}>
          <Text style={styles.instructionText}>
            - יש לטפל בסיכונים ביטחוניים ובבטיחותיים
          </Text>
          <Text style={styles.instructionText}>
            {' '}
            הנמצאים בדירה ועל החלל, כגון אמל"ח ונשק
          </Text>
          <Text style={styles.instructionText}>- יש ללבוש אפוד זיהוי רה"צ</Text>
          <Text style={styles.instructionText}>
            - לפני הרשמת טביעת יד יש לנקות את אצבעות החלל
          </Text>
          <Text style={styles.instructionText}>
            - אין להעלות מידע סודי למערכת (כוחות מתמרנים, מצבי מבצע...)
          </Text>
        </View>
      </View>

      <View style={styles.buttonsContainer}>
        <Text style={styles.sectionTitle}>בחירת סוג מקרה</Text>
        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handlePress(CaseType.Machal)}>
            <Text style={styles.buttonText}>חלל</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handlePress(CaseType.Wounded)}>
            <Text style={styles.buttonText}>פצוע אלמוני</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default App;

// useEffect(() => {
//   const deleteAllMachal = async () => {
//     try {
//       for (const machal of allMachals) {
//         console.log('Deleting machal:', machal);
//         await dispatch(deleteMachalThunk(machal.id)).unwrap();
//       }
//     } catch (error) {
//       console.error('Error while deleting machals:', error);
//     }
//   };

//   deleteAllMachal();
// }, [allMachals, dispatch]);
