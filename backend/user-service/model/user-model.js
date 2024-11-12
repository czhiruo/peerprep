import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserModelSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Setting default to the current date/time
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  attemptedQuestions: [
    {
      questionId: {
        type: Schema.Types.ObjectId,
        required: true,
      },
      attemptedAt: {
        type: Date,
        default: Date.now, // Automatically set to the current date/time
      },
      code: {
        type: String,
        required: true,
      },
      language: {
        type: String,
        required: true,
      }
    },
  ],
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpiresIn: {
    type: Date,
  },
});

export default mongoose.model("UserModel", UserModelSchema);
