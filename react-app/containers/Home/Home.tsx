import React, {useEffect} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {NavigationProp, useNavigation} from '@react-navigation/native';

import {MachalType, RootStackParamList} from '../../config/types';
import {createImagesFolder} from '../../managers/FileManager';

import {RootState, selectUnsyncedMachals} from '../../store/Store';
import {updateConfig} from '../../store/configsSlice';
import {checkSyncStatus} from '../../managers/SyncMachalsManager';
import {styles} from './Home.styles';

import {startMachal} from '../../store/machalSlice';
import {
  getAccessToken,
  initClientMsal,
  login,
  logout,
  updateIsLoggedIn,
} from '../../managers/AuthManager';
import {getMySites} from '../../api/sitesApi';
import {getCurrSiteId} from '../../managers/SitesManager';

const App = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {isOnline, isLoggedIn, imgFolderCreated} = useSelector(
    (state: RootState) => state.appConfig,
  );
  const unsyncedMachals = useSelector(selectUnsyncedMachals);

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
    const initialize = async () => {
      await initClientMsal();
      //logout();
      const accessToken = await getAccessToken();
      //console.log('accessToken', accessToken);
      if (!accessToken) {
        //login();
      }
      if (accessToken) {
        await updateIsLoggedIn(true);
        console.log('ggggggggggggggg', await getCurrSiteId());
        //const res = await getMySites();
        //console.log('res', res);
      }
    };

    initialize();
  }, []);

  const handlePress = (type: MachalType) => {
    dispatch(startMachal({type}));
    navigation.navigate('Atzada');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>חותם</Text>
        <Text style={styles.subHeaderText}>וחותם יד כל אדם בו</Text>
        <Image
          source={require('../../assets/fingerPrints.jpeg')}
          style={styles.fingerprint}
        />
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
            onPress={() => handlePress(MachalType.Machal)}>
            <Text style={styles.buttonText}>חלל</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handlePress(MachalType.Wounded)}>
            <Text style={styles.buttonText}>פצוע אלמוני</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default App;
