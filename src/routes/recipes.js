const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM recipes;');
    res.json(result.rows);
  } catch (err) {
    console.error('Error querying recipes: ', err);
    res.status(500).json({error: 'Internal services error'});
  }
})

module.exports = router;
