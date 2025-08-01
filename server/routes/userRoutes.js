const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { createUser, getUsers,savePreferences,updateUserPreferences } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', createUser);
router.get('/', getUsers);
router.post('/preferences', protect, savePreferences);
router.put('/:id/preferences', updateUserPreferences);


// Omnidim webhook updates only preferences for an existing user
router.post('/webhook', async (req, res) => {
      console.log("📥 Incoming Omnidim webhook data:", req.body);
  try {
    const { email, preferences } = req.body;

    if (!email || !preferences) {
      return res.status(400).json({ message: 'Email and preferences are required' });
    }

    const user = await User.findOneAndUpdate(
      { email },
      { preferences },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    console.log("Incoming Omnidim data:", req.body);

    res.status(200).json({ message: 'Preferences updated via Omnidim', user });
  } catch (error) {
    console.error('Omnidim webhook error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
