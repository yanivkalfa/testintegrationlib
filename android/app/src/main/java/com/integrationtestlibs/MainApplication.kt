package com.integrationtestlibs

import android.app.Application
import android.util.Log
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.load
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost
import com.facebook.react.defaults.DefaultReactNativeHost
import com.facebook.react.soloader.OpenSourceMergedSoMapping
import com.facebook.soloader.SoLoader
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContext
import com.facebook.react.ReactInstanceManager
import com.facebook.react.ReactInstanceManager.ReactInstanceEventListener
import com.utils.NativeLogger

class MainApplication : Application(), ReactApplication {

    override val reactNativeHost: ReactNativeHost =
        object : DefaultReactNativeHost(this) {
            override fun getPackages(): List<ReactPackage> =
                PackageList(this).packages.apply {
                    // Register your custom ScannerPackage here
                    add(ScannerPackage())
                }

            override fun getJSMainModuleName(): String = "index"

            override fun getUseDeveloperSupport(): Boolean = BuildConfig.DEBUG

            override val isNewArchEnabled: Boolean = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
            override val isHermesEnabled: Boolean = BuildConfig.IS_HERMES_ENABLED
        }

    override val reactHost: ReactHost
        get() = getDefaultReactHost(applicationContext, reactNativeHost)

    override fun onCreate() {
        super.onCreate()
        SoLoader.init(this, OpenSourceMergedSoMapping)

        Log.d("MainApplication", "onCreate called")

        val instanceManager: ReactInstanceManager = reactNativeHost.reactInstanceManager

        // Check if ReactContext is already initialized
        val existingContext = instanceManager.currentReactContext
        if (existingContext != null) {
            Log.d("MainApplication", "aaaaaaaaaaaaaaaaaaaaaaaaaaaa")
            if (existingContext is ReactApplicationContext) {
                NativeLogger.initialize(existingContext)
                NativeLogger.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb!")
            } else {
                Log.e("MainApplication", "ccccccccccccccccccccccccccccccccccccccc")
            }
        } else {
            // Add a listener for ReactInstance initialization
            instanceManager.addReactInstanceEventListener(object : ReactInstanceEventListener {
                override fun onReactContextInitialized(reactContext: ReactContext) {
                    Log.d("MainApplication", "dddddddddddddddddddddddddddddddddd")
                    if (reactContext is ReactApplicationContext) {
                        NativeLogger.initialize(reactContext)
                        NativeLogger.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
                    } else {
                        Log.e("MainApplication", "ffffffffffffffffffffffffffffffffff")
                    }
                }
            })

            // Start creating the ReactContext if not already started
            if (!instanceManager.hasStartedCreatingInitialContext()) {
                Log.d("MainApplication", "Starting ReactInstanceManager...")
                instanceManager.createReactContextInBackground()
            }
        }

        if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
            Log.d("MainApplication", "Loading new architecture entry point")
            try {
                load()
            } catch (e: RuntimeException) {
                Log.e("MainApplication", "Error loading new architecture entry point", e)
            }
        }
    }
}
