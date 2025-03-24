import {Router} from 'express';
import express from 'express';
import { addItem, deleteItem, getItem, putItem } from '../service/itemService';

const router = Router();

router.use(express.json());

export const itemController = {
    addItem: addItem,
    getItem: getItem,
    putItem: putItem,
    deleteItem: deleteItem
}

router.post('/', itemController.addItem);
router.get('/', itemController.getItem);
router.put('/:id', itemController.putItem);
router.delete('/:id', itemController.deleteItem);

export default router;