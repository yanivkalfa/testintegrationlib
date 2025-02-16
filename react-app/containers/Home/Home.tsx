import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {NavigationProp, useNavigation} from '@react-navigation/native';

import {styles} from './Home.styles';

import {
  CaseType,
  Machal,
  RootStackParamList,
  SyncStatus,
} from '../../config/types';

import {
  getAccessToken,
  initClientMsal,
  login,
  updateIsLoggedIn,
} from '../../managers/AuthManager';
import {checkSyncStatus} from '../../managers/SyncingManager';
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
import {getRandomIDNumber} from '../../utils/math.utils';
import SvgIcon from '../../components/SvgIcon/SvgIcon';
import {
  checkAndDeleteUnusedPrints,
  deleteOldMachalsAndUnusedPrints,
} from '../../managers/GarbageManager';
import {listFiles} from '../../managers/FileManager';

const Home: React.FC = () => {
  const globalStyles = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {isOnline, isLoggedIn} = useSelector(
    (state: RootState) => state.appConfig,
  );

  const unsyncedMachals = useSelector(selectUnsyncedMachals);
  const allMachals = useSelector(selectMachals);
  //console.log('unsyncedMachals', unsyncedMachals);
  //console.log('all Machals ', allMachals);

  useEffect(() => {
    checkSyncStatus(isOnline, isLoggedIn, unsyncedMachals);
  }, [isOnline, isLoggedIn, unsyncedMachals]);

  useEffect(() => {
    const authenticate = async () => {
      await initClientMsal();
      // const accessToken = await getAccessToken();
      // if (accessToken) {
      //   console.log('yes access token');
      //   updateIsLoggedIn(true);
      // } else {
      //   console.log('No access token');
      //   login();
      // }
    };

    checkConnectedDevicesPermissions();
    deleteOldMachalsAndUnusedPrints(); // NEEDS FARTHER TESTING
    authenticate();
  }, []);

  const handlePress = (caseType: CaseType) => {
    const toUpdate: Partial<Machal> = {caseType};
    let navigateTo: keyof RootStackParamList = 'Atzada';
    if (caseType === CaseType.Wounded) {
      toUpdate.id = getRandomIDNumber();
      navigateTo = 'Details';
    }
    dispatch(updateCurrentMachal(toUpdate));
    navigation.navigate(navigateTo);
  };

  useEffect(() => {
    const a = async () => {
      console.log(await listFiles());
      //console.log(checkAndDeleteUnusedPrints());
    };
    a();
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
    <ScrollView style={globalStyles.containerScroll}>
      <View style={[globalStyles.sectionTransparent, globalStyles.alignEnd]}>
        <Logo width={'80%'} />
      </View>

      <View style={globalStyles.sectionSpacer} />
      <View style={globalStyles.section}>
        <View style={globalStyles.sectionHeader}>
          <Text style={globalStyles.sectionHeaderText}>הוראות בטיחות</Text>
        </View>
        <View style={globalStyles.sectionBody}>
          <Text style={globalStyles.sectionBodyText}>
            - יש לטפל בסיכונים ביטחוניים ובבטיחותיים
          </Text>
          <Text style={globalStyles.sectionBodyText}>
            {' '}
            הנמצאים בדירה ועל החלל, כגון אמל"ח ונשק
          </Text>
          <Text style={globalStyles.sectionBodyText}>
            - יש ללבוש אפוד זיהוי רה"צ
          </Text>
          <Text style={globalStyles.sectionBodyText}>
            - לפני הרשמת טביעת יד יש לנקות את אצבעות החלל
          </Text>
          <Text style={globalStyles.sectionBodyText}>
            - אין להעלות מידע סודי למערכת (כוחות מתמרנים, מצבי מבצע...)
          </Text>
        </View>
      </View>

      <View style={globalStyles.sectionSpacer} />
      <View style={globalStyles.sectionSpacer} />
      <View style={globalStyles.section}>
        <View style={globalStyles.sectionHeader}>
          <Text style={globalStyles.sectionHeaderText}>בחירת סוג מקרה</Text>
        </View>
        <View style={globalStyles.sectionBody}>
          <View style={globalStyles.rowSpace}>
            <TouchableOpacity
              style={[styles.button, globalStyles.marginRight]}
              onPress={() => handlePress(CaseType.Machal)}>
              <SvgIcon name="corpse" width={20} />
              <Text style={styles.buttonText}>חלל</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, globalStyles.marginLeft]}
              onPress={() => handlePress(CaseType.Wounded)}>
              <SvgIcon name="wounded" width={20} />
              <Text style={styles.buttonText}>פצוע אלמוני</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;

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
