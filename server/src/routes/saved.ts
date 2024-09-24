// saved destinations router 

import express from 'express';

import {
    getSaved,
    createSaved,
    deleteSaved,
} from '../controllers/saved-controller.js';
    
const router = express.Router();

// GET /saved - Get all saved destinations
router.get('/', getSaved);

// POST /saved - Create a new saved destination
router.post('/', createSaved);

// DELETE /saved/:id - Delete a saved destination by id
router.delete('/:id', deleteSaved);

export default router;



