import { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./utils/firebase";
import { v4 as uuidv4 } from "uuid";

const ImageUploadComponent = () => {
  const [imageUpload, setImageUpload] = useState(null); // Single image file
  const [imageUrls, setImageUrls] = useState([]); // To hold URLs of uploaded images
  const [uploaded, setUploaded] = useState(0); // To track the number of uploaded files

  const handleImageChange = (event) => {
    setImageUpload(event.target.files); // Set selected image files
  };

  const uploadFiles = (items) => {
    if (!items || items.length === 0) return; // Ensure files are selected

    // Loop through each file and upload
    Array.from(items).forEach((item, index) => {
      const uniqueFileName = `${item.name}_${uuidv4()}`; // Create a unique filename
      const storageRef = ref(storage, `images/${uniqueFileName}`);

      // Upload file to Firebase Storage
      const uploadTask = uploadBytes(storageRef, item);

      uploadTask.then(() => {
        console.log(`Upload #${index + 1} is complete, fetching URL...`);

        // Get the download URL for the uploaded file
        getDownloadURL(storageRef)
          .then((url) => {
            console.log(`Upload #${index + 1} is now available at ${url}.`);

            // Update the state with the new URL
            setImageUrls((prev) => [...prev, url]);

            // Track how many files have been uploaded
            setUploaded((prev) => prev + 1);
          })
          .catch((error) => {
            console.error("Error fetching download URL:", error);
          });
      });
    });
  };

  // Event handler for file upload
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
      <button onClick={handleUpload}>Upload Files</button>

      {/* Display URLs of uploaded images */}
      <div>
        {imageUrls.map((url, index) => (
          <div key={index}>
            <p>Uploaded Image #{index + 1}</p>
            <a href={url} target="_blank" rel="noopener noreferrer">
              {url}
            </a>
          </div>
        ))}
      </div>

      {/* Display the upload progress */}
      <p>{uploaded} files uploaded successfully!</p>
    </div>
  );
};

export default ImageUploadComponent;
