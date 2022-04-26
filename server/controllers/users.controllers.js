import { deleteImage, uploadImage } from '../libs/cloudinary.js';
import User from '../models/User.js';
import fs from 'fs-extra';

export const getUsers = async (req, res) => {
  try {
    const Users = await User.find({});
    return res.json(Users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const { names, email } = req.body;
    let image = null;
    if (req.files?.image) {
      const result = await uploadImage(req.files.image.tempFilePath);
      await fs.remove(req.files.image.tempFilePath);
      image = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }
    const newUser = new User({ names, email, image });
    await newUser.save();
    return res.json(newUser);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) return res.sendStatus(404);
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    // TODO: validate req.body before to update

    // if a new image is uploaded upload it to cloudinary
    if (req.files?.image) {
      const result = await uploadImage(req.files.image.tempFilePath);
      await fs.remove(req.files.image.tempFilePath);
      // add the new image to the req.body
      req.body.image = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      {
        new: true,
      }
    );
    return res.json(updatedUser);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const removeUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);

    if (user && user.image.public_id) {
      await deleteImage(user.image.public_id);
    }

    if (!user) return res.sendStatus(404);
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
