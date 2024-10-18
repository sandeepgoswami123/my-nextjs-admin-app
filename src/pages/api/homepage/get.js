import connectDB from '../../../lib/db';
import mongoose from 'mongoose';

const HomepageSchema = new mongoose.Schema({
  heading: String,
  shortDesc: String,
  longDesc: String,
});
const Homepage = mongoose.models.Homepage || mongoose.model('homepagecontents', HomepageSchema);

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      await connectDB(); // Connect to MongoDB
      const homepageData = await Homepage.find({}); // Fetch all data
      res.status(200).json(homepageData); // Send data as JSON
    } catch (error) {
      console.error('Error fetching homepage data:', error);
      res.status(500).json({ message: 'Failed to fetch data' });
    }
  } else {
    res.status(405).json({ message: 'Only GET requests allowed' }); // Method not allowed
  }
}
