import express from 'express';

import { getRelation, getAllRelations, createRelation, deleteRelation } from '../controllers/relations.js'

const router = express.Router();

router.post('/get', getRelation);
router.get('/getAll', getAllRelations);
router.post('/create', createRelation);
router.delete('/:id', deleteRelation);

export default router;