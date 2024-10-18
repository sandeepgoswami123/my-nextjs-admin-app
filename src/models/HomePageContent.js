// models/HomePageContent.js
import mongoose from 'mongoose';

const HomePageContentSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
  },
  shortDesc: {
    type: String,
    required: true,
  },
  longDesc: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.models.HomePageContent || mongoose.model('HomePageContent', HomePageContentSchema);
