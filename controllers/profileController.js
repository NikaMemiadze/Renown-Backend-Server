const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

exports.deleteAccount = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const user = await User.findByIdAndDelete(userId);

        if (!user) return next(new createError("User not found!", 404));

        res.status(200).json({ message: "User successfully deleted" });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}

exports.changeEmail = async (req, res) => {
    const { newEmail, currentPassword } = req.body;
    const userId = req.user._id;

    if (!newEmail || !currentPassword) {
        return res.status(400).json({ message: "New email and current password are required" });
    }

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordMatch = await bcrypt.compare(currentPassword, user.password);

        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Current password is incorrect' });
        }

        if (user.email === newEmail) {
            return res.status(400).json({ message: 'You have already used this email' });
        }

        user.email = newEmail;
        await user.save();

        res.status(200).json({ message: 'Email updated successfully' });
    } catch (error) {
        console.error('Error fetching or updating user:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

exports.changePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user._id;

    if (!currentPassword || !newPassword) {
        return res.status(400).json({ message: 'Current password and new password are required' });
    }

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordMatch = await bcrypt.compare(currentPassword, user.password);

        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Current password is incorrect' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: 'Password updated successfully' });

    } catch (error) {
        console.error('Error fetching or updating user:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

exports.changeName = async (req, res) => {
    const { newName } = req.body;
    const userId = req.user._id;

    if (!newName) {
        return res.status(400).json({ message: 'Name is required' });
    }

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.name === newName) {
            return res.status(400).json({ message: 'You have already used this name' });
        }

        user.name = newName;
        await user.save();

        res.status(200).json({ message: 'Name updated successfully' });
    } catch (error) {
        console.error('Error fetching or updating user:', error);
        res.status(500).json({ message: 'Server error' });
    }
}
