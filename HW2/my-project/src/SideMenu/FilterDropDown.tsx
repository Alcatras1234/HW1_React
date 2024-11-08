import React from 'react';

const FilterDropdown: React.FC = () => (
    <label>
        Категория товара:
        <select>
            <option value="">Все категории</option>
            <option value="electronics">Электроника</option>
            <option value="clothing">Одежда</option>
            <option value="books">Книги</option>
            {/* Добавьте категории по необходимости */}
        </select>
    </label>
);

export default FilterDropdown;