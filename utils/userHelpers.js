const User = require("../models/User");

const createUser = async (user) => {
  try {
    const newUser = await User.create({
      username: user.username,
      password: user.password,
      email: user.email,
      steamId: user.steamId,
      zipcode: user.zipcode,
    });
    return newUser;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const updateUser = async (user, newData) => {
  try {
    const updatedUser = await user.update(newData);
    return updatedUser;
  } catch (error) {
    console.error(error);
    return null;
  }
};

module.exports = { createUser, updateUser };
