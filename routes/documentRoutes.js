const express = require('express');
const Document = require('../models/Document');
const authenticateJWT = require('../helper/authenticateJWT');

const router = express.Router();

// Create Document
router.post('/', authenticateJWT, async (req, res) => {
  try {
    const { title, content } = req.body;
    const document = await Document.create({
      title,
      content,
      userId: req.user.id,
    });
    res.status(201).json({ message: 'Document created', document });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error creating document', error: err.message });
  }
});

module.exports = router;
