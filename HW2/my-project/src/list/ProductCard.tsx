import React, { useState }  from 'react';
import './ProductList.css'; 


interface ProductCardProps {
    id: number;
    name: string;
    description: string;
    category: string;
    quantity: number;
    unit: string;
    imageUrl?: string;
    onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, description, category, quantity, unit, imageUrl, onClick }) => {
    return(
        <article className='product-card' onClick={onClick}>
            <div className='product-image'>
                {imageUrl ? <img src={imageUrl} alt={name} /> : <span>Картинка отсутствует</span>}
            </div>
            <h2 className='product-name'>{name}</h2>
            <p className='product-description'>{description}</p>
            <p className='product-category'>{category}</p>
            <p className='product-quantity'>{quantity}</p>
        </article>
    );

}

export default ProductCard;