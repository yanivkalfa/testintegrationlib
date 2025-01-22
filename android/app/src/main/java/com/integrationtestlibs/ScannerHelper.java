package com.integrationtestlibs;

import android.content.Context;

import com.integratedbiometrics.ibscanultimate.IBScan;
import com.integratedbiometrics.ibscanultimate.IBScanDevice;
import com.integratedbiometrics.ibscanultimate.IBScanException;
import com.integratedbiometrics.ibscanultimate.IBScanListener;
import com.utils.NativeLogger;

public class ScannerHelper implements IBScanListener {
    private static final String TAG = "ScannerHelper";
    private IBScan mIBScan;

    public interface ScannerEvents {
        void onDeviceConnected(int deviceId);
        void onDeviceDisconnected(int deviceId);
        void onPermissionGranted(int deviceId);
        void onPermissionDenied(int deviceId);
        void onError(String errorMessage);
    }

    private final ScannerEvents events;

    public ScannerHelper(Context context, ScannerEvents events) {
        this.events = events;

        try {
            // Initialize IBScan and set the context
            mIBScan = IBScan.getInstance(context);
            if (mIBScan != null) {
                mIBScan.setContext(context); // Set the context for USB handling
                mIBScan.setScanListener(this); // Register this helper as the listener
                NativeLogger.log("IBScan initialized and context set.");
            } else {
                NativeLogger.log("IBScan instance is null.");
                if (events != null) {
                    events.onError("IBScan instance is null.");
                }
            }
        } catch (Exception e) {
            NativeLogger.log("Error initializing IBScan: " + e.getMessage());
            if (events != null) {
                events.onError("Error initializing IBScan: " + e.getMessage());
            }
        }
    }

    public IBScan getIBScanInstance() {
        return mIBScan;
    }

    @Override
    public void scanDeviceAttached(int deviceId) {
        NativeLogger.log("Device attached: " + deviceId);
        if (events != null) {
            events.onDeviceConnected(deviceId);
        }

        try {
            if (!mIBScan.hasPermission(deviceId)) {
                mIBScan.requestPermission(deviceId);
            } else {
                NativeLogger.log("Permission already granted for device: " + deviceId);
                if (events != null) {
                    events.onPermissionGranted(deviceId);
                }
            }
        } catch (Exception e) {
            NativeLogger.log("Error requesting permission: " + e.getMessage());
            if (events != null) {
                events.onError("Error requesting permission: " + e.getMessage());
            }
        }
    }

    @Override
    public void scanDeviceDetached(int deviceId) {
        NativeLogger.log("Device detached: " + deviceId);
        if (events != null) {
            events.onDeviceDisconnected(deviceId);
        }
    }

    @Override
    public void scanDevicePermissionGranted(int deviceId, boolean granted) {
        NativeLogger.log("ACTION_USB_PERMISSION - IIIIIIIIIIIIIIIIIIII");
        if (granted) {
            NativeLogger.log("Permission granted for device: " + deviceId);
            if (events != null) {
                events.onPermissionGranted(deviceId);
            }
        } else {
            NativeLogger.log("Permission denied for device: " + deviceId);
            if (events != null) {
                events.onPermissionDenied(deviceId);
            }
        }
    }

    @Override
    public void scanDeviceCountChanged(int count) {
        NativeLogger.log("Device count changed: " + count);
    }

    @Override
    public void scanDeviceInitProgress(int deviceId, int progress) {
        NativeLogger.log("Device " + deviceId + " initialization progress: " + progress + "%");
    }

    @Override
    public void scanDeviceOpenComplete(int deviceId, IBScanDevice device, IBScanException exception) {
        if (exception == null) {
            NativeLogger.log("Device " + deviceId + " opened successfully.");
        } else {
            NativeLogger.log("Error opening device " + deviceId + ": " + exception.getMessage());
            if (events != null) {
                events.onError("Error opening device: " + exception.getMessage());
            }
        }
    }
}
