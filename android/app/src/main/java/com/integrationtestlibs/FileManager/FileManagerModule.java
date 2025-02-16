package com.integrationtestlibs.filemanager;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import android.os.Environment;
import android.util.Log;
import com.utils.Emitter;

public class FileManagerModule extends ReactContextBaseJavaModule {
    private static final String MODULE_NAME = "FileManager";
    private final FileManagerService fileService;

    public FileManagerModule(ReactApplicationContext reactContext) {
        super(reactContext);
        String baseFolder = reactContext.getFilesDir().getAbsolutePath();
        fileService = new FileManagerService(baseFolder);
    }

    @Override
    public String getName() {
        return MODULE_NAME;
    }

    @ReactMethod
    public void createFolder(Promise promise) {
        fileService.createFolder();
        promise.resolve("Folder creation initiated");
    }

    @ReactMethod
    public void saveFile(String fileName, String content, Promise promise) {
        fileService.saveFile(fileName, content,
                () -> promise.resolve("File saved"),
                () -> promise.reject("SAVE_ERROR", "Failed to save file")
        );
    }

    @ReactMethod
    public void listFiles(Promise promise) {
        fileService.listFiles(files -> {
            promise.resolve(files);
        });
    }

    @ReactMethod
    public void readFile(String fileName, Promise promise) {
        fileService.readFile(fileName, content -> {
            if (content != null) {
                promise.resolve(content);
            } else {
                promise.reject("READ_ERROR", "File not found or failed to read");
            }
        });
    }

    @ReactMethod
    public void deleteFile(String fileName, Promise promise) {
        fileService.deleteFile(fileName,
                () -> promise.resolve("File deleted"),
                () -> promise.reject("DELETE_ERROR", "Failed to delete file")
        );
    }
}
