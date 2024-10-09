import { connectToDatabase } from '../../../lib/db';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false, // Required for formidable to handle file uploads
  },
};

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const form = new formidable.IncomingForm();
    const uploadDir = path.join(process.cwd(), '/public/uploads');

    // Ensure upload directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    form.uploadDir = uploadDir;
    form.keepExtensions = true;

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to parse form data' });
      }

      const { heading, shortDesc, longDesc } = fields;
      const bannerImage = files.bannerImage ? files.bannerImage.newFilename : '';
      const galleryImages = files.galleryImages
        ? Array.isArray(files.galleryImages)
          ? files.galleryImages.map(file => file.newFilename)
          : [files.galleryImages.newFilename] // Handle single image case
        : [];

      const { db } = await connectToDatabase();

      // Update content in MongoDB
      try {
        const result = await db.collection('content').updateOne(
          { page: 'home' }, // Match document for "home" page
          {
            $set: {
              heading,
              shortDesc,
              longDesc,
              bannerImage,
              galleryImages,
            },
          },
          { upsert: true } // Create new document if not found
        );

        return res.status(200).json({ message: 'Content updated successfully', result });
      } catch (error) {
        return res.status(500).json({ error: 'Failed to update content' });
      }
    });
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed d`);
  }
}
