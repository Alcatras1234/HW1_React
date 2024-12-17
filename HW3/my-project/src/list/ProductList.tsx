import React, { useState, useEffect } from 'react';
import { Pagination, Button } from '@mui/material';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';
import Sidebar from '../SideMenu/Sidebar';

// Типы данных для продуктов и фильтров
interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  quantity: number;
  unit: string;
  imageUrl?: string;
}

interface Filters {
  productName: RegExp | null;
  category: string;
  inStock: boolean;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]); // Все продукты
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]); // Отфильтрованные продукты
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const itemsPerPage = 4; // Количество элементов на странице

  useEffect(() => {
    // Загрузка данных из JSON-файла
    fetch('./src/testdata.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Ошибка загрузки данных');
        }
        return response.json();
      })
      .then((data: Product[]) => {
        setProducts(data);
        setFilteredProducts(data); // Изначально все продукты отображаются
      })
      .catch((error) => {
        console.error('Ошибка при загрузке данных:', error);
      });
  }, []);

  const applyFilters = (filters: Filters) => {
    let filtered = [...products];

    // Фильтр по названию товара (регулярное выражение)
    if (filters.productName) {
      filtered = filtered.filter((product) =>
        filters.productName!.test(product.name)
      );
    }

    // Фильтр по категории
    if (filters.category) {
      filtered = filtered.filter(
        (product) => product.category === filters.category
      );
    }

    // Фильтр "Только в наличии"
    if (filters.inStock) {
      filtered = filtered.filter((product) => product.quantity > 0);
    }

    setFilteredProducts(filtered);
    setCurrentPage(1); // Сброс на первую страницу при фильтрации
  };

  const openModal = (product: Product) => setSelectedProduct(product);
  const closeModal = () => setSelectedProduct(null);

  // Вычисление продуктов для текущей страницы
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <section className="product-list">
      <Button
        variant="outlined"
        onClick={toggleSidebar}
        style={{ marginBottom: '16px' }}
      >
        Открыть фильтры
      </Button>

      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        applyFilters={applyFilters}
      />

      {currentProducts.map((product) => (
        <ProductCard
          key={product.id}
          {...product}
          onClick={() => openModal(product)}
        />
      ))}

      {selectedProduct && (
        <ProductModal {...selectedProduct} onClose={closeModal} />
      )}

      <Pagination
        count={Math.ceil(filteredProducts.length / itemsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}
      />
    </section>
  );
};

export default ProductList;
