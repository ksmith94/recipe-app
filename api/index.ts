import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import recipeRoutes from './routes/recipes';
import ingredientRoutes from './routes/ingredients';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.json());

// Routes
app.use('/api/recipes/', recipeRoutes);
app.use('/api/ingredients', ingredientRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
