/**
 * Helper to trigger file downloads in the browser using dynamic anchors and Blob URLs.
 */
export const downloadBlobFile = (blob: Blob, filename: string): void => {
  // Create local object URL
  const objectUrl = URL.createObjectURL(blob);

  // Create temporary dynamic anchor tag
  const link = document.createElement("a");
  link.href = objectUrl;
  link.setAttribute("download", filename);

  // Append to body, click to trigger download, and remove
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Revoke the Object URL to free browser memory
  setTimeout(() => {
    URL.revokeObjectURL(objectUrl);
  }, 100);
};
export default downloadBlobFile;
