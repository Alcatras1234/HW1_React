import React, { useEffect, useState }  from 'react';
import './ProductList.css'; 
import ProductCard from './ProductCard.tsx';
import ProductModal from './ProductModal.tsx';



interface Product {
    id: number;
    name: string;
    description: string;
    category: string;
    quantity: number;
    unit: string;
    imageUrl?: string;
}

const ProductList: React.FC = () => {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        // Загрузка данных из JSON-файла
        fetch('./src/testdata.json')
        .then((response) => {
            if (!response.ok) {
                throw new Error("Ошибка загрузки данных");
            }
            return response.json();
        })
        .then((data: Product[]) => {
            setProducts(data); // Запись данных в состояние
        })
        .catch((error) => {
            console.error("Ошибка при загрузке данных:", error);
        });
    }, []);
      
    const openModal = (product: Product) => setSelectedProduct(product);
    const closeModal = () => setSelectedProduct(null);  
    return(
        <section className='product-list'>
            {products.map((product) => (
                <ProductCard key={product.id}
                {...product}
                onClick={() => openModal(product)}
                 />
            ))}
            {selectedProduct && (
                <ProductModal 
                {...selectedProduct}
                onClose={closeModal}/>
            )}
            
        </section>
    );

}

export default ProductList;