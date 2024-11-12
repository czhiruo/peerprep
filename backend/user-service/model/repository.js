import UserModel from "./user-model.js";
import "dotenv/config";
import { connect } from "mongoose";

export async function connectToDB() {
  let mongoDBUri =
    process.env.ENV === "PROD"
      ? process.env.DB_CLOUD_URI
      : process.env.DB_LOCAL_URI;

  await connect(mongoDBUri);
}

export async function createUser(username, email, password) {
  return new UserModel({ username, email, password }).save();
}

export async function findUserByEmail(email) {
  return UserModel.findOne({ email });
}

export async function findUserById(userId) {
  return UserModel.findById(userId);
}

export async function findUserByUsername(username) {
  return UserModel.findOne({ username });
}

export async function findUserByUsernameOrEmail(username, email) {
  return UserModel.findOne({
    $or: [
      { username },
      { email },
    ],
  });
}

export async function findUserByResetPasswordToken(resetPasswordToken) {
  return UserModel.findOne({ resetPasswordToken });
}

export async function findAllUsers() {
  return UserModel.find();
}

export async function updateUserById(userId, username, email, password) {
  return UserModel.findByIdAndUpdate(
    userId,
    {
      $set: {
        username,
        email,
        password,
      },
    },
    { new: true },  // return the updated user
  );
}

export async function updatePasswordTokenById(userId, resetPasswordToken, resetPasswordExpiresIn) {
  return UserModel.findByIdAndUpdate(
    userId,
    {
      $set: {
        resetPasswordToken,
        resetPasswordExpiresIn
      },
    },
    { new: true } // return the updated user
  );
}


export async function updateUserPrivilegeById(userId, isAdmin) {
  return UserModel.findByIdAndUpdate(
    userId,
    {
      $set: {
        isAdmin,
      },
    },
    { new: true },  // return the updated user
  );
}

export async function deleteUserById(userId) {
  return UserModel.findByIdAndDelete(userId);
}

export async function getAttemptedQuestions(userId) {
  return UserModel.findById(userId, "attemptedQuestions");
}

export async function addAttemptedQuestion(userId, questionId, code, language) {
  return UserModel.findByIdAndUpdate(
    userId,
    {
      $push: {
        attemptedQuestions: {
          questionId,
          language,
          code
        },
      },
    },
    { new: true },  // return the updated user
  );
}

export async function getAttemptedQuestionById(userId, attemptId) {
  return UserModel.findOne(
    { 
      _id: userId, 
      "attemptedQuestions._id": attemptId 
    },
    { "attemptedQuestions.$": 1 }
  );
}
