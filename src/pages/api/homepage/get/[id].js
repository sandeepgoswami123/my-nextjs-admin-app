// src/pages/api/homepage/get/[id].js
import { connectDB } from '../../../../lib/db'; // Adjust import path as needed
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  // Check if the method is GET
  if (req.method === 'GET') {
    const { id } = req.query; // Extract the ID from query parameters

    // Validate ObjectId
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    try {
      const client = await connectDB(); // Establish a connection to the database
      const db = client.db(); // Get the database instance

      // Fetch homepage content from the database
      const homepage = await db.collection('homepagecontents').findOne({ _id: new ObjectId(id) });

      client.close(); // Close the database connection

      // Check if homepage content was found
      if (homepage) {
        return res.status(200).json(homepage); // Return the found homepage content
      } else {
        return res.status(404).json({ message: 'Content not found' }); // Return 404 if not found
      }
    } catch (error) {
      console.error('API Error:', error); // Log error for debugging
      return res.status(500).json({ message: 'Server error' }); // Return server error
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' }); // Return 405 if method is not allowed
  }
}
