import React, { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./utils/firebase";
import { v4 as uuidv4 } from "uuid";
import Button from "./Button";
import './css/ImageUpload.css'

const ImageUploadComponent = ({ onUpload }) => {
  const [imageUpload, setImageUpload] = useState(null);

  const handleImageChange = (event) => {
    setImageUpload(event.target.files); // Set selected image files
  };

  const uploadFiles = (items) => {
    if (!items || items.length === 0) return; // Ensure files are selected

    Array.from(items).forEach((item) => {
      const uniqueFileName = `${item.name}_${uuidv4()}`; // Create a unique filename
      const storageRef = ref(storage, `images/${uniqueFileName}`);

      // Upload file to Firebase Storage
      uploadBytes(storageRef, item).then(() => {
        // Get the download URL for the uploaded file
        getDownloadURL(storageRef)
          .then((url) => {
            // Call the onUpload prop with the new URL
            onUpload(url);
          })
          .catch((error) => {
            console.error("Error fetching download URL:", error);
          });
      });
    });
  };

  const handleUpload = () => {
    if (imageUpload) {
      uploadFiles(imageUpload); // Trigger upload for selected files
    } else {
      console.log("No file selected.");
    }
  };

  return (
    <div>
      <input type="file" multiple onChange={handleImageChange} />
      <Button text="Upload Image(s)" onClick={handleUpload} />
    </div>
  );
};

export default ImageUploadComponent;