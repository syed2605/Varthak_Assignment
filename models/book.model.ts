import mongoose, { Model, Schema } from 'mongoose';


const BookSchema: Schema<any> = new Schema({
  user_id:{ type: String, required: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
},{timestamps: true});

const BookModel: Model<any>  = mongoose.model('Varthak_Book', BookSchema);

export { BookModel };