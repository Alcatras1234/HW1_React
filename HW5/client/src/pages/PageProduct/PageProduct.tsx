import { Card, CardContent, Typography, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import {Product} from '../../store/models/productInterface';
import { useNavigate } from 'react-router';
import { handlerPostProduct } from '../../store/axios/enter';

export const ProductDetail = () => {


    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [productHere, setProduct] = useState({
        id: "",
        name: "",
        description: "",
        category: "",
        count: "",
        price: "",
    });

    // Открытие/закрытие диалога
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // Обновление данных товара, если id передан
    useEffect(() => {
        if (productHere) {
            setProduct({
                id: productHere.id,
                name: productHere.name,
                description: productHere.description,
                category: productHere.category,
                count: productHere.count.toString(), // Преобразуем в строку, чтобы передавать в форму
                price: productHere.price.toString(), // Преобразуем в строку, чтобы передавать в форму
            });
        }
    }, [productHere]);

    if (!productHere) {
        return <div>Товар не найден</div>;
    }

    // Обработчик изменений в полях формы
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProduct((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Обработчик отправки формы
    const handleSubmit = () => {
        const newProduct: Product = {
            name: productHere.name,
            description: productHere.description,
            category: productHere.category,
            count: parseInt(productHere.count, 10),
            price: parseInt(productHere.price)
        }
        console.log(newProduct);
        handlerPostProduct(newProduct);
    };

    // const handleDelete = async () => {
    //     await dispatch(deleteProduct(productHere.id));
    //     navigate("/");
    // }

    return (
        <div style={{ padding: '20px' }}>
            <Card>
                <CardContent>
                    <Typography variant="h5">{productHere.name}</Typography>
                    <Typography>{productHere.description}</Typography>
                    <Typography>Категория: {productHere.category}</Typography>
                    <Typography>Количество: {productHere.count}</Typography>
                    <Typography>Цена: {productHere.price}</Typography>
                    <Button variant="outlined" color="secondary" onClick={handleClickOpen}>Редактировать товар</Button>
                 {/*   <Button variant="contained" onClick={handleDelete}>Удалить товар</Button> */}
                </CardContent>
            </Card>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Добавить новый товар</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Название"
                        name="name"
                        value={productHere.name}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Описание"
                        name="description"
                        value={productHere.description}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Категория"
                        name="category"
                        value={productHere.category}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Количество"
                        name="quantity"
                        value={productHere.count}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        type="number"
                    />
                    <TextField
                        label="Цена"
                        name="price"
                        value={productHere.price}
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
            <Button onClick={() => navigate(-1)}>Назад</Button>
        </div>
    );
}
