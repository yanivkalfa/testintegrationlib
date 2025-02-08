const fs = require('fs');
const fileName = 'testPrint.bmp';
try {
  const fileContent = fs.readFileSync(fileName);
  const base64Content = fileContent.toString('base64');
  const exportContent = 'export const testPrintBase64 = `' + base64Content + '`;';
  fs.writeFileSync('testPrintBase64.ts', exportContent);
} catch (error) {
  console.error('Error converting file to Base64:', error);
}
