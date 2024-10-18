import connectDB from '../../../lib/db';
import HomepageContent from '../../../models/HomePageContent'; // Assuming you have a Mongoose model for this

export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'GET') {
    try {
      const homepageData = await HomepageContent.find({});
      res.status(200).json(homepageData);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching homepage content', error });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
