const mongoose = require('mongoose');
const User = require('./../../models/User');

describe('User Model', () => {
  it('should create a new user object', () => {
    const user = new User({ username: 'JohnDoe', password: 'securepass123' });
    expect(user.username).toBe('JohnDoe');
    expect(user.password).toBe('securepass123');
    expect(user.role).toBe('user'); // default value
  });
});
