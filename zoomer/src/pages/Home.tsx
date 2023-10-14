import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import {
    Typography,
    Grid,
    Card,
    CardActionArea,
    CardContent,
    CardActions,
    Button,
    Box,
} from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Link } from 'react-router-dom'
import Carousel from 'react-material-ui-carousel'
import { makeStyles } from '@mui/styles'
import { AddShoppingCart } from '@mui/icons-material'
import { CustomCarousel } from '../components/Navbar/Carousel'

const theme = createTheme()

const useStyles = makeStyles(() => ({
    card: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: '100%',
    },
    productsContainer: {
        margin: '0 auto',
        maxWidth: 960,
        padding: '0 16px',
    },
}))

interface Product {
    id: number
    title: string
    description: string
    images: string[]
    brand: string
    category: string
    price: number
    amount: number
}

export const Home = () => {
    const [cartItems, setCartItems] = useState<Product[]>([])
    const classes = useStyles()
    const [products, setProducts] = useState<Product[]>([])
    const cardRef = useRef<HTMLDivElement>(null)

    const [page, setPage] = useState(1)

    useEffect(() => {
        fetchProducts({ pageSize: 20, pageNumber: page })
    }, [page])
    useEffect(() => {
        calculateCardHeight()
        window.addEventListener('resize', calculateCardHeight)
        return () => {
            window.removeEventListener('resize', calculateCardHeight)
        }
    }, [products])

    const handleAddToCart = (product: Product) => {
        const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]')
        const existingItem = cartItems.find(
            (item: Product) => item.id === product.id
        )
        if (existingItem) {
            existingItem.quantity += 1
        } else {
            cartItems.push({ ...product, quantity: 1 })
        }
        localStorage.setItem('cartItems', JSON.stringify(cartItems))
        setCartItems([...cartItems, product])
        toast.success('Product added to cart!')
    }

    const fetchProducts = async ({
        pageSize,
        pageNumber,
    }: {
        pageSize: number
        pageNumber: number
    }) => {
        try {
            const response = await axios.post(
                'http://localhost:8080/products',
                {
                    keyword: 'laptop',
                    page_size: pageSize,
                    page_number: pageNumber,
                }
            )
            const data = response.data

            if (Array.isArray(data)) {
                setProducts([...products, ...data])
            } else if (data && typeof data === 'object') {
                const productsArray = data.products
                if (Array.isArray(productsArray)) {
                    setProducts([...products, ...productsArray])
                } else {
                    console.error(
                        'Invalid response format: Products array not found'
                    )
                }
            } else {
                console.error(
                    'Invalid response format: Expected an array or object'
                )
            }
        } catch (error) {
            console.error('Error fetching products:', error)
        }
    }
    const truncateTitle = (title: string) => {
        const words = title.split(' ')
        if (words.length > 4) {
            return words.slice(0, 4).join(' ') + '...'
        }
        return title
    }

    const calculateCardHeight = () => {
        if (cardRef.current) {
            const cardWidth = cardRef.current.offsetWidth
            const cardHeight = Math.floor(cardWidth * 1.4)
            cardRef.current.style.height = `${cardHeight}px`
        }
    }

    const handleFetchMore = () => {
        const pageSize = 20
        const pageNumber = Math.ceil(products.length / pageSize) + 1
        console.log('pageSize:', pageSize)
        console.log('pageNumber:', pageNumber)
        fetchProducts({ pageSize, pageNumber })
    }

    return (
        <ThemeProvider theme={theme}>
            <div>
                <CustomCarousel />
                <div className={classes.productsContainer}>
                    <Grid container spacing={2} justifyContent="center">
                        {products.map((product) => (
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                md={4}
                                lg={3}
                                padding={'10px'}
                                key={product.id}
                                bgcolor={'#f5f5f5'}
                            >
                                <Card className={classes.card} ref={cardRef}>
                                    <CardActionArea
                                        component={Link}
                                        to={`/products/${product.id}`}
                                    >
                                        <Carousel>
                                            {product.images.map(
                                                (image, index) => (
                                                    <img
                                                        src={image}
                                                        alt={`Product ${index}`}
                                                        key={index}
                                                        style={{
                                                            objectFit: 'cover',
                                                            width: '100%',
                                                        }}
                                                    />
                                                )
                                            )}
                                        </Carousel>
                                        <CardContent>
                                            <Typography variant="h6">
                                                {truncateTitle(product.title)}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="textSecondary"
                                            >
                                                {product.brand}
                                            </Typography>
                                            <Typography
                                                variant="subtitle1"
                                                color="textSecondary"
                                            >
                                                ${product.price}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            startIcon={<AddShoppingCart />}
                                            component={Link}
                                            onClick={() =>
                                                handleAddToCart(product)
                                            }
                                            to={`/`}
                                            fullWidth
                                        >
                                            Add to Cart
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                    <Box textAlign="center">
                        <Button onClick={handleFetchMore} variant="outlined">
                            Show more{' '}
                        </Button>
                    </Box>
                </div>
            </div>
        </ThemeProvider>
    )
}

export default Home
