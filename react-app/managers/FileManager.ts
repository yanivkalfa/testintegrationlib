import RNFS from 'react-native-fs';

const folderPath = `${RNFS.DocumentDirectoryPath}/prints`;

export const createImagesFolder = async (): Promise<void> => {
  try {
    const exists = await RNFS.exists(folderPath);
    if (!exists) {
      await RNFS.mkdir(folderPath);
      console.log('Folder created at:', folderPath);
    } else {
      console.log('Folder already exists at:', folderPath);
    }
  } catch (error) {
    console.error('Error creating folder:', error);
  }
};

export const saveFile = async (
  fileName: string,
  content: string,
): Promise<void> => {
  const filePath = `${folderPath}/${fileName}`;
  try {
    await RNFS.writeFile(filePath, content, 'utf8');
    console.log('File saved to:', filePath);
  } catch (error) {
    console.error('Error saving file:', error);
  }
};

export const listFiles = async (): Promise<RNFS.ReadDirItem[] | void> => {
  try {
    const files = await RNFS.readDir(folderPath);
    files.forEach(file => {
      console.log('File found:', file.name);
    });
    return files;
  } catch (error) {
    console.error('Error listing files:', error);
  }
};

export const readFile = async (fileName: string): Promise<string | void> => {
  const filePath = `${folderPath}/${fileName}`;
  try {
    const content = await RNFS.readFile(filePath, 'utf8');
    console.log('File content:', content);
    return content;
  } catch (error) {
    console.error('Error reading file:', error);
  }
};

export const deleteFile = async (fileName: string): Promise<void> => {
  const filePath = `${folderPath}/${fileName}`;
  try {
    const exists = await RNFS.exists(filePath);
    if (exists) {
      await RNFS.unlink(filePath);
    } else {
    }
  } catch (error) {}
};
