const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Student } = require('../models');
require('dotenv').config();

const registerStudent = async (req, res) => {
    const { username, password, email, studentData } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const student = await Student.create(studentData);
        const user = await User.create({
            username,
            password: hashedPassword,
            email,
            role: 'student',
            studentId: student.studentId
        });
        res.status(201).json({ message: 'Student registered successfully', user });
    } catch (error) {
        res.status(400).json({ message: 'Error registering student', error });
    }
};

const registerAdmin = async (req, res) => {
    const { username, password, email } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            password: hashedPassword,
            email,
            role: 'admin'
        });
        res.status(201).json({ message: 'Admin registered successfully', user });
    } catch (error) {
        res.status(400).json({ message: 'Error registering admin', error });
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid password' });
        }
        const token = jwt.sign({ userId: user.userId, role: user.role },  process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(400).json({ message: 'Error logging in', error });
    }
};


module.exports = {
    registerStudent,
    registerAdmin,
    login
};
