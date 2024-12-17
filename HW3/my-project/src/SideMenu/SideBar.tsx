import React, { useState } from 'react';
import {
  Drawer,
  Stack,
  Button,
  TextField,
  Autocomplete,
  IconButton,
  Checkbox,
  FormControlLabel,
  Typography,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

// Типизация пропсов компонента
interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  applyFilters: (filters: Filters) => void;
  anchor?: 'left' | 'right' | 'top' | 'bottom';
}

// Типизация фильтров
interface Filters {
  productName: string;
  category: string;
  inStock: boolean;
}

// Компонент Sidebar с типизацией
const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar, applyFilters, anchor = 'left' }) => {
  const [filters, setFilters] = useState<Filters>({
    productName: '',
    category: '',
    inStock: false,
  });

  const categories: string[] = ['Категория 1', 'Категория 2', 'Категория 3', 'Категория 4'];

  const handleInputChange = (field: keyof Filters, value: string | boolean) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const resetFilter = (field: keyof Filters) => {
    handleInputChange(field, field === 'inStock' ? false : '');
  };

  const resetAllFilters = () => {
    setFilters({ productName: '', category: '', inStock: false });
  };

  const handleApplyFilters = () => {
    const regex = new RegExp(filters.productName, 'i'); // Регулярное выражение для фильтрации по названию товара
    const appliedFilters = {
      ...filters,
      productName: regex,
    };
    applyFilters(appliedFilters);
    toggleSidebar();
  };

  return (
    <Drawer anchor={anchor} open={isOpen} onClose={toggleSidebar}>
      <aside style={{ width: 300, padding: '16px' }}>
        <Typography variant="h6" gutterBottom>
          Фильтры
        </Typography>
        <Stack spacing={2}>
          {/* Поле Название товара */}
          <TextField
            label="Название товара"
            value={filters.productName}
            onChange={(e) => handleInputChange('productName', e.target.value)}
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => resetFilter('productName')}>
                  <ClearIcon />
                </IconButton>
              ),
            }}
          />

          {/* Поле Категория */}
          <Autocomplete
            options={categories}
            value={filters.category}
            onChange={(e, value) => handleInputChange('category', value || '')}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Категория"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {params.InputProps.endAdornment}
                      <IconButton onClick={() => resetFilter('category')}>
                        <ClearIcon />
                      </IconButton>
                    </>
                  ),
                }}
              />
            )}
          />

          {/* Чекбокс Только в наличии */}
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.inStock}
                onChange={(e) => handleInputChange('inStock', e.target.checked)}
              />
            }
            label="Только в наличии"
          />

          {/* Кнопки управления */}
          <Stack direction="row" spacing={1}>
            <Button variant="contained" color="primary" onClick={handleApplyFilters}>
              Применить
            </Button>
            <Button variant="outlined" color="secondary" onClick={resetAllFilters}>
              Сбросить
            </Button>
          </Stack>
        </Stack>
      </aside>
    </Drawer>
  );
};

export default Sidebar;
