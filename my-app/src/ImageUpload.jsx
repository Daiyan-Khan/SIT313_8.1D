import React from 'react';

const ImageUploadComponent = ({ onUpload }) => {
  const handleImageUpload = (event) => {
    const files = event.target.files;
    const urls = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const url = URL.createObjectURL(file); // Create a URL for the uploaded file
      urls.push(url);
      // Here you can also upload the file to your storage if needed
    }

    urls.forEach(url => onUpload(url)); // Call the onUpload function with the new URL(s)
  };

  return (
    <div>
      <input type="file" multiple onChange={handleImageUpload} />
    </div>
  );
};

export default ImageUploadComponent;
