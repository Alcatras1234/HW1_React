import React from 'react';

const FilterInput: React.FC = () => (
    <div className='filter-input'>
        <label className='filter-input-label'>
        Поиск по названию:
            <input className='.text-field__input' type="text" placeholder="Введите название" />
        </label>
    </div>
);

export default FilterInput;