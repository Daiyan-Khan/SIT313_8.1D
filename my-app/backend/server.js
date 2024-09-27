const express = require('express');
const { getStorage, ref, uploadBytes, getDownloadURL } = require('firebase/storage');
import fetch from 'node-fetch';

const app = express();
const storage = getStorage();

app.use(express.json());

app.post('/upload-images', async (req, res) => {
  const { imageUrls } = req.body; // Receive the image URLs from the frontend
  const uploadedImageUrls = [];

  try {
    for (const url of imageUrls) {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }
      const blob = await response.buffer(); // Get the image buffer
      const storageRef = ref(storage, `articles/${Date.now()}_${url.split('/').pop()}`);
      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);
      uploadedImageUrls.push(downloadURL);
    }
    res.status(200).json({ uploadedImageUrls }); // Return the uploaded image URLs
  } catch (error) {
    console.error('Error uploading images:', error);
    res.status(500).json({ error: 'Image upload failed' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
