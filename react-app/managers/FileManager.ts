import {NativeModules} from 'react-native';

const {FileManager} = NativeModules;

type FileManagerModule = {
  saveFile: (fileName: string, content: string) => Promise<string>;
  listFiles: () => Promise<string[]>;
  readFile: (fileName: string) => Promise<string | null>;
  deleteFile: (fileName: string) => Promise<string>;
};

const fileManager = FileManager as FileManagerModule;

export const saveFile = async (
  fileName: string,
  content: string,
): Promise<void> => {
  try {
    const result = await fileManager.saveFile(fileName, content);
    console.log(`File saved: ${fileName}`, result);
  } catch (error) {
    console.error(`Error saving file: ${fileName}`, error);
  }
};

export const listFiles = async (): Promise<string[]> => {
  try {
    const files = await fileManager.listFiles();
    console.log('Files in folder:', files);
    return files;
  } catch (error) {
    console.error('Error listing files:', error);
    return [];
  }
};

export const readFile = async (fileName: string): Promise<string | null> => {
  try {
    const content = await fileManager.readFile(fileName);
    //console.log(`Content of ${fileName}:`, content);
    return content;
  } catch (error) {
    console.error(`Error reading file: ${fileName}`, error);
    return null;
  }
};

export const deleteFile = async (fileName: string): Promise<void> => {
  try {
    const result = await fileManager.deleteFile(fileName);
    console.log(`File deleted: ${fileName}`, result);
  } catch (error) {
    console.error(`Error deleting file: ${fileName}`, error);
  }
};
