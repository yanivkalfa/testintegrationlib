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

    void onDeviceReadyForScanning(int deviceId, IBScan.DeviceDesc deviceDesc);

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
    try {
      if (mIBScan == null) {
        Emitter.log("Error: mIBScan is not initialized.");
        return;
      }

      Emitter.log("Device attached: " + deviceId);
      if (events != null) {
        events.onDeviceConnected(deviceId);
      }

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

  private void cleanUpDeviceResources() {
    try {
      if (mIBScanDevice != null) {
        mIBScanDevice.setScanDeviceListener(null);
        if (mIBScanDevice.isOpened()) {
          mIBScanDevice.close();
        }
        mIBScanDevice = null; // Clear the reference
      }
      Emitter.log("Device resources cleaned up successfully.");
    } catch (IBScanException e) {
      Emitter.log("Error cleaning up device resources: " + e.getMessage());
    }
  }

  @Override
  public void scanDeviceDetached(int deviceId) {
    Emitter.log("Device detached: " + deviceId);
    cleanUpDeviceResources();
    if (events != null) {
      events.onDeviceDisconnected(deviceId);
    }
  }

  public String getDeviceName(int deviceIndex) {
    if (mIBScan != null) {
      try {
        IBScan.DeviceDesc deviceDesc = mIBScan.getDeviceDescription(deviceIndex);
        return (deviceDesc != null) ? deviceDesc.productName : "Unknown Device";
      } catch (IBScanException e) {
        Emitter.log("Error retrieving device name: " + e.getMessage());
        return "Error Retrieving Device Name";
      }
    }
    return "IBScan Not Initialized";
  }

  public void scanDeviceIsOpened(int deviceIndex, IBScanDevice device) {
    try {
      if (mIBScan == null) {
        Emitter.log("Error: mIBScan is not initialized.");
        return;
      }

      if (deviceIndex >= 0) {
        Emitter.log("scanDeviceIsOpened deviceIndex" + deviceIndex);
        mIBScanDevice = device;
        mIBScanDevice.setScanDeviceListener(this);
        if (events != null) {
          //String deviceName = getDeviceName(deviceIndex);
          //Emitter.log("scanDeviceOpened deviceName" + deviceName);
          IBScan.DeviceDesc deviceDesc = mIBScan.getDeviceDescription(deviceIndex);
          events.onDeviceReadyForScanning(deviceIndex, deviceDesc);
        }
      }
    } catch (Exception e) {
      Emitter.log("Error in scanDeviceOpened: " + e.getMessage());
    }
  }

  public void openScanDevice(int usbDeviceId) {
    try {
      if (mIBScan == null) {
        Emitter.log("Error: mIBScan is not initialized.");
        return;
      }

      Emitter.log("openScanDevice");
      int deviceIndex = mIBScan.getDeviceIndexByUsbId(usbDeviceId);
      if (deviceIndex >= 0) {
        Emitter.log("scanDeviceOpened deviceIndex" + deviceIndex);
        if (mIBScanDevice == null || !mIBScanDevice.isOpened()) {
          Emitter.log("DeviceIndex is: " + deviceIndex);
          Emitter.log("Opening device at index: " + deviceIndex);
          mIBScan.openDeviceAsync(deviceIndex);
        } else {
          scanDeviceIsOpened(deviceIndex, mIBScanDevice);
        }
      }
    } catch (Exception e) {
      Emitter.log("Error in scanDeviceOpened: " + e.getMessage());
    }
  }

  @Override
  public void scanDevicePermissionGranted(int usbDeviceId, boolean granted) {
    Emitter.log("ACTION_USB_PERMISSION");
    if (granted) {
      try {
        Emitter.log("Permission granted for device: " + usbDeviceId);
        if (events != null) {
          events.onPermissionGranted(usbDeviceId);
        }
        openScanDevice(usbDeviceId);
      } catch (Exception e) {
        Emitter.log("Exception details: " + e.getMessage());
      }
    } else {
      Emitter.log("Permission denied for device: " + usbDeviceId);
      if (events != null) {
        events.onPermissionDenied(usbDeviceId);
      }
    }
  }

  public void checkConnectedDevicesPermissions() {
    try {
      if (mIBScan == null) {
        Emitter.log("Error: mIBScan is not initialized.");
        return;
      }

      UsbManager usbManager = (UsbManager) context.getSystemService(Context.USB_SERVICE);
      if (usbManager != null) {
        HashMap<String, UsbDevice> deviceList = usbManager.getDeviceList();
        if (deviceList != null && !deviceList.isEmpty()) {
          for (UsbDevice device : deviceList.values()) {
            if (mIBScan.isScanDevice(device)) {
              Emitter.log("Found scanner device: " + device.getDeviceName());

              int usbDeviceId = device.getDeviceId();
              try {
                if (!mIBScan.hasPermission(usbDeviceId)) {
                  mIBScan.requestPermission(usbDeviceId);
                } else {
                  Emitter.log("Permission already granted for device: " + usbDeviceId);
                  openScanDevice(usbDeviceId);
                }
              } catch (Exception e) {
                Emitter.log("Error requesting permission: " + e.getMessage());
                if (events != null) {
                  events.onError("Error requesting permission: " + e.getMessage());
                }
              }
            } else {
              Emitter.log("Device " + device.getDeviceName() + " is not a scanner device.");
            }
          }
        } else {
          Emitter.log("No USB devices are connected at startup.");
        }
      } else {
        Emitter.log("UsbManager is not available.");
      }
    } catch (Exception e) {
      e.printStackTrace();
      Emitter.log("An error occurred while checking connected devices: " + e.getMessage());
    }
  }

  public void beginCaptureImage() {
    try {
      if (mIBScanDevice == null || !mIBScanDevice.isOpened()) {
        Emitter.log("Device is not opened for capturing.");
        if (events != null) {
          events.onError("Device is not opened for capturing.");
        }
        return;
      }

//      int captureOptions = 0;
//      captureOptions |= IBScanDevice.OPTION_AUTO_CONTRAST;
//      captureOptions |= IBScanDevice.OPTION_AUTO_CAPTURE;
//      captureOptions |= IBScanDevice.OPTION_IGNORE_FINGER_COUNT;
//
//      mIBScanDevice.setProperty(IBScanDevice.PropertyId.ENABLE_SPOOF, "FALSE");
//      mIBScanDevice.setProperty(IBScanDevice.PropertyId.DISABLE_SEGMENT_ROTATION, "TRUE");
//      mIBScanDevice.setProperty(IBScanDevice.PropertyId.SPOOF_LEVEL, "5");
//      mIBScanDevice.setProperty(IBScanDevice.PropertyId.RESERVED_IMAGE_PROCESS_THRESHOLD, "2");
//      mIBScanDevice.setProperty(IBScanDevice.PropertyId.RESERVED_ENHANCED_RESULT_IMAGE_LEVEL, "5");
//
      // Set decimation to reduce image size or quality
      // mIBScanDevice.setProperty(IBScanDevice.PropertyId.ENABLE_DECIMATION, "TRUE");

      // Set a smaller capture area threshold
      mIBScanDevice.setProperty(IBScanDevice.PropertyId.CAPTURE_AREA_THRESHOLD, "12");

      // Lower image processing threshold for faster processing
      // mIBScanDevice.setProperty(IBScanDevice.PropertyId.RESERVED_IMAGE_PROCESS_THRESHOLD,
      // "1");

      // Adjust contrast level
      mIBScanDevice.setContrast(1); // 50 is a mid-level contrast, can adjust 0-100
      mIBScanDevice.beginCaptureImage(
          ImageType.FLAT_SINGLE_FINGER,
          IBScanDevice.ImageResolution.RESOLUTION_500,
          IBScanDevice.OPTION_AUTO_CAPTURE);
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
    try {
      if (mIBScanDevice == null || !mIBScanDevice.isOpened()) {
        Emitter.log("Device is not opened for cancelling capture.");
        if (events != null) {
          events.onError("Device is not opened for cancelling capture.");
        }
        return;
      }

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

  // New Section: Required IBScanDeviceListener Methods
  // ---------------------------------------------------

  @Override
  public void scanDeviceOpenComplete(int deviceIndex, IBScanDevice device, IBScanException exception) {
    Emitter.log("scanDeviceOpenComplete");
    if (device != null) {
      scanDeviceIsOpened(deviceIndex, device);
    } else {
      Emitter.log("Error opening device " + deviceIndex + ": " + exception.getMessage());
      if (events != null) {
        events.onError("Error opening device: " + exception.getMessage());
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
  public void deviceImageResultAvailable(IBScanDevice device, ImageData image, ImageType imageType,
      ImageData[] splitImageArray) {
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
  public void deviceImageResultExtendedAvailable(IBScanDevice device, IBScanException imageStatus, ImageData image,
      ImageType imageType, int detectedFingerCount, ImageData[] segmentImageArray,
      SegmentPosition[] segmentPositionArray) {
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

//
// private void printDeviceDetails(int deviceId) {
// try {
// // Get the count of connected devices
// int deviceCount = mIBScan.getDeviceCount();
// Emitter.log("Number of connected devices: " + deviceCount);
//
// // Iterate over each device using its logical index
// for (int i = 0; i < deviceCount; i++) {
// IBScan.DeviceDesc deviceDesc = mIBScan.getDeviceDescription(i);
// Emitter.log("Device " + i + " Details:");
// Emitter.log("Device ID: " + deviceDesc.deviceId);
// Emitter.log("Product Name: " + deviceDesc.productName);
// Emitter.log("Serial Number: " + deviceDesc.serialNumber);
// Emitter.log("Interface Type: " + deviceDesc.interfaceType);
// }
// } catch (IBScanException e) {
// Emitter.log("Error fetching device details: " + e.getMessage());
// }
// }

//