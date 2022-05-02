export const isValidFileUploaded = (file: File) => {
  const validExtensions = ["png", "jpeg", "jpg", "webp"];
  const fileExtension = file?.type.split("/")[1];
  return validExtensions.includes(fileExtension);
};
