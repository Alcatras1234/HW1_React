import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";

interface ProductModalProps {
  product: {
    id: number;
    name: string;
    description: string;
    category: string;
    quantity: number;
    unit: string;
    imageUrl?: string;
  };
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({
  name,
  description,
  category,
  quantity,
  unit,
  imageUrl,
  onClose,
}) => {
  return (
    <Dialog
      open={true}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: 4,
        },
      }}
    >
      <DialogTitle>
        {name}
        <Button
          onClick={onClose}
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          ✖
        </Button>
      </DialogTitle>
      <DialogContent dividers>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          {/* Изображение товара */}
          {imageUrl ? (
            <Box
              component="img"
              src={imageUrl}
              alt={name}
              sx={{
                maxWidth: "100%",
                maxHeight: 300,
                objectFit: "cover",
                borderRadius: 2,
              }}
            />
          ) : (
            <Typography variant="body2" color="textSecondary">
              Изображение отсутствует
            </Typography>
          )}

          {/* Информация о продукте */}
          <Typography variant="body1">
            <strong>Описание:</strong> {description}
          </Typography>
          <Typography variant="body1">
            <strong>Категория:</strong> {category}
          </Typography>
          <Typography variant="body1">
            <strong>Количество:</strong> {quantity} {unit}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" variant="contained">
          Закрыть
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductModal;
