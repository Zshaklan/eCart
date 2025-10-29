import ImageKit from "imagekit";

function genImagekitInstance() {
  const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
  });

  return imagekit;
}

export const uploadOnImagekit = async (file) => {
  if (!file) throw new Error("No file provided for upload");

  const imagekit = genImagekitInstance();
  const result = await imagekit.upload({
    file: file.buffer.toString("base64"),
    fileName: file.originalname,
    folder: "eCart",
  });

  return result.url;
};
