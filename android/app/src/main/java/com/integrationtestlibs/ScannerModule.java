package com.integrationtestlibs;

import android.graphics.Bitmap;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class ScannerModule extends ReactContextBaseJavaModule {
    private static final String TAG = "ScannerModule";
    private final ScannerHelper scannerHelper;

    public ScannerModule(ReactApplicationContext reactContext) {
        super(reactContext);

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
            public void onDeviceReadyForScanning(int deviceId) {
                sendEvent("onDeviceReadyForScanning", "Device is ready for scanning: " + deviceId);
            }

            @Override
            public void onPermissionDenied(int deviceId) {
                sendEvent("onPermissionDenied", "Permission denied for device: " + deviceId);
            }

            @Override
            public void onCaptureStarted() {
                sendEvent("onCaptureStarted", "Capture started");
            }

            @Override
            public void onCaptureCancelled() {
                sendEvent("onCaptureCancelled", "Capture cancelled");
            }

            @Override
            public void onCaptureUpdated(Bitmap image) {
                sendEvent("onCaptureUpdated", imageToBase64(image));
            }

            @Override
            public void onCaptureCompleted(Bitmap image) {
                sendEvent("onCaptureCompleted", imageToBase64(image));
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

    private void sendEvent(String eventName, String message) {
        ReactApplicationContext context = getReactApplicationContext();
        if (context.hasActiveCatalystInstance()) {
            context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit(eventName, message);
        }
    }

    private String imageToBase64(Bitmap image) {
        java.io.ByteArrayOutputStream byteArrayOutputStream = new java.io.ByteArrayOutputStream();
        image.compress(Bitmap.CompressFormat.PNG, 100, byteArrayOutputStream);
        byte[] byteArray = byteArrayOutputStream.toByteArray();
        return android.util.Base64.encodeToString(byteArray, android.util.Base64.DEFAULT);
    }

    @ReactMethod
    public void beginCaptureImage() {
        scannerHelper.beginCaptureImage();
    }

    @ReactMethod
    public void cancelCaptureImage() {
        scannerHelper.cancelCaptureImage();
    }
}
