import express from 'express';
import { addCategory, deleteCategoryData, getCategoriesData, getCategoryData, putCategoryData } from '../service/categoryService';
import { authenticateJWT } from '../service/authMiddleware';

const router = express.Router();

router.use(express.json());

export const categoryController = {
     addCategory: addCategory,
     getCategories: getCategoriesData,
     getCategory: getCategoryData,
     putCategory: putCategoryData,
     deleteCategory: deleteCategoryData
}

router.post('/', authenticateJWT, addCategory);
router.get('/', authenticateJWT, getCategoriesData);
router.get('/:id', authenticateJWT, getCategoryData);
router.put('/:id', authenticateJWT, putCategoryData);
router.delete('/:id', authenticateJWT, deleteCategoryData);

export default router;