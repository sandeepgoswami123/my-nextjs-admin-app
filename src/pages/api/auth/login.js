import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connectMongo from '../../../lib/db';
import User from '../../../models/User';

export default async function handler(req, res) {
  await connectMongo();

  if (req.method === 'POST') {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: 'User not found' });

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
