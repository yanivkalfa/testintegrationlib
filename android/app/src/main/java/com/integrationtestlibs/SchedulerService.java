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

import com.utils.Emitter;
import androidx.annotation.Nullable;

public class SchedulerService extends Service {
    public static final String EVENT_NAME = "SchedulerEvent";
    private Handler handler;
    private Runnable runnable;
    private static boolean isServiceRunning = false;

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        if (!isServiceRunning) {
            isServiceRunning = true;

            Emitter.log("onStartCommand hhhhhhhhhhh");

            startForegroundService();

            handler = new Handler();
            Emitter.log("onStartCommand iiiiiiiiiiii");
            runnable = new Runnable() {
                @Override
                public void run() {
                    Emitter.log("onStartCommand jjjjjjjjjjjjjj");
                    Emitter.sendEvent(EVENT_NAME, "tick");
                    handler.postDelayed(this, 10000); // Send event every 60 seconds
                }
            };
            Emitter.log("onStartCommand kkkkkkkkkkkkkkkkkkkkkkk");
            handler.post(runnable);
        }
        return START_STICKY;
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        if (handler != null && runnable != null) {
            handler.removeCallbacks(runnable);
        }
        stopForeground(true);
        isServiceRunning = false;
    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    private void startForegroundService() {
        String channelId = "SCHEDULER_CHANNEL";
        String channelName = "Scheduler Service";

        Emitter.log("startForegroundService AAAAAA");

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
          Emitter.log("startForegroundService BBBBB");
            // Create NotificationChannel for API 26 and above
            NotificationChannel channel = new NotificationChannel(
                    channelId,
                    channelName,
                    NotificationManager.IMPORTANCE_DEFAULT
            );

            NotificationManager manager = (NotificationManager) getSystemService(NOTIFICATION_SERVICE);
            if (manager != null) {
                manager.createNotificationChannel(channel);
            }
            Emitter.log("startForegroundService CCCCC");
        }

        Emitter.log("startForegroundService DDDDDD");
        Notification notification;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            Emitter.log("startForegroundService EEEEE");
            // Use channel for API 26+
            notification = new Notification.Builder(this, channelId)
                    .setContentTitle("Scheduler Service")
                    .setContentText("Service is running in the background.")
                    .setSmallIcon(R.mipmap.ic_launcher) // Replace with your app's icon
                    .build();
        } else {
            Emitter.log("startForegroundService FFFFFF");
            // Fallback for older APIs
            notification = new Notification.Builder(this)
                    .setContentTitle("Scheduler Service")
                    .setContentText("Service is running in the background.")
                    .setSmallIcon(R.mipmap.ic_launcher) // Replace with your app's icon
                    .build();
        }

        Emitter.log("startForegroundService GGGGG");
        startForeground(1, notification); // Start foreground service with the notification
    }

    public static boolean isServiceRunning(Context context, Class<?> serviceClass) {
        ActivityManager manager = (ActivityManager) context.getSystemService(Context.ACTIVITY_SERVICE);
        for (ActivityManager.RunningServiceInfo service : manager.getRunningServices(Integer.MAX_VALUE)) {
            if (serviceClass.getName().equals(service.service.getClassName())) {
                return true;
            }
        }
        return false;
    }
}
