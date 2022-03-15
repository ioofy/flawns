export const isValidFileUploaded = (file: File) => {
  const validExtensions = ["png", "jpeg", "jpg"];
  const fileExtension = file?.type.split("/")[1];
  return validExtensions.includes(fileExtension);
};
