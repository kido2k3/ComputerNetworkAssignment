export function getMimeTypeFromArrayBuffer(arrayBuffer) {
  const uint8arr = new Uint8Array(arrayBuffer);

  const len = 4;
  if (uint8arr.length >= len) {
    let signatureArr = new Array(len);
    for (let i = 0; i < len; i++)
      signatureArr[i] = new Uint8Array(arrayBuffer)[i].toString(16);
    const signature = signatureArr.join("").toUpperCase();
    switch (signature) {
      case "89504E47":
        return "image/png";
      case "47494638":
        return "image/gif";
      case "25504446":
        return "application/pdf";
      case "FFD8FFDB":
      case "FFD8FFE0":
        return "image/jpeg";
      case "504B34":
        return "application/zip";
      case "6668736B":
        return "application/txt";
      default:
        return null;
    }
  }
  return null;
}
export function randomString(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}
