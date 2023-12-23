import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../app';

declare global {
  var getAuthCookie: () => Promise<string[]>;
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
global.getAuthCookie = async () => {
  const email = 'test@test.com';
  const password = 'password';

  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email,
      password
    })
    .expect(201);

  const cookie = response.get('Set-Cookie');

  return cookie;
};
