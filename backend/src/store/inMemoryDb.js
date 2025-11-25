const users = [];
const refreshTokens = new Map();

function addUser(user) {
  users.push(user);
  return user;
}

function findUserByEmail(email) {
  return users.find((user) => user.email.toLowerCase() === email.toLowerCase());
}

function findUserById(id) {
  return users.find((user) => user.id === id);
}

function storeRefreshToken(hash, payload) {
  refreshTokens.set(hash, payload);
}

function findRefreshToken(hash) {
  return refreshTokens.get(hash);
}

function deleteRefreshToken(hash) {
  refreshTokens.delete(hash);
}

function clearUserTokens(userId) {
  for (const [hash, payload] of refreshTokens.entries()) {
    if (payload.userId === userId) {
      refreshTokens.delete(hash);
    }
  }
}

module.exports = {
  addUser,
  findUserByEmail,
  findUserById,
  storeRefreshToken,
  findRefreshToken,
  deleteRefreshToken,
  clearUserTokens
};
