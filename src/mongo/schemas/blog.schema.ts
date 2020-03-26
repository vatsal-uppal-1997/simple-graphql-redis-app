import mongoose from 'mongoose'

export interface IBlog extends mongoose.Document {
    title: string;
    authorID: string;
    body: string;
}

const BlogSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true,
  },

  authorID: {
    type: String,
    required: true,
  },

  body: {
    type: String,
    required: true,
  }

})


export default mongoose.model<IBlog>('Blog', BlogSchema)