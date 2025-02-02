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
import com.utils.Emitter

class MainApplication : Application(), ReactApplication {

    override val reactNativeHost: ReactNativeHost =
        object : DefaultReactNativeHost(this) {
            override fun getPackages(): List<ReactPackage> =
                PackageList(this).packages.apply {
                    // Register your custom ScannerPackage here
                    add(ScannerPackage())
                    add(SchedulerPackage())
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

        Log.d("MainApplication", "onCreate called - Application initialization started")

        val instanceManager: ReactInstanceManager = reactNativeHost.reactInstanceManager

        // Log the ReactInstanceManager current status
        Log.d("MainApplication", "ReactInstanceManager initialized: $instanceManager")
        Log.d("MainApplication", "Current ReactContext: ${instanceManager.currentReactContext}")

        // Check if ReactContext is already initialized
        val existingContext = instanceManager.currentReactContext
        if (existingContext != null) {
            Log.d("MainApplication", "Existing ReactContext found")
            if (existingContext is ReactApplicationContext) {
                Log.d("MainApplication", "Initializing Emitter with existing ReactApplicationContext")
                Emitter.initialize(existingContext)
                Emitter.log("Emitter initialized successfully with existing context")
            } else {
                Log.e("MainApplication", "Invalid ReactContext type found: ${existingContext.javaClass.name}")
            }
        } else {
            // Add a listener for ReactInstance initialization
            Log.d("MainApplication", "No existing ReactContext, adding ReactInstanceEventListener")
            instanceManager.addReactInstanceEventListener(object : ReactInstanceEventListener {
                override fun onReactContextInitialized(reactContext: ReactContext) {
                    Log.d("MainApplication", "ReactContext initialized via listener")
                    if (reactContext is ReactApplicationContext) {
                        Log.d("MainApplication", "Initializing Emitter with new ReactApplicationContext")
                        Emitter.initialize(reactContext)
                        Emitter.log("Emitter initialized successfully with new context")
                    } else {
                        Log.e("MainApplication", "Invalid ReactContext type found via listener: ${reactContext.javaClass.name}")
                    }
                }
            })

            // Start creating the ReactContext if not already started
            if (!instanceManager.hasStartedCreatingInitialContext()) {
                Log.d("MainApplication", "Starting ReactInstanceManager to create ReactContext")
                instanceManager.createReactContextInBackground()
            } else {
                Log.d("MainApplication", "ReactInstanceManager already started creating initial context")
            }
        }

        if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
            Log.d("MainApplication", "Loading new architecture entry point")
            try {
                load()
                Log.d("MainApplication", "New architecture entry point loaded successfully")
            } catch (e: RuntimeException) {
                Log.e("MainApplication", "Error loading new architecture entry point", e)
            }
        }

        Log.d("MainApplication", "onCreate completed - Application initialization finished")
    }
}
