import mongoose from 'mongoose';
import User from '../models/user.js';
import Relation from '../models/relation.js';

// Get all users
export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Create a user
export const createUser = async (req, res) => {
    const user = req.body;

    const newUser = new User({
        ...user
    });

    try {
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

// Delete a user
export const deleteUser = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No user with id: ${id}`);

    await User.findByIdAndDelete(id);

    res.json({ message: 'user deleted successfully' });
};