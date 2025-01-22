package com.integrationtestlibs;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class ScannerModule extends ReactContextBaseJavaModule {
    private static final String TAG = "ScannerModule";
    private final ScannerHelper scannerHelper;

    public ScannerModule(ReactApplicationContext reactContext) {
        super(reactContext);

        // Initialize ScannerHelper
        scannerHelper = new ScannerHelper(reactContext, new ScannerHelper.ScannerEvents() {
            @Override
            public void onDeviceConnected(int deviceId) {
                sendEvent("onDeviceConnected", "Device connected: " + deviceId);
            }

            @Override
            public void onDeviceDisconnected(int deviceId) {
                sendEvent("onDeviceDisconnected", "Device disconnected: " + deviceId);
            }

            @Override
            public void onPermissionGranted(int deviceId) {
                sendEvent("onPermissionGranted", "Permission granted for device: " + deviceId);
            }

            @Override
            public void onPermissionDenied(int deviceId) {
                sendEvent("onPermissionDenied", "Permission denied for device: " + deviceId);
            }

            @Override
            public void onError(String errorMessage) {
                sendEvent("onError", errorMessage);
            }
        });
    }

    @Override
    public String getName() {
        return "ScannerModule";
    }

    /*
    @ReactMethod
    public void requestPermission(int deviceId) {
        try {
            if (scannerHelper.getIBScanInstance() != null) {
                boolean hasPermission = scannerHelper.getIBScanInstance().hasPermission(deviceId);
                if (hasPermission) {
                    sendEvent("onPermissionGranted", "Permission already granted for device: " + deviceId);
                } else {
                    scannerHelper.getIBScanInstance().requestPermission(deviceId);
                }
            } else {
                sendEvent("onError", "IBScan instance is not initialized.");
            }
        } catch (Exception e) {
            sendEvent("onError", "Error requesting permission: " + e.getMessage());
        }
    }
    */

    private void sendEvent(String eventName, String message) {
        ReactApplicationContext context = getReactApplicationContext();
        if (context.hasActiveCatalystInstance()) {
            context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit(eventName, message);
        }
    }
}
