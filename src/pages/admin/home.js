import { useEffect, useState } from 'react';
import AdminLayout from './components/AdminLayout';

const ManageHome = () => {
  const [heading, setHeading] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [longDesc, setLongDesc] = useState('');
  const [bannerImage, setBannerImage] = useState(null); // Set to null for file handling
  const [galleryImages, setGalleryImages] = useState([]);
  
  useEffect(() => {
    // Fetch existing content
    const fetchContent = async () => {
      const res = await fetch('/api/content/home');
      const data = await res.json();

      if (data) {
        setHeading(data.heading || '');
        setShortDesc(data.shortDesc || '');
        setLongDesc(data.longDesc || '');
        setBannerImage(null); // Reset to null when loading data
        setGalleryImages([]); // Reset to empty array when loading data
      }
    };

    fetchContent();
  }, []);

  const handleGalleryImageChange = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to an array
    setGalleryImages(files);
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token');
  
    const formData = new FormData();
    formData.append('heading', heading);
    formData.append('shortDesc', shortDesc);
    formData.append('longDesc', longDesc);
  
    // Add the banner image
    if (bannerImage) {
      formData.append('bannerImage', bannerImage); // File upload for banner image
    }
    
    // Add gallery images
    galleryImages.forEach((image) => {
      formData.append('galleryImages', image); // Append each gallery image
    });
  
    try {
      const res = await fetch('/api/content/home', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`, // Pass token for authentication
        },
        body: formData, // FormData automatically sets the correct headers
      });
  
      if (!res.ok) {
        const errorData = await res.json();
        console.error('API Error:', errorData);
        alert(`Failed to update content: ${errorData.error || 'Unknown error'}`);
        return;
      }
  
      const data = await res.json(); // Parse the JSON response
      alert(data.message || 'Content updated successfully');
    } catch (error) {
      console.error('Error during save:', error);
      alert('Failed to update content');
    }
  };
  
  return (
    <AdminLayout>
      <h2>Manage Home Page</h2>

      <label>Heading:</label>
      <input
        type="text"
        value={heading}
        onChange={(e) => setHeading(e.target.value)}
      />
      <br />

      <label>Short Description:</label>
      <textarea
        value={shortDesc}
        onChange={(e) => setShortDesc(e.target.value)}
        rows="3"
        cols="80"
      />
      <br />

      <label>Long Description:</label>
      <textarea
        value={longDesc}
        onChange={(e) => setLongDesc(e.target.value)}
        rows="5"
        cols="80"
      />
      <br />

      <label>Banner Image:</label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setBannerImage(e.target.files[0])}
      />
      <br />

      <label>Gallery Images:</label>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleGalleryImageChange}
      />
      <br />

      <button onClick={handleSave}>Save</button>
    </AdminLayout>
  );
};

export default ManageHome;
