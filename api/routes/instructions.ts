import { Router } from "express";
import db from "../db";
import camelcaseKeys from "camelcase-keys";

const router = Router();

router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM instructions;');
    const instructions = camelcaseKeys(result.rows, {deep: true});
    res.json(instructions);
  } catch (err) {
    console.error('Error fetching instructions: ', err);
    res.status(500).json({error: 'Internal services error'});
  }
});

export default router;