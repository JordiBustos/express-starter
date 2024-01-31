const { DataTypes } = require("sequelize");
const db = require("../db");

const User = db.define(
  "Users",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      required: true,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      required: true,
    },
    email: {
      type: DataTypes.STRING,
      required: true,
      unique: true,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "user",
    },

    lastLogin: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },

    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },

    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },

    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    displayName: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    profileImage: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: false,
  },
);

async function userExists(username) {
  const existingUser = await User.findOne({ where: { username } });
  return existingUser !== null;
}

async function insertMockUser() {
  const mockUser = {
    id: 0,
    username: "testuser",
    password: "testpassword",
    email: "test@test.com",
    role: "user",
    lastLogin: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: false,
    displayName: "Test User",
    profileImage: "",
    isVerified: false,
  };

  try {
    await db.authenticate();
    await db.sync(); // This creates the table if it doesn't exist

    const usernameExists = await userExists(mockUser.username);

    if (!usernameExists) {
      const result = await User.create(mockUser);
      console.log(`Inserted user with id: ${result.id}`);
    } else {
      console.log(`User with username ${mockUser.username} already exists.`);
    }
  } catch (error) {
    console.error(error);
  }
}

insertMockUser();

module.exports = User;
