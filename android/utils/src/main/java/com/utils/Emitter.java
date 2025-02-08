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
        sendEventInternal(eventName, "message", message);
    }

    public static void sendEvent(String eventName, boolean value) {
        sendEventInternal(eventName, "value", value);
    }

    public static void sendEvent(String eventName, int value) {
        sendEventInternal(eventName, "value", value);
    }

    public static void sendEvent(String eventName, double value) {
        sendEventInternal(eventName, "value", value);
    }

    public static void sendEvent(String eventName, WritableMap map) {
        if (reactContext != null) {
            try {
                reactContext
                        .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                        .emit(eventName, map);

                Log.d(TAG, "Event sent to JS: eventName=" + eventName);
            } catch (Exception e) {
                Log.e(TAG, "Error while sending event to JS: eventName=" + eventName, e);
            }
        } else {
            Log.e(TAG, "ReactApplicationContext is null. Event not sent: eventName=" + eventName);
        }
    }

    private static void sendEventInternal(String eventName, String key, Object value) {
        if (reactContext != null) {
            try {
                WritableMap eventMap = new WritableNativeMap();
                if (value instanceof Boolean) {
                    eventMap.putBoolean(key, (Boolean) value);
                } else if (value instanceof Integer) {
                    eventMap.putInt(key, (Integer) value);
                } else if (value instanceof Double) {
                    eventMap.putDouble(key, (Double) value);
                } else if (value instanceof String) {
                    eventMap.putString(key, (String) value);
                }

                reactContext
                        .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                        .emit(eventName, eventMap);

                Log.d(TAG, "Event sent to JS: eventName=" + eventName + ", key=" + key + ", value=" + value);
            } catch (Exception e) {
                Log.e(TAG, "Error while sending event to JS: eventName=" + eventName + ", key=" + key, e);
            }
        } else {
            Log.e(TAG, "ReactApplicationContext is null. Event not sent: eventName=" + eventName);
        }
    }

    public static boolean isInitialized() {
        boolean initialized = reactContext != null;
        Log.d(TAG, "isInitialized() called. Result: " + initialized);
        return initialized;
    }
}
