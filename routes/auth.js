// routes/auth.js

const express = require('express');
const { registerStudent, registerAdmin, login } = require('../controllers/authControllers');
const router = express.Router();

router.post('/register/student', registerStudent);
router.post('/register/admin', registerAdmin);
router.post('/login', login);

module.exports = router;