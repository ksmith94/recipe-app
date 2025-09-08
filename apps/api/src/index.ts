import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import recipeRoutes from './routes/recipes.js';
import ingredientRoutes from './routes/ingredients.js';
import instructionRoutes from './routes/instructions.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/recipes/', recipeRoutes);
app.use('/api/ingredients', ingredientRoutes);
app.use('/api/instructions', instructionRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
