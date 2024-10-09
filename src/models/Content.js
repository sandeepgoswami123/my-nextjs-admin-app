import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema({
  page: { type: String, required: true }, // 'home', 'contact', 'blog'
  content: { type: Object, required: true },
});

const Content = mongoose.models.Content || mongoose.model('Content', contentSchema);

export default Content;
