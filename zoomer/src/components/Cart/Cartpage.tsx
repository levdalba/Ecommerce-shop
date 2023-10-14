import React, { useContext } from 'react'
import { Typography, Grid } from '@mui/material'
import { CartContext, CartContextType, CartItem } from '../Cart/Cartprovider'

const CartPage = () => {
    const { cartItems, setCartItems } = useContext<CartContextType>(CartContext)

    const handleItemClick = (item: CartItem) => {
        const updatedItems = cartItems.map((cartItem) => {
            if (cartItem.id === item.id) {
                return { ...cartItem, active: !cartItem.active }
            }
            return cartItem
        })
        setCartItems(updatedItems)
    }

    return (
        <div>
            <Typography variant="h4" align="center" gutterBottom>
                Cart
            </Typography>
            {cartItems.length === 0 ? (
                <Typography variant="body1" align="center">
                    Your cart is empty.
                </Typography>
            ) : (
                <Grid container spacing={3}>
                    {cartItems.map((item: CartItem) => (
                        <Grid item xs={12} sm={6} md={4} key={item.id}>
                            <div
                                style={{
                                    border: item.active
                                        ? '2px solid blue'
                                        : '2px solid black',
                                    padding: '10px',
                                    cursor: 'grab', // Change cursor style here
                                }}
                                onClick={() => handleItemClick(item)}
                            >
                                <Typography
                                    variant="h6"
                                    key={`title-${item.id}`}
                                >
                                    {item.title}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    key={`price-${item.id}`}
                                >
                                    {`$${item.price}`}
                                </Typography>
                            </div>
                        </Grid>
                    ))}
                </Grid>
            )}
        </div>
    )
}

export default CartPage
