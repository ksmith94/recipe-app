"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require('dotenv').config();
const app = (0, express_1.default)();
const recipeRoutes = require('./routes/recipes');
const ingredientRoutes = require('./routes/ingredients');
// const db = require('./db');
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.json());
// Routes
app.use('/api/recipes/', recipeRoutes);
app.use('/api/ingredients', ingredientRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
