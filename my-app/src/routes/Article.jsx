import React, { useState } from 'react';
import { TextArea, Form } from 'semantic-ui-react';
import ImageUploadComponent from '../ImageUpload'; 
import { db } from '../utils/firebase';
import { collection, addDoc } from 'firebase/firestore';
import '../css/PostPage.css'; 

const TagInput = ({ tags, setTags }) => {
  const [currentTag, setCurrentTag] = useState('');

  const handleAddTag = () => {
    if (currentTag && !tags.includes(currentTag)) {
      setTags((prevTags) => [...prevTags, currentTag]);
      setCurrentTag('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleAddTag();
  };

  return (
    <div>
      <input
        type="text"
        value={currentTag}
        onChange={(e) => setCurrentTag(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Add a tag"
        style={{ width: '80%', padding: '10px', borderRadius: '5px', marginRight: '10px' }}
      />
      <button type="button" onClick={handleAddTag} style={{ padding: '10px 15px', borderRadius: '5px' }}>
        +
      </button>
      <div style={{ marginTop: '10px' }}>
        {tags.map((tag, index) => (
          <span key={index} style={{ display: 'inline-block', background: '#e0e0e0', borderRadius: '12px', padding: '5px 10px', margin: '5px' }}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

const Article = () => {
  const [title, setTitle] = useState('');
  const [abstract, setAbstract] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (url) => {
    setImageUrls((prev) => [...prev, url]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !abstract || !body) {
      alert('Please fill out all required fields.');
      return;
    }

    const userEmail = localStorage.getItem('userEmail');

    try {
      setLoading(true);
      const articleData = { title, abstract, body, tags, imageUrls, userEmail, createdAt: new Date() };
      const docRef = await addDoc(collection(db, 'posts'), articleData);
      alert('Article successfully added!');

      // Reset form
      setTitle('');
      setAbstract('');
      setBody('');
      setTags([]);
      setImageUrls([]);
    } catch (error) {
      console.error('Error adding document:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='PostSection'>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label style={{ color: 'white' }}>Title</label>
          <input 
            placeholder="Enter article title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            style={{ width: '100%', padding: '10px', borderRadius: '12px' }} 
          />
        </Form.Field>

        <Form.Field>
          <label style={{ color: 'white' }}>Abstract</label>
          <TextArea 
            placeholder="Enter a 1 paragraph abstract" 
            value={abstract} 
            onChange={(e) => setAbstract(e.target.value)} 
            style={{ minHeight: 50, width: '100%', borderRadius: '12px' }} 
          />
        </Form.Field>

        <Form.Field>
          <label style={{ color: 'white' }}>Article Text</label>
          <TextArea 
            placeholder="Enter the full article text" 
            value={body} 
            onChange={(e) => setBody(e.target.value)} 
            style={{ minHeight: 400, width: '100%', borderRadius: '12px' }} 
          />
        </Form.Field>

        <ImageUploadComponent onUpload={handleImageUpload} />

        {/* Image preview */}
        <div className="uploaded-images" style={{ display: 'flex', flexWrap: 'wrap', marginTop: '20px' }}>
          {imageUrls.map((url, index) => (
            <img key={index} src={url} alt={`Uploaded ${index}`} style={{ width: '100px', height: '100px', margin: '10px', borderRadius: '8px' }} />
          ))}
        </div>

        {/* Tags input */}
        <TagInput tags={tags} setTags={setTags} />

        <button type="submit" style={{ marginTop: '20px', padding: '10px 15px', borderRadius: '5px' }} disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Article'}
        </button>
      </Form>
    </div>
  );
};

export default Article;
