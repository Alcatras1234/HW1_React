import React, { useState }  from 'react';
import './ProductList.css'; 


interface ProductModalProps {
    id: number;
    name: string;
    description: string;
    category: string;
    quantity: number;
    unit: string;
    imageUrl?: string;
    onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ name, description, category, quantity, unit, imageUrl, onClose }) => {
    return (
        <div className="modal-overlay" onClick={onClose}>
          <div className="product-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={onClose}>Закрыть</button>
            <div className="modal-content">
              {imageUrl ? <img src={imageUrl} alt={name} /> : <span>Картинка отсутствует</span>}
              <h2>{name}</h2>
              <p>{description}</p>
              <p>Категория: {category}</p>
              <p>Количество: {quantity} {unit}</p>
            </div>
          </div>
        </div>
      );

}

export default ProductModal;