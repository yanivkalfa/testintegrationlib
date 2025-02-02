package com.utils;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class Emitter {
    private static ReactApplicationContext reactContext;

    public static void initialize(ReactApplicationContext context) {
        reactContext = context;
    }

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

    public static void sendEvent(String eventName, String message) {
        if (reactContext != null) {
            WritableMap eventMap = new WritableNativeMap();
            eventMap.putString("message", message);

            reactContext
                    .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit(eventName, eventMap);
        } else {
            System.out.println("ReactApplicationContext is null. Event not sent: " + eventName + " - " + message);
        }
    }
}
