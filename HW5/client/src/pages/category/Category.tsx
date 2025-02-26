// import { Box, Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, Pagination, TextField, Typography } from "@mui/material";
// import React, { ChangeEvent, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";


// export function CategoryList() {
//     const items = useSelector((state: RootState) => state.category.items);
//     const dispatch = useDispatch();

//     const [open, setOpen] = useState(false);
//     const [openEdit, setOpenEdit] = useState(false);
//     const [page, setPage] = useState(1);
//     const [category, setCategory] = useState({
//         id: "",
//         name: "",
//     });

//     // Открытие модального окна для добавления категории
//     const handleClickOpen = () => {
//         setCategory({ id: "", name: "" }); // Сбросить форму перед добавлением
//         setOpen(true);
//     };

//     const handleClose = () => {
//         setOpen(false);
//     };

//     // Открытие модального окна для редактирования категории
//     const handleClickOpenEdit = (categoryToEdit: Category) => {
//         setCategory(categoryToEdit); // Заполняем форму для редактирования
//         setOpenEdit(true);
//     };

//     const handleCloseEdit = () => {
//         setOpenEdit(false);
//     };

//     const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         setCategory((prevState) => ({
//             ...prevState,
//             [name]: value,
//         }));
//     };

//     // Добавление новой категории
//     const handleSubmit = () => {
//         const newCategory: Category = {
//             id: Date.now().toString(),
//             name: category.name,
//         };
//         dispatch(addCategory(newCategory));
//         handleClose();
//         setCategory({ id: "", name: "" });
//     };

//     // Редактирование категории
//     const handleSubmitEdit = () => {
//         const updatedCategory: Category = {
//             id: category.id,
//             name: category.name,
//         };
//         dispatch(updateCategory(updatedCategory));
//         handleCloseEdit();
//         setCategory({ id: "", name: "" });
//     };

//     // Обработка изменения страницы пагинации
//     const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
//         setPage(value);
//     };

//     const itemsPerPage = 3;
//     const startIndex = (page - 1) * itemsPerPage;
//     const currentItems = items.slice(startIndex, startIndex + itemsPerPage);

//     // Удаление категории
//     const handleDelete = (categoryId: string) => {
//         dispatch(deleteCategory(categoryId));
//     };

//     return (
//         <>
//             <div className="box" id="name">
//                 <h1>Список категорий</h1>
//             </div>

//             <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
//                 <Typography sx={{ minWidth: 100 }}>
//                     <Button variant="outlined" onClick={handleClickOpen}>Добавить Категорию</Button>
//                 </Typography>
//             </Box>

//             <div style={{ marginTop: '60px' }}>
//                 {currentItems.map((category) => (
//                     <Card key={category.id} style={{ marginBottom: "10px" }}>
//                         <CardContent>
//                             <Typography variant="h5">{category.name}</Typography>
//                             <Button
//                                 variant="outlined"
//                                 color="secondary"
//                                 onClick={() => handleDelete(category.id)}
//                             >
//                                 Удалить Категорию
//                             </Button>
//                             <Button
//                                 variant="outlined"
//                                 color="primary"
//                                 onClick={() => handleClickOpenEdit(category)}
//                             >
//                                 Редактировать Категорию
//                             </Button>
//                         </CardContent>
//                     </Card>
//                 ))}


//                 <Dialog open={open} onClose={handleClose}>
//                     <DialogTitle>Добавить новую категорию</DialogTitle>
//                     <DialogContent>
//                         <TextField
//                             label="Название"
//                             name="name"
//                             value={category.name}
//                             onChange={handleInputChange}
//                             fullWidth
//                             margin="normal"
//                         />
//                     </DialogContent>
//                     <DialogActions>
//                         <Button onClick={handleClose} color="primary">
//                             Отмена
//                         </Button>
//                         <Button onClick={handleSubmit} color="primary">
//                             Сохранить
//                         </Button>
//                     </DialogActions>
//                 </Dialog>


//                 <Dialog open={openEdit} onClose={handleCloseEdit}>
//                     <DialogTitle>Редактировать категорию</DialogTitle>
//                     <DialogContent>
//                         <TextField
//                             label="Название"
//                             name="name"
//                             value={category.name}
//                             onChange={handleInputChange}
//                             fullWidth
//                             margin="normal"
//                         />
//                     </DialogContent>
//                     <DialogActions>
//                         <Button onClick={handleCloseEdit} color="primary">
//                             Отмена
//                         </Button>
//                         <Button onClick={handleSubmitEdit} color="primary">
//                             Сохранить изменения
//                         </Button>
//                     </DialogActions>
//                 </Dialog>

//                 <Pagination
//                     count={Math.ceil(items.length / itemsPerPage)}
//                     page={page}
//                     onChange={handleChangePage}
//                 />
//             </div>
//         </>
//     );
// }
