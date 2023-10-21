import React, { useContext } from 'react'
import {
    IconButton,
    Badge,
    Typography,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Divider,
} from '@mui/material'
import { ShoppingCart } from '@mui/icons-material'
import { useHistory } from 'react-router-dom'
import { CartContext, CartItem } from '../Cart/CartProvider'
import CartPage from '../Cart/Cartpage'

export const CartButton = ({ itemCount }: { itemCount: number }) => {
    const history = useHistory()
    const { cartItems } = useContext(CartContext)

    const CartPage = () => {
        history.push('/cart')
    }

    return (
        <>
            <div className="cart">
                <IconButton
                    edge="end"
                    aria-label="shopping cart"
                    aria-controls="shopping-cart-menu"
                    aria-haspopup="true"
                    color="inherit"
                    onClick={CartPage}
                >
                    <Badge badgeContent={itemCount} color="error">
                        <ShoppingCart />
                    </Badge>
                </IconButton>
                <Typography
                    sx={{ marginLeft: '0.5rem', marginTop: '1rem' }}
                    variant="subtitle1"
                    color="inherit"
                    align="right"
                >
                    0 ₾
                </Typography>
            </div>
        </>
    )
}
