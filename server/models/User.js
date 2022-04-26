import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    names: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      public_id: String,
      url: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model('Users', userSchema);
