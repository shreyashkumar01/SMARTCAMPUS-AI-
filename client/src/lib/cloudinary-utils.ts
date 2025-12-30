import cloudinary from "./cloudinary-config";

export const uploadImageToCloudinary = (file: File): Promise<string> => {
    return new Promise(async (resolve, reject) => {
      try {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const stream = cloudinary.uploader.upload_stream(
          { folder: "issues" },
          (err: any, result: any) => {
            if (err || !result?.secure_url) {
              reject(err || new Error("Failed to upload image"));
            } else {
              resolve(result.secure_url);
            }
          }
        );
        stream.end(buffer);
      } catch (error) {
        reject(error);
      }
    });
  };