import React, { useRef, useState } from 'react';
// import cv from 'opencv-js';

const FaceCapture: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [photoData, setPhotoData] = useState<string | null>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error(`Error accessing camera:`, error);
    }
  };

  // const takePhoto = () => {
  //   if (videoRef.current) {
  //     const canvas = document.createElement(`canvas`);
  //     canvas.width = videoRef.current.videoWidth;
  //     canvas.height = videoRef.current.videoHeight;
  //     const context = canvas.getContext(`2d`);
  //     context?.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
  //     const imageData = context?.getImageData(
  //       0,
  //       0,
  //       canvas.width,
  //       canvas.height,
  //     );

  //     // Perform image verification using OpenCV.js or TensorFlow.js

  //     // Example OpenCV.js code for image analysis
  //     const mat = cv.matFromImageData(imageData);
  //     const grayMat = new cv.Mat();
  //     cv.cvtColor(mat, grayMat, cv.COLOR_RGBA2GRAY);
  //     const blurMat = new cv.Mat();
  //     cv.GaussianBlur(grayMat, blurMat, new cv.Size(5, 5), 0);
  //     const cannyMat = new cv.Mat();
  //     cv.Canny(blurMat, cannyMat, 50, 150);

  //     // Check the clarity of the image using your desired criteria

  //     // Example clarity check using the number of edges
  //     const edgeCount = cv.countNonZero(cannyMat);
  //     const isClear = edgeCount < 500;

  //     if (isClear) {
  //       const data = canvas.toDataURL(`image/png`);
  //       setPhotoData(data);
  //     } else {
  //       alert(`The image is not clear. Please try again.`);
  //     }

  //     mat.delete();
  //     grayMat.delete();
  //     blurMat.delete();
  //     cannyMat.delete();
  //   }
  // };

  return (
    <div>
      <button onClick={startCamera}>Start Camera</button>
      {/* <button onClick={takePhoto}>Take Photo</button> */}
      {photoData && <img src={photoData} alt="Taken Photo" />}
      <video ref={videoRef} autoPlay />
    </div>
  );
};

export default FaceCapture;
