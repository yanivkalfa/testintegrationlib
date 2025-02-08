import notifee, {EventType, AndroidImportance} from '@notifee/react-native';
import {Linking} from 'react-native';
import {
  LOGIN_NOTIFICATION_ID,
  SYNC_FAILED_NOTIFICATION_ID,
  SYNC_SUCCESS_NOTIFICATION_ID,
} from '../config/consts';
import {NotificationPayload} from '../config/types';

const initializeNotifications = async () => {
  try {
    await notifee.createChannel({
      id: 'default-channel-id',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
    });
  } catch (error) {
    console.error('Error creating notification channel:', error);
  }
};

notifee.onForegroundEvent(({type, detail}) => {
  if (type === EventType.PRESS) {
    const deepLink = detail.notification?.data?.deepLink;
    if (typeof deepLink === 'string') {
      Linking.openURL(deepLink).catch(err =>
        console.error('Error opening deep link:', err),
      );
    }
  }
});

export const sendNotification = async ({
  title,
  body,
  deepLink,
  id,
}: NotificationPayload) => {
  try {
    await notifee.displayNotification({
      id,
      title,
      body,
      android: {
        channelId: 'default-channel-id',
        importance: AndroidImportance.HIGH,
        sound: 'default',
      },
      data: {
        deepLink,
      },
    });
  } catch (error) {
    console.error('Error sending notification:', error);
  }
};

export const sendLoginNotification = async (id?: string) =>
  sendNotification({
    id: id || LOGIN_NOTIFICATION_ID,
    title: 'Login Required',
    body: 'Please login to continue.',
    deepLink: 'mezah://login',
  });

export const sendSyncSuccessNotification = async (id?: string) =>
  sendNotification({
    id: id || SYNC_SUCCESS_NOTIFICATION_ID,
    title: 'Sync Successful',
    body: 'Your data has been synced!',
    deepLink: 'mezah://sync-success',
  });

export const sendSyncFailedNotification = async (id?: string) =>
  sendNotification({
    id: id || SYNC_FAILED_NOTIFICATION_ID,
    title: 'Sync Failed',
    body: 'Failed to sync data. Tap for details.',
    deepLink: 'mezah://sync-failed',
  });

initializeNotifications();
