import express from 'express';
import * as dotenv from 'dotenv';
import { sessionMiddleware } from './auth/session.js';
import authRoutes from './routes/auth.js';
import recipeRoutes from './routes/recipes.js';
import ingredientRoutes from './routes/ingredients.js';
import instructionRoutes from './routes/instructions.js';

dotenv.config();

const app = express();

app.use(express.json());
app.set('trust proxy', 1);
app.use(sessionMiddleware);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/recipes/', recipeRoutes);
app.use('/api/ingredients', ingredientRoutes);
app.use('/api/instructions', instructionRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
