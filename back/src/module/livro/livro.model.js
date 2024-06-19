const mongoose = require('../../config/mongo')
const { Schema } = mongoose

const livroSchema = new Schema(
  {
    titulo: String,
    numeroPagina: Number,
    isbn: String,
    editora: String
  },
  {
    timestamps:true
  }
)

const LivroModel = mongoose.model('Livro', livroSchema)
module.exports = LivroModel