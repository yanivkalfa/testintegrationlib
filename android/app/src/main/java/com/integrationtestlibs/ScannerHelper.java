package com.integrationtestlibs;

import android.content.Context;
import android.graphics.Bitmap;
import android.hardware.usb.UsbDevice;
import android.hardware.usb.UsbManager;

import com.integratedbiometrics.ibscanultimate.IBScan;
import com.integratedbiometrics.ibscanultimate.IBScanDevice;
import com.integratedbiometrics.ibscanultimate.IBScanException;
import com.integratedbiometrics.ibscanultimate.IBScanDeviceListener;
import com.integratedbiometrics.ibscanultimate.IBScanListener;
import com.integratedbiometrics.ibscanultimate.IBScanDevice.FingerCountState;
import com.integratedbiometrics.ibscanultimate.IBScanDevice.FingerQualityState;
import com.integratedbiometrics.ibscanultimate.IBScanDevice.ImageData;
import com.integratedbiometrics.ibscanultimate.IBScanDevice.ImageType;
import com.integratedbiometrics.ibscanultimate.IBScanDevice.PlatenState;
import com.integratedbiometrics.ibscanultimate.IBScanDevice.SegmentPosition;
import com.utils.Emitter;

import java.util.HashMap;

public class ScannerHelper implements IBScanListener, IBScanDeviceListener {
    private static final String TAG = "ScannerHelper";
    private final Context context;
    private IBScan mIBScan;
    private IBScanDevice mIBScanDevice;

    public interface ScannerEvents {
        void onDeviceConnected(int deviceId);
        void onDeviceDisconnected(int deviceId);
        void onPermissionGranted(int deviceId);
        void onPermissionDenied(int deviceId);
        void onDeviceReadyForScanning(int deviceId);
        void onCaptureStarted();
        void onCaptureCancelled();
        void onCaptureUpdated(Bitmap image);
        void onCaptureCompleted(Bitmap image);
        void onError(String errorMessage);
    }

    private final ScannerEvents events;

