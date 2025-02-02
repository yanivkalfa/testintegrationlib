package com.integrationtestlibs;

import android.content.Intent;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import com.utils.Emitter;

public class SchedulerModule extends ReactContextBaseJavaModule {
    private static final String MODULE_NAME = "Scheduler";
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
        Emitter.log("aaaaaaaaaaaaaaaaaaaaaaaa");
        Intent serviceIntent = new Intent(reactContext, SchedulerService.class);
        Emitter.log("bbbbbbbbbbbbbbbbbbbbbbb");
        reactContext.startService(serviceIntent);
    }

    @ReactMethod
    public void stopService() {
        Intent serviceIntent = new Intent(reactContext, SchedulerService.class);
        reactContext.stopService(serviceIntent);
    }
}
