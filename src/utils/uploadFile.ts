import AWS from 'aws-sdk';
import { format } from 'date-fns';

console.log(process.env.NEXT_PUBLIC_AWS_s3_SECRET);
const s3 = new AWS.S3({
  accessKeyId: process.env.NEXT_PUBLIC_AWS_S3_KEY,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_s3_SECRET,
});

export const uploadFileToS3 = async (folder: string, file: any) => {
  const currentDate = new Date();
  const year = format(currentDate, `yyyy`);
  const month = format(currentDate, `MM`);
  const day = format(currentDate, `dd`);

  const params = {
    Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME,
    Key: `${folder}/${day}-${month}-${year}/${file.name}`, // e.g., "2023/10/photo.jpg"
    Body: file,
  };

  const upload = s3.upload(params);
  upload.on(`httpUploadProgress`, (p) => {
    console.log(p.loaded / p.total);
    //progress.set(p.loaded / p.total);
  });
  const uploadedFile = await upload.promise();
  console.log(uploadedFile);
  return uploadedFile;
};
