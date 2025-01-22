/**
****************************************************************************************************
* @file
*		IBScanListener.java
*
* @brief
*		Android Java wrapper for IBScanUltimate library
*
* @author
*       Integrated Biometrics, LLC
*
* @copyright
*       Copyright (c) Integrated Biometrics, 2009-2023 \n
*       http://www.integratedbiometrics.com
*
* @page page_API_Revision_History_IBScanListener IBScanListener.java
* @section section_IBScanListener IBScanListener.java
* @li @par  2013/03/01
*						First version.
****************************************************************************************************
*/

package com.integratedbiometrics.ibscanultimate;

/**
****************************************************************************************************
* @defgroup group_API_Main_Interface_IBScanListener Interface - IBScanListener
* @{
****************************************************************************************************
*/
/**
****************************************************************************************************
*
* @brief
*     	Listener for device management events on an IBScan. This listener should be registered by  
* 		an application with the setScanListener() method.
*
****************************************************************************************************
*/
public interface IBScanListener
{
    /**
    * @brief	- Android Only\n
    *			Device attached notification.
    * 
    * @param	deviceId	ID of the device.  This is the ID that Android assigns to the device,
    *           			obtained through the UsbDevice getDeviceId() method.
    */
    public void scanDeviceAttached(int deviceId);

    /**
    * @brief	- Android Only\n
    *			Device detached notification.
    * 
    * @param	deviceId	ID of the device.  This is the ID that Android assigns to the device,
    *           			obtained through the UsbDevice getDeviceId() method.
    */
    public void scanDeviceDetached(int deviceId);

    /**
    * @brief	- Android Only\n
    *			Device access granted or denied notification.  This notification occurs after requestPermission()
    *			has been called.  Only scan devices for which permission has been granted can be opened
    *			or be described with getDeviceDescription().
    * 
    * @param	deviceId	ID of the device.  This is the ID that Android assigns to the device,
    *           			obtained through the UsbDevice getDeviceId() method.
    * @param	granted		true if permission was granted; false if permission was denied.
    */
    public void scanDevicePermissionGranted(int deviceId, boolean granted);


    /**
	*
	* @brief	Device count change notification.
    * 
    * @param	deviceCount  new count of devices
    */
    public void scanDeviceCountChanged(int deviceCount);

    /**
	*
	* @brief	Device initialization progress notification.  This notification occurs while the openDevice()
    * 			is executing; or after openDeviceAsync() has been called before initialization
    * 			completes or an error occurs.
    * 
    * @param 	deviceIndex		zero-based index of device
	* @param 	progressValue	initialization progress between 0 and 100. A value of 100 indicates that
	*                      		that initialization is complete.
    */
    public void scanDeviceInitProgress(int deviceIndex, int progressValue);

    /**
	*
	* @brief	Device open complete notification.  This notification occurs after openDeviceAsync()
	* 			has been called when initialization completes or an error occurs.
    * 
    * @param 	deviceIndex		zero-based index of device
	* @param	device			opened device, if successful; otherwise, null
	* @param	exception		exception, if any, encountered while opening device; otherwise, 
	*                     		null
    */
    public void scanDeviceOpenComplete(int deviceIndex, IBScanDevice device, IBScanException exception);
}
/**
****************************************************************************************************
* @}
****************************************************************************************************
*/