package com.integrationtestlibs;

import android.content.Intent;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import android.util.Log;
import com.utils.Emitter;

public class SchedulerModule extends ReactContextBaseJavaModule {
    private static final String MODULE_NAME = "Scheduler";
    private static final String TAG = "SchedulerModuleLogs";
    private final ReactApplicationContext reactContext;

    public SchedulerModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return MODULE_NAME;
    }

    @ReactMethod
    public void startService() {
        Log.d(TAG, "startService - aaaa.");
        Intent serviceIntent = new Intent(reactContext, SchedulerService.class);
        Log.d(TAG, "startService - bbbb.");
        reactContext.startService(serviceIntent);
        Log.d(TAG, "startService - cccc.");
    }

    @ReactMethod
    public void stopService() {
        Log.d(TAG, "stopService - aaaa.");
        Intent serviceIntent = new Intent(reactContext, SchedulerService.class);
        Log.d(TAG, "stopService - bbbb.");
        reactContext.stopService(serviceIntent);
        Log.d(TAG, "stopService - cccc.");
    }
}
