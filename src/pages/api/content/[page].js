// pages/api/content/[page].js

import connectMongo from '../../../lib/db';
import Content from '../../../models/Content';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  await connectMongo();

  const { page } = req.query;

  if (req.method === 'GET') {
    try {
      const content = await Content.findOne({ page });
      res.status(200).json(content || { content: '' });
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving content' });
    }
  } else if (req.method === 'PUT') {
    // Verify token
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    try {
      jwt.verify(token, process.env.JWT_SECRET);

      const updatedContent = await Content.findOneAndUpdate(
        { page },
        { content: req.body.content },
        { upsert: true, new: true }
      );
      res.status(200).json(updatedContent);
    } catch (err) {
      res.status(401).json({ error: 'Invalid token' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
