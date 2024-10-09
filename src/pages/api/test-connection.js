// src/pages/api/test-connection.js
import connectDB from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const isConnected = await connectDB();

    if (isConnected) {
      return res.status(200).json({ message: 'Database connection successful' });
    } else {
      return res.status(500).json({ message: 'Database connection failed' });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
