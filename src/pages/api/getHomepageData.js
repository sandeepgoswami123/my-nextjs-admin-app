import connectDB from '../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Only GET requests allowed' });
  }

  try {
    const { db } = await connectDB();

    if (!db) {
      return res.status(500).json({ message: 'Failed to connect to the database' });
    }

    // Fetch data from the collection (ensure the collection name is correct)
    const homepageData = await db.collection('index').find({}).toArray();

    // Send the response with the fetched data
    res.status(200).json(homepageData);
  } catch (error) {
    console.error('Error fetching homepage data:', error);
    res.status(500).json({ message: 'Failed to load data' });
  }
}
