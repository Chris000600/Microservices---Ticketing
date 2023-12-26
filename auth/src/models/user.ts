import mongoose from 'mongoose';
import { Password } from '../services/password';

// describe the properties that are required to CREATE a new User record
interface UserAttributes {
  email: string;
  password: string;
}

// describe the properties that the User Model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attributes: UserAttributes): UserDoc;
}

// describe the properties that a saved record has
// represents a single record
interface UserDoc extends mongoose.Document {
  // user properties
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    toJSON: {
      // edit returned json file from mongodb
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      }
    }
  }
);

// mongoose built-in middleware to intercept function calls
// perform password hashing when saving
userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});

// for typechecking
userSchema.statics.build = (attributes: UserAttributes) => {
  return new User(attributes);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

// const user = User.build({
//   email: 'test@test.com',
//   password: 'asdasd'
// });
// user.email

export { User };
