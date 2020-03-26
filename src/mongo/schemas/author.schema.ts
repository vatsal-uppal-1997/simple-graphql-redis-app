import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

export interface IAuthor extends mongoose.Document {
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  password: string;
}

export interface IAuthorModel extends mongoose.Model<IAuthor> {  
  verifyPassword(email: String, password: String): Promise<IAuthor | false>
}

const AuthorSchema = new mongoose.Schema({

  firstName: {
    type: String,
    required: true,
    lowercase: true,
  },

  lastName: {
    type: String,
    required: true,
    lowercase: true,
  },

  email: {
    type: String,
    required: true,
    lowercase: true,
  },

  userName: {
    type: String,
    required: true,
    lowercase: true,
  },

  password: {
    type: String,
    required: true,
  },

})

const isAuthor = (document: mongoose.Document | IAuthor): document is IAuthor => {
  if ((document as IAuthor).email && (document as IAuthor).userName) {
    return true
  }
  return false
}

AuthorSchema.pre("save", async function () {
  if (isAuthor(this)) {
    const password = this.password
    const hashedPassword = await bcrypt.hash(password, 10)

    this.password = hashedPassword
    return this
  }
  throw new Error('This is not of type author')
})

AuthorSchema.statics.verifyPassword = async function (email: String, password: String) {
  const author: IAuthor = await this.findOne({ email })

  if (author && author.email) {
    const hashedPassword = author.password;
    return (await bcrypt.compare(password, hashedPassword)) ? author: false
  }

  return false
}


export default mongoose.model<IAuthor, IAuthorModel>('Author', AuthorSchema)