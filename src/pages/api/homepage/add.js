// pages/api/homepage/add.js
import dbConnect from '../../../lib/db';
import HomePageContent from '../../../models/HomePageContent';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    try {
      const { heading, shortDesc, longDesc } = req.body;

      // Validation: Ensure all fields are provided
      if (!heading || !shortDesc || !longDesc) {
        return res.status(400).json({ message: 'All fields are required.' });
      }

      // Insert into MongoDB
      const newContent = new HomePageContent({
        heading,
        shortDesc,
        longDesc,
      });

      await newContent.save();
      return res.status(201).json({ message: 'Content added successfully!' });

    } catch (error) {
      console.error('Database insertion error:', error);
      return res.status(500).json({ message: 'Database insertion error' });
    }
  } else {
    return res.status(405).json({ message: 'Only POST method is allowed' });
  }
}
