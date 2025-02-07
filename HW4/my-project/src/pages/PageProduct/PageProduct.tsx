import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../../store/Store.tsx";
import { useNavigate, useParams } from 'react-router';
import { Card, CardContent, Typography, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { deleteProduct, Product, updateProduct } from '../../store/slice/ProductSlice.tsx';

export const ProductDetail = () => {
    const { Id } = useParams();
    console.log(Id)
    const product = useSelector((state: RootState) =>
        state.product.items.find((item) => item.id === Id)
    );
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [open, setOpen] = useState(false);
    const [productHere, setProduct] = useState({
        id: "",
        name: "",
        description: "",
        category: "",
        quantity: "",
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
        if (product) {
            setProduct({
                id: product.id,
                name: product.name,
                description: product.description,
                category: product.category,
                quantity: product.quantity.toString(), // Преобразуем в строку, чтобы передавать в форму
                price: product.price.toString(), // Преобразуем в строку, чтобы передавать в форму
            });
        }
    }, [product]);

    if (!product) {
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
            id: productHere.id,
            name: productHere.name,
            description: productHere.description,
            category: productHere.category,
            quantity: parseInt(productHere.quantity, 10),
            price: parseInt(productHere.price)
        }
        dispatch(updateProduct(newProduct));

        handleClose();
    };

    const handleDelete = async () => {
        await dispatch(deleteProduct(productHere.id));
        navigate("/");
    }

    return (
        <div style={{ padding: '20px' }}>
            <Card>
                <CardContent>
                    <Typography variant="h5">{product.name}</Typography>
                    <Typography>{product.description}</Typography>
                    <Typography>Категория: {product.category}</Typography>
                    <Typography>Количество: {product.quantity}</Typography>
                    <Typography>Цена: {product.price}</Typography>
                    <Button variant="outlined" color="secondary" onClick={handleClickOpen}>Редактировать товар</Button>
                    <Button variant="contained" onClick={handleDelete}>Удалить товар</Button>
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
                        value={productHere.quantity}
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
