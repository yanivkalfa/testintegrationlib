package com.utils;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class NativeLogger {
    private static ReactApplicationContext reactContext;

    // Initialize the logger with ReactApplicationContext
    public static void initialize(ReactApplicationContext context) {
        reactContext = context;
    }

    // Method to send log messages to React Native
    public static void log(String logMessage) {
        if (reactContext != null) {
            WritableMap logMap = new WritableNativeMap();
            logMap.putString("log", logMessage);

            reactContext
                    .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit("onNativeLog", logMap);
        } else {
            System.out.println("ReactApplicationContext is null. Log not sent: " + logMessage);
        }
    }
}