    public ScannerHelper(Context context, ScannerEvents events) {
        this.context = context;
        this.events = events;

        try {
            mIBScan = IBScan.getInstance(context);
            if (mIBScan != null) {
                mIBScan.setContext(context); // Set the context for USB handling
                mIBScan.setScanListener(this); // Register this helper as the listener
                Emitter.log("IBScan initialized and context set.");
            } else {
                Emitter.log("IBScan instance is null.");
                if (events != null) {
                    events.onError("IBScan instance is null.");
                }
            }
        } catch (Exception e) {
            Emitter.log("Error initializing IBScan: " + e.getMessage());
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
        Emitter.log("Device attached: " + deviceId);
        if (events != null) {
            events.onDeviceConnected(deviceId);
        }

        try {
            if (!mIBScan.hasPermission(deviceId)) {
                mIBScan.requestPermission(deviceId);
            } else {
                Emitter.log("Permission already granted for device: " + deviceId);
                if (events != null) {
                    events.onPermissionGranted(deviceId);
                }
            }
        } catch (Exception e) {
            Emitter.log("Error requesting permission: " + e.getMessage());
            if (events != null) {
                events.onError("Error requesting permission: " + e.getMessage());
            }
        }
    }

    @Override
    public void scanDeviceDetached(int deviceId) {
        Emitter.log("Device detached: " + deviceId);
        if (events != null) {
            events.onDeviceDisconnected(deviceId);
        }
    }

    /*
    private void printDeviceDetails(int deviceId) {
        try {
            // Get the count of connected devices
            int deviceCount = mIBScan.getDeviceCount();
            Emitter.log("Number of connected devices: " + deviceCount);

            // Iterate over each device using its logical index
            for (int i = 0; i < deviceCount; i++) {
                IBScan.DeviceDesc deviceDesc = mIBScan.getDeviceDescription(i);
                Emitter.log("Device " + i + " Details:");
                Emitter.log("Device ID: " + deviceDesc.deviceId);
                Emitter.log("Product Name: " + deviceDesc.productName);
                Emitter.log("Serial Number: " + deviceDesc.serialNumber);
                Emitter.log("Interface Type: " + deviceDesc.interfaceType);
            }
        } catch (IBScanException e) {
            Emitter.log("Error fetching device details: " + e.getMessage());
        }
    }
    */

    @Override
    public void scanDevicePermissionGranted(int deviceId, boolean granted) {
        Emitter.log("ACTION_USB_PERMISSION - IIIIIIIIIIIIIIIIIIII");
        if (granted) {
            Emitter.log("Permission granted for device: " + deviceId);
            if (events != null) {
                events.onPermissionGranted(deviceId);
            }

            try {
                if (mIBScanDevice == null || !mIBScanDevice.isOpened()) {
                    int deviceIndex = mIBScan.getDeviceIndexByUsbId(deviceId);
                    if (deviceIndex != -1) {
                        Emitter.log("found device for device id: " + deviceId + " At index: " + deviceIndex);
                    } else {
                        Emitter.log("Device not found for device id: " + deviceId);
                    }

                    Emitter.log("Opening device at index: " + deviceIndex);
                    mIBScanDevice = mIBScan.openDevice(deviceIndex);
                }

                mIBScanDevice.setScanDeviceListener(this);
                Emitter.log("Device opened successfully: " + deviceId);
                if (events != null) {
                    events.onDeviceReadyForScanning(deviceId);
                }
            } catch (IBScanException e) {
                Emitter.log("Exception details: " + e.getType() + ", " + e.getMessage());
            }
        } else {
            Emitter.log("Permission denied for device: " + deviceId);
            if (events != null) {
                events.onPermissionDenied(deviceId);
            }
        }
    }


    @Override
    public void scanDeviceCountChanged(int count) {
        Emitter.log("Device count changed: " + count);
    }

    @Override
    public void scanDeviceInitProgress(int deviceId, int progress) {
        Emitter.log("Device " + deviceId + " initialization progress: " + progress + "%");
    }

    @Override
    public void scanDeviceOpenComplete(int deviceId, IBScanDevice device, IBScanException exception) {
        Emitter.log("ALSKJDLASKDJALSDKJALSDKJDLKASJDLSAKJALKSDJAKSD");
        if (exception == null) {
            Emitter.log("Device " + deviceId + " opened successfully.");
            mIBScanDevice = device;
            mIBScanDevice.setScanDeviceListener(this);

            if (events != null) {
                events.onDeviceReadyForScanning(deviceId);
            }
        } else {
            Emitter.log("Error opening device " + deviceId + ": " + exception.getMessage());
            if (events != null) {
                events.onError("Error opening device: " + exception.getMessage());
            }
        }
    }

    // New Section: Required IBScanDeviceListener Methods
    // ---------------------------------------------------

    public void beginCaptureImage() {
        if (mIBScanDevice == null || !mIBScanDevice.isOpened()) {
            Emitter.log("Device is not opened for capturing.");
            if (events != null) {
                events.onError("Device is not opened for capturing.");
            }
            return;
        }

        try {
            // Set decimation to reduce image size or quality
            //mIBScanDevice.setProperty(IBScanDevice.PropertyId.ENABLE_DECIMATION, "TRUE");

            // Set a smaller capture area threshold
            mIBScanDevice.setProperty(IBScanDevice.PropertyId.CAPTURE_AREA_THRESHOLD, "12");

            // Lower image processing threshold for faster processing
            //mIBScanDevice.setProperty(IBScanDevice.PropertyId.RESERVED_IMAGE_PROCESS_THRESHOLD, "1");

            // Adjust contrast level
            mIBScanDevice.setContrast(1); // 50 is a mid-level contrast, can adjust 0-100
            mIBScanDevice.beginCaptureImage(
                    ImageType.FLAT_SINGLE_FINGER,
                    IBScanDevice.ImageResolution.RESOLUTION_500,
                    IBScanDevice.OPTION_AUTO_CAPTURE
            );
            Emitter.log("NO ERROR - Capture started.");
            if (events != null) {
                events.onCaptureStarted();
            }
        } catch (IBScanException e) {
            Emitter.log("Error starting capture: " + e.getType() + ", " + e.getMessage());
            if (events != null) {
                events.onError("Error starting capture: " + e.getType() + ", " + e.getMessage());
            }
        }
    }

    public void cancelCaptureImage() {
        if (mIBScanDevice == null || !mIBScanDevice.isOpened()) {
            Emitter.log("Device is not opened for cancelling capture.");
            if (events != null) {
                events.onError("Device is not opened for cancelling capture.");
            }
            return;
        }

        try {
            mIBScanDevice.cancelCaptureImage();
            Emitter.log("Capture cancelled.");
            if (events != null) {
                events.onCaptureCancelled();
            }
        } catch (IBScanException e) {
            Emitter.log("Error cancelling capture: " + e.getMessage());
            if (events != null) {
                events.onError("Error cancelling capture: " + e.getMessage());
            }
        }
    }

    @Override
    public void deviceCommunicationBroken(IBScanDevice device) {
        Emitter.log("Communication broken.");
    }

    @Override
    public void deviceImagePreviewAvailable(IBScanDevice device, ImageData image) {
        if (events != null) {
            Bitmap bitmap = image.toBitmapScaled(200, 200);
            events.onCaptureUpdated(bitmap);
        }
    }

    @Override
    public void deviceImageResultAvailable(IBScanDevice device, ImageData image, ImageType imageType, ImageData[] splitImageArray) {
        if (events != null) {
            Bitmap bitmap = image.toBitmap();
            events.onCaptureCompleted(bitmap);
        }
    }

    @Override
    public void deviceFingerCountChanged(IBScanDevice device, FingerCountState fingerState) {
        Emitter.log("Finger count changed: " + fingerState.name());
    }

    @Override
    public void deviceFingerQualityChanged(IBScanDevice device, FingerQualityState[] fingerQualities) {
        Emitter.log("Finger quality changed.");
    }

    @Override
    public void deviceAcquisitionBegun(IBScanDevice device, ImageType imageType) {
        Emitter.log("Acquisition begun for image type: " + imageType.name());
    }

    @Override
    public void deviceAcquisitionCompleted(IBScanDevice device, ImageType imageType) {
        Emitter.log("Acquisition completed for image type: " + imageType.name());
    }

    @Override
    public void deviceImageResultExtendedAvailable(IBScanDevice device, IBScanException imageStatus, ImageData image, ImageType imageType, int detectedFingerCount, ImageData[] segmentImageArray, SegmentPosition[] segmentPositionArray) {
        Emitter.log("Extended image result available.");
    }

    @Override
    public void devicePlatenStateChanged(IBScanDevice device, PlatenState platenState) {
        Emitter.log("Platen state changed to: " + platenState.name());
    }

    @Override
    public void deviceWarningReceived(IBScanDevice device, IBScanException warning) {
        Emitter.log("Warning received: " + warning.getMessage());
    }

    @Override
    public void devicePressedKeyButtons(IBScanDevice device, int pressedKeyButtons) {
        Emitter.log("Key buttons pressed: " + pressedKeyButtons);
    }
}
