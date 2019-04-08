const express = require('express');

const formController = require('../controllers/formController');

const router = express.Router();

// GET /forms-data
router.get('/', formController.getForms);

// GET /forms-data/:id
router.get('/:id', formController.getForm);

// POST /forms-data
router.post('/', formController.saveForm);

module.exports = router;
