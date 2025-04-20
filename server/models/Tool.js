const mongoose = require('mongoose');

const toolSchema = new mongoose.Schema({
  name: { 
    type: String,
     required: true 
    },
  description: {
     type: String,
      required: true 
    },
  category: { 
    type: String,
     required: true
     },
  imageUrl: {
     type: String
     },
}, 
{ 
  timestamps: true 
});

module.exports = mongoose.model('Tool', toolSchema);