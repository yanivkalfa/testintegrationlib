package com.integrationtestlibs.filemanager;

import android.util.Log;
import java.util.concurrent.Executors;
import java.util.concurrent.ExecutorService;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.nio.charset.StandardCharsets;
import java.io.InputStream;
import java.io.FileInputStream;
import com.utils.Emitter;

import java.lang.Math;
import java.lang.Runtime;
import java.util.ArrayList;

import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.Arguments;

public class FileManagerService {

    private static final String TAG = "FileManagerService";
    private final ExecutorService executor = Executors.newFixedThreadPool(Math.max(2, Runtime.getRuntime().availableProcessors()));
    private final String folderPath;

    public FileManagerService(String baseFolder) {
        this.folderPath = baseFolder + "/prints";
        createFolder();
    }

    public void createFolder() {
        executor.execute(() -> {
            try {
                File folder = new File(folderPath);
                if (!folder.exists()) {
                    if (folder.mkdirs()) {
                        Emitter.log(TAG + " - Folder created: " + folderPath);
                    } else {
                        Emitter.log(TAG + " - Failed to create folder: " + folderPath);
                    }
                } else {
                    Emitter.log(TAG + " - Folder already exists: " + folderPath);
                }
            } catch (Exception e) {
                Emitter.log(TAG + " - Error creating folder: " + e.getMessage());
            }
        });
    }

    public void saveFile(String fileName, String content, Runnable onSuccess, Runnable onError) {
        executor.execute(() -> {
            try {
                File file = new File(folderPath, fileName);
                try (FileOutputStream fos = new FileOutputStream(file)) {
                    fos.write(content.getBytes(StandardCharsets.UTF_8));
                }
                Emitter.log(TAG + " - File saved: " + file.getAbsolutePath());
                onSuccess.run();
            } catch (IOException e) {
                Emitter.log(TAG + " - Error saving file: " + e.getMessage());
                onError.run();
            }
        });
    }

    public void listFiles(Callback<WritableArray> callback) {
        executor.execute(() -> {
            try {
                File folder = new File(folderPath);
                String[] files = folder.list();
                WritableArray resultArray = Arguments.createArray();
                if (files != null) {
                    for (String file : files) {
                        resultArray.pushString(file);
                    }
                }
                callback.onResult(resultArray);
            } catch (Exception e) {
                Emitter.log(TAG + " - Error listing files: " + e.getMessage());
                callback.onResult(Arguments.createArray());
            }
        });
    }

    public void readFile(String fileName, Callback<String> callback) {
        executor.execute(() -> {
            File file = new File(folderPath, fileName);
            if (!file.exists()) {
                callback.onResult(null);
                return;
            }
            try (InputStream inputStream = new FileInputStream(file)) {
                StringBuilder content = new StringBuilder();
                byte[] buffer = new byte[4096];
                int bytesRead;
                while ((bytesRead = inputStream.read(buffer)) != -1) {
                    content.append(new String(buffer, 0, bytesRead, StandardCharsets.UTF_8));
                }
                callback.onResult(content.toString());
            } catch (IOException e) {
                Emitter.log(TAG + " - Error reading file: " + e.getMessage());
                callback.onResult(null);
            }
        });
    }

    public void deleteFile(String fileName, Runnable onSuccess, Runnable onError) {
        executor.execute(() -> {
            try {
                File file = new File(folderPath, fileName);
                if (file.exists() && file.delete()) {
                    Emitter.log(TAG + " - File deleted: " + file.getAbsolutePath());
                    onSuccess.run();
                } else {
                    Emitter.log(TAG + " - Failed to delete file: " + file.getAbsolutePath());
                    onError.run();
                }
            } catch (Exception e) {
                Emitter.log(TAG + " - Error deleting file: " + e.getMessage());
                onError.run();
            }
        });
    }

    public interface Callback<T> {
        void onResult(T result);
    }
}
