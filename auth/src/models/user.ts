import mongoose from 'mongoose';
import { Password } from '../services/password';

// describe the properties that are required to create a new User
interface UserAttributes {
  email: string;
  password: string;
}

// describe the properties that the User Model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attributes: UserAttributes): UserDoc;
}

// describe the properties that a User Document has
interface UserDoc extends mongoose.Document {
  // user properties
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

// mongoose built-in middleware to intercept function calls
// perform password hashing when saving
userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});

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
