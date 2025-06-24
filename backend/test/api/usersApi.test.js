// test/api/usersApi.test.js
jest.setTimeout(15000);
const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');
const User = require('../../models/User');

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/testdb', { useNewUrlParser: true, useUnifiedTopology: true });
});

beforeEach(async () => {
  await User.deleteMany({});
  await User.create({ username: 'testuser', password: '123456' });
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('Users API', () => {
  it('GET /api/users should return a list of users', async () => {
    const res = await request(app).get('/api/users');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
