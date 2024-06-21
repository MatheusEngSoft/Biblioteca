const mongoose = require('../../config/mongo');
const { Schema } = mongoose;

const livroSchema = new Schema(
  {
    id: { type: Number, required: true, unique: true },
    titulo: { type: String, required: true, unique: true },
    numeroPagina: { type: String, required: true },
    isbn: { type: String, required: true, unique: true },
    editora: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const LivroModel = mongoose.model('Livro', livroSchema);
module.exports = LivroModel;
