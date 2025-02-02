package com.utils;

import android.util.Log;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class Emitter {
    private static ReactApplicationContext reactContext;
    private static final String TAG = "ReactNativeEmitter";

    public static void initialize(ReactApplicationContext context) {
        if (context == null) {
            Log.e(TAG, "ReactApplicationContext is null during initialization.");
            return;
        }

        reactContext = context;
        Log.d(TAG, "Emitter initialized with ReactApplicationContext: " + reactContext.getPackageName());
    }

    public static void log(String logMessage) {
        Log.d(TAG, "log() called with message: " + logMessage);

        if (reactContext != null) {
            try {
                WritableMap logMap = new WritableNativeMap();
                logMap.putString("log", logMessage);

                reactContext
                        .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                        .emit("onNativeLog", logMap);

                Log.d(TAG, "Log message sent to JS: " + logMessage);
            } catch (Exception e) {
                Log.e(TAG, "Error while sending log message to JS: " + logMessage, e);
            }
        } else {
            Log.e(TAG, "ReactApplicationContext is null. Log not sent: " + logMessage);
        }
    }

    public static void sendEvent(String eventName, String message) {
        Log.d(TAG, "sendEvent() called with eventName: " + eventName + ", message: " + message);

        if (reactContext != null) {
            try {
                WritableMap eventMap = new WritableNativeMap();
                eventMap.putString("message", message);

                reactContext
                        .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                        .emit(eventName, eventMap);

                Log.d(TAG, "Event sent to JS: eventName=" + eventName + ", message=" + message);
            } catch (Exception e) {
                Log.e(TAG, "Error while sending event to JS: eventName=" + eventName + ", message=" + message, e);
            }
        } else {
            Log.e(TAG, "ReactApplicationContext is null. Event not sent: eventName=" + eventName + ", message=" + message);
        }
    }

    public static boolean isInitialized() {
        boolean initialized = reactContext != null;
        Log.d(TAG, "isInitialized() called. Result: " + initialized);
        return initialized;
    }
}
