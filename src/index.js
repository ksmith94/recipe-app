require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();


const recipeRoutes = require('./routes/recipes');
const ingredientRoutes = require('./routes/ingredients');
// const db = require('./db');

app.use(cors());
app.use(express.json());

app.use(express.json());

// Routes
app.use('/api/recipes/', recipeRoutes);
app.use('/api/ingredients', ingredientRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));