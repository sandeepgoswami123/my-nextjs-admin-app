import { connectDB } from '../../../../lib/db';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    try {
      const { id } = req.query;
      const { heading, shortDesc, longDesc } = req.body;

      const client = await connectDB();
      const db = client.db();

      const result = await db.collection('homepagecontents').updateOne(
        { _id: new ObjectId(id) },
        { $set: { heading, shortDesc, longDesc } }
      );

      client.close();

      if (result.modifiedCount > 0) {
        res.status(200).json({ message: 'Content updated successfully' });
      } else {
        res.status(404).json({ message: 'Content not found or no changes made' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
