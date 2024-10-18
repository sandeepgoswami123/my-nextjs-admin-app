import dbConnect from '../../../lib/db'
import HomePageContent from '../../../models/HomePageContent';
import formidable from 'formidable';
res.setHeader('Access-Control-Allow-Origin', '*'); 
res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

export const config = {
  api: {
    bodyParser: false, // Use formidable for form parsing
  },
};

export default async function handler(req, res) {
  try {
    // Ensure MongoDB connection
    await dbConnect();
    console.log('MongoDB connected');

    if (req.method === 'POST') {
      const form = formidable();

      // Parse the form data
      form.parse(req, async (err, fields) => {
        if (err) {
          console.error('Form parsing error:', err);  // Log any parsing errors
          return res.status(500).json({ message: 'Form parsing error' });
        }

        // Log the parsed fields
        console.log('Parsed form fields:', fields);

        // Destructure the parsed form fields
        const { heading, shortDesc, longDesc } = fields;

        if (!heading || !shortDesc || !longDesc) {
          console.error('Validation error: Missing required fields');  // Log validation error
          return res.status(400).json({ message: 'All fields are required' });
        }

        try {
          // Create a new HomePageContent document
          const newContent = new HomePageContent({
            heading,
            shortDesc,
            longDesc,
          });

          console.log('New content to be inserted:', newContent);

          // Save the new document to MongoDB
          await newContent.save();
          console.log('Content saved successfully');
          res.status(201).json({ message: 'Content added successfully!' });

        } catch (error) {
          // Catch database insertion error
          console.error('Database insertion error:', error);
          res.status(500).json({ message: 'Database insertion error', error: error.message });
        }
      });
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Server error:', error);  // Log server-level errors
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}
