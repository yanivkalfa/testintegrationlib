package com.integrationtestlibs;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.PowerManager;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.utils.Emitter;

public class ScreenStateModule extends ReactContextBaseJavaModule {
    private ReactApplicationContext reactContext;
    private BroadcastReceiver screenStateReceiver;

    public ScreenStateModule(ReactApplicationContext context) {
        super(context);
        this.reactContext = context;

        screenStateReceiver = new ScreenStateReceiver();
        IntentFilter filter = new IntentFilter();
        filter.addAction(Intent.ACTION_SCREEN_ON);
        filter.addAction(Intent.ACTION_SCREEN_OFF);

        reactContext.registerReceiver(screenStateReceiver, filter);
        Emitter.log("ScreenStateModule initialized and BroadcastReceiver registered.");
    }

    @Override
    public String getName() {
        return "ScreenState";
    }

    @ReactMethod
    public void isScreenOn(Promise promise) {
        try {
            PowerManager powerManager = (PowerManager) reactContext.getSystemService(Context.POWER_SERVICE);
            boolean isScreenOn = powerManager.isInteractive();
            promise.resolve(isScreenOn);
        } catch (Exception e) {
            promise.reject("ERROR", e.getMessage());
        }
    }

    private class ScreenStateReceiver extends BroadcastReceiver {
        @Override
        public void onReceive(Context context, Intent intent) {
            if (intent.getAction() != null) {
                switch (intent.getAction()) {
                    case Intent.ACTION_SCREEN_ON:
                        Emitter.sendEvent("ScreenStateChanged", true);
                        break;
                    case Intent.ACTION_SCREEN_OFF:
                        Emitter.sendEvent("ScreenStateChanged", false);
                        break;
                }
            }
        }
    }

    @Override
    public void onCatalystInstanceDestroy() {
        super.onCatalystInstanceDestroy();
        if (screenStateReceiver != null) {
            reactContext.unregisterReceiver(screenStateReceiver);
            Emitter.log("ScreenStateModule destroyed and BroadcastReceiver unregistered.");
        }
    }
}
