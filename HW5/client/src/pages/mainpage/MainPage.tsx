import { Box, Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, Pagination, TextField, Typography } from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import "./MainPage.css";

export function ProductList() {

    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    const [page, setPage] = useState(1);

    const [product, setProduct] = useState({
        name: "",
        description: "",
        category: "",
        count: "",
        price: "",
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProduct((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }
    const handleSubmit = () => {
        const newProduct: Product = {
            id: Date.now().toString(),
            name: product.name,
            description: product.description,
            category: product.category,
            count: parseInt(product.count, 10),
            price: parseInt(product.price)
        }
        
        setProduct({ name: "", description: "", category: "", quantity: "", price: "" });
    }


    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const itemsPerPage = 3;

    const startIndex = (page - 1) * itemsPerPage;
    const currentItems = items.slice(startIndex, startIndex + itemsPerPage);
    return (
        <>
            <div className="box" id="name">
                <h1>Список товаров</h1>
            </div>

            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Typography sx={{ minWidth: 100 }}>
                    <Button variant="outlined" onClick={handleClickOpen}>Добавить товар</Button>
                </Typography>
            </Box>

            <div style={{ marginTop: '60px' }}>


                {currentItems.map((product) => (
                    <Card key={product.id} style={{ marginBottom: "10px" }}>
                        <CardContent>
                            <Typography variant="h5">{product.name}</Typography>
                            <Typography>{product.description}</Typography>
                            <Typography>Категория: {product.category}</Typography>
                            <Typography>Количество: {product.quantity}</Typography>
                            <Typography>Цена: {product.price}</Typography>
                            <Button variant="text" onClick={() => navigate(`/products/${product.id}`)}>Подробнее</Button>
                        </CardContent>
                    </Card>
                ))}


                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Добавить новый товар</DialogTitle>
                    <DialogContent>
                        <TextField
                            label="Название"
                            name="name"
                            value={product.name}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Описание"
                            name="description"
                            value={product.description}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Категория"
                            name="category"
                            value={product.category}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Количество"
                            name="quantity"
                            value={product.quantity}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                            type="number"
                        />
                        <TextField
                            label="Цена"
                            name="price"
                            value={product.price}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                            type="number"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Отмена
                        </Button>
                        <Button onClick={handleSubmit} color="primary">
                            Сохранить
                        </Button>
                    </DialogActions>
                </Dialog>
                <Pagination count={Math.ceil(items.length / itemsPerPage)} // Число страниц
                    page={page} // Текущая страница
                    onChange={handleChangePage} // Обработчик изменения страницы 
                />
            </div>
        </>
    )
}
