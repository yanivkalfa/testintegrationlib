import Canvas, {Image} from 'react-native-canvas';

export const getBase64ImgUri = (base64Image: string) => {
  return `data:image/png;base64,${base64Image}`;
};

export const loadAndDrawImage = async (
  canvas: Canvas,
  base64Image: string,
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const context = canvas.getContext('2d');
    const img = new Image(canvas);
    img.src = getBase64ImgUri(base64Image);
    img.addEventListener('load', () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, 0, 0, canvas.width, canvas.height);
      resolve();
    });

    img.addEventListener('error', reject);
  });
};
