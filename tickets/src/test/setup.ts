import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

declare global {
  var getAuthCookie: () => string[];
}

let mongo: any;

// on test start
beforeAll(async () => {
  // initialize a JWT_KEY env variable for testing
  process.env.JWT_KEY = 'asdasd';

  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {});
});

// before each test
beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  // delete existing entries
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

// after test
afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});

// create global variable
global.getAuthCookie = () => {
  // build a JWT payload { id, email }
  const payload = {
    id: 'testid1234',
    email: 'test@test.com'
  };

  // create the JWT
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // build session object { jwt: MY_JWT }
  const session = { jwt: token };

  // turn that session into JSON
  const sessionJSON = JSON.stringify(session);

  // take JSON and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString('base64');

  // return a string that is the cookie with the encoded data
  return [`session=${base64}`];
};
