// test/integration/userRoutes.test.js
jest.setTimeout(15000); 
const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');

describe('User Routes Integration', () => {
  beforeAll(async () => {
    // Connect to in-memory DB
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should create a new user via POST /api/users', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({ username: 'Jane', password: 'strongpassword' }) // ✅ CORRECT
    expect(res.statusCode).toBe(201);
  });
});
