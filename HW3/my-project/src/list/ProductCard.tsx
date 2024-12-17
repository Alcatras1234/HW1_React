import React, { useState }  from 'react';
import {Card, CardActions, CardContent, Button, CardMedia, Typography, CardActionArea} from '@mui/material'



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
        <Card
        sx={{
            width: 300,
            m: 2,
            cursor: "pointer",
            transition: "transform 0.3s",
            "&:hover": {
              transform: "scale(1.1)",
            },
          }}
          onClick={onClick}
        >
            <CardActionArea>
        {/* Изображение */}
        <CardMedia
          component="img"
          height="140"
          image={imageUrl || "https://via.placeholder.com/300"}
          alt={name}
        />
        {/* Содержимое карточки */}
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" noWrap>
            {category}
          </Typography>
          <Typography variant="body1" color="textPrimary">
            {quantity} {unit}
          </Typography>
        </CardContent>
        {/* Дополнительные действия (опционально) */}
        <CardActions>
          <Typography variant="body2" noWrap>
            {description}
          </Typography>
        </CardActions>
      </CardActionArea>
    </Card>
    );

}

export default ProductCard;