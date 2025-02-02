package com.integrationtestlibs;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.os.Handler;
import android.os.IBinder;
import android.app.ActivityManager;
import android.util.Log;

import com.utils.Emitter;
import androidx.annotation.Nullable;

public class SchedulerService extends Service {
    public static final String EVENT_NAME = "SchedulerEvent";
    private static final String TAG = "SchedulerLogs";
    private Handler handler;
    private Runnable runnable;
    private static boolean isServiceRunning = false;

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        if (!isServiceRunning) {
            isServiceRunning = true;
            Log.d(TAG, "onStartCommand - Service is starting.");
            startForegroundService();
            handler = new Handler();
            Log.d(TAG, "onStartCommand - Handler initialized.");
            runnable = new Runnable() {
                @Override
                public void run() {
                    Log.d(TAG, "Runnable - Sending tick event.");
                    Emitter.sendEvent(EVENT_NAME, "tick");
                    handler.postDelayed(this, 1000); // Send event every 10 seconds
                }
            };

            Log.d(TAG, "onStartCommand - Runnable initialized. Posting first run.");
            handler.post(runnable);
        } else {
            Log.d(TAG, "onStartCommand - Service is already running. Skipping initialization.");
        }
        return START_STICKY;
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        Log.d(TAG, "onDestroy - Service is being destroyed.");
        if (handler != null && runnable != null) {
            Log.d(TAG, "onDestroy - Removing callbacks from handler.");
            handler.removeCallbacks(runnable);
        }
        stopForeground(true);
        isServiceRunning = false;
        Log.d(TAG, "onDestroy - Service stopped and foreground notification removed.");
    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        Log.d(TAG, "onBind - Binding not supported.");
        return null;
    }

    private void startForegroundService() {
        String channelId = "SCHEDULER_CHANNEL";
        String channelName = "Scheduler Service";

        Log.d(TAG, "startForegroundService - Initializing foreground service.");

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            Log.d(TAG, "startForegroundService - Creating notification channel for API 26+.");

            // Create NotificationChannel for API 26 and above
            NotificationChannel channel = new NotificationChannel(
                    channelId,
                    channelName,
                    NotificationManager.IMPORTANCE_DEFAULT
            );

            NotificationManager manager = (NotificationManager) getSystemService(NOTIFICATION_SERVICE);
            if (manager != null) {
                manager.createNotificationChannel(channel);
                Log.d(TAG, "startForegroundService - Notification channel created.");
            } else {
                Log.e(TAG, "startForegroundService - Failed to create notification channel.");
            }
        }

        Log.d(TAG, "startForegroundService - Preparing notification.");

        Notification notification;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            Log.d(TAG, "startForegroundService - Using Notification.Builder with channel.");

            notification = new Notification.Builder(this, channelId)
                    .setContentTitle("Scheduler Service")
                    .setContentText("Service is running in the background.")
                    .setSmallIcon(R.mipmap.ic_launcher)
                    .build();
        } else {
            Log.d(TAG, "startForegroundService - Using Notification.Builder for older APIs.");

            notification = new Notification.Builder(this)
                    .setContentTitle("Scheduler Service")
                    .setContentText("Service is running in the background.")
                    .setSmallIcon(R.mipmap.ic_launcher)
                    .build();
        }

        Log.d(TAG, "startForegroundService - Starting foreground service with notification.");
        startForeground(1, notification);
    }

    public static boolean isServiceRunning(Context context, Class<?> serviceClass) {
        Log.d(TAG, "isServiceRunning - Checking if service is running.");
        ActivityManager manager = (ActivityManager) context.getSystemService(Context.ACTIVITY_SERVICE);
        for (ActivityManager.RunningServiceInfo service : manager.getRunningServices(Integer.MAX_VALUE)) {
            if (serviceClass.getName().equals(service.service.getClassName())) {
                Log.d(TAG, "isServiceRunning - Service is running.");
                return true;
            }
        }
        Log.d(TAG, "isServiceRunning - Service is not running.");
        return false;
    }
}
