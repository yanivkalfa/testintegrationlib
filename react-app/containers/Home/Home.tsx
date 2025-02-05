import React, {useEffect} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {NavigationProp, useNavigation} from '@react-navigation/native';

import {MachalType, RootStackParamList} from '../../config/types';
import {createImagesFolder} from '../../FileManager';

import {
  RootState,
  selectMachals,
  selectUnsyncedMachals,
} from '../../store/Store';
import {updateConfig} from '../../store/configsSlice';
import {checkSyncStatus} from '../../SyncMachals';
import {styles} from './Home.styles';

import {startMachal} from '../../store/machalSlice';

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

  const handlePress = (type: MachalType) => {
    dispatch(startMachal({type}));
    navigation.navigate('Atzada');
  };

  const login = () => {
    navigation.navigate('Auth');
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
            onPress={() => handlePress(MachalType.deadSolider)}>
            <Text style={styles.buttonText}>חלל</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handlePress(MachalType.unknownInjured)}>
            <Text style={styles.buttonText}>פצוע אלמוני</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => login()}>
            <Text style={styles.buttonText}>התחבר</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default App;

// return (
//   <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//     <Text>Home Screen</Text>
//     <Button onPress={handlePress}>Go to Bodies</Button>
//   </View>
// );

{
  /* <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Counter: {counterValue}</Text>
        <Button onPress={() => dispatch(increment())}>Increment Counter</Button>
      </View> */
}
