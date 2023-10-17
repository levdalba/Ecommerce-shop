import React, { useContext } from 'react'
import { Typography, Grid, Button } from '@mui/material'
import { CartContext, CartContextType, CartItem } from '../Cart/CartProvider'

const CartPage = () => {
    const { cartItems, setCartItems } = useContext<CartContextType>(CartContext)

    const handleRemoveItem = (itemId: number) => {
        const updatedItems = cartItems.filter(
            (cartItem) => cartItem.id !== itemId
        )
        setCartItems(updatedItems)
    }

    const truncateTitle = (title: string) => {
        if (title.length > 20) {
            return title.substring(0, 20) + '...'
        }
        return title
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
                <Grid item container xs={12} sm={6} md={4} lg={3} spacing={3}>
                    {cartItems.map((item: CartItem, index: number) => (
                        <Grid
                            container
                            gridTemplateRows={'50px'}
                            item
                            key={item.id}
                        >
                            <Typography
                                variant="h6"
                                sx={{
                                    padding: '10px',
                                    cursor: 'grab',
                                }}
                            >
                                <img
                                    src={item.images[0]}
                                    alt={`Product ${index}`}
                                    style={{
                                        maxHeight: '100px',
                                    }}
                                />
                                <Typography variant="h6">
                                    {truncateTitle(item.title)}
                                </Typography>
                                <Typography variant="body1">{`$${item.price}`}</Typography>
                                <Button
                                    onClick={() => handleRemoveItem(item.id)}
                                >
                                    Remove
                                </Button>
                            </Typography>
                        </Grid>
                    ))}
                </Grid>
            )}
        </div>
    )
}

export default CartPage
