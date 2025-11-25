const { findUserById, updateUser } = require('../store/inMemoryDb');
const { toUserResponse } = require('../utils/transformers');
const HttpError = require('../utils/httpError');

function getProfile(userId) {
  const user = findUserById(userId);

  if (!user) {
    throw new HttpError(404, 'User not found');
  }

  return toUserResponse(user);
}

function updateProfile(userId, updates) {
  const allowedFields = ['firstName', 'lastName', 'companyName', 'timezone'];
  const payload = {};

  for (const field of allowedFields) {
    if (updates[field] !== undefined) {
      payload[field] = updates[field];
    }
  }

  if (!Object.keys(payload).length) {
    throw new HttpError(400, 'No updatable fields provided');
  }

  const user = updateUser(userId, payload);

  if (!user) {
    throw new HttpError(404, 'User not found');
  }

  return toUserResponse(user);
}

module.exports = {
  getProfile,
  updateProfile
};
