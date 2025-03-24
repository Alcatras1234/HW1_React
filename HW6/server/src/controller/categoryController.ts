import express from 'express';
import { addCategory, deleteCategoryData, getCategoriesData, getCategoryData, putCategoryData } from '../service/categoryService';

const router = express.Router();

router.use(express.json());

export const categoryController = {
     addCategory: addCategory,
     getCategories: getCategoriesData,
     getCategory: getCategoryData,
     putCategory: putCategoryData,
     deleteCategory: deleteCategoryData
}

router.post('/', addCategory);
router.get('/', getCategoriesData);
router.get('/:id', getCategoryData);
router.put('/:id', putCategoryData);
router.delete('/:id', deleteCategoryData);

export default router;