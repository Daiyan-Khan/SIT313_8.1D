import React from 'react';
import { storage } from './utils/firebase'; // Import Firebase storage
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const ImageUpload = ({ onUpload }) => {
  // Function to handle image upload
  const handleImageUpload = async (file) => {
    const storageRef = ref(storage, `images/${file.name}`); // Create a reference to the storage location
    await uploadBytes(storageRef, file); // Upload the file
    const url = await getDownloadURL(storageRef); // Get the download URL
    onUpload(url); // Call the onUpload prop to update the URLs in parent
  };

  const handleFileChange = async (event) => {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      await handleImageUpload(files[i]); // Upload each file and get URL
    }
  };

  return (
    <div>
      <input 
        type="file" 
        accept="image/*" 
        multiple 
        onChange={handleFileChange} 
      />
    </div>
  );
};

export default ImageUpload;
