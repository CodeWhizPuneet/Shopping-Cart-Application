import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import {
  AppBar,
  Badge,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  Toolbar,
  Typography,
  Alert,
  CircularProgress,
  TextField
} from "@mui/material";
import { addToCart, clearCart, removeFromCart, updateQuantity } from "./store/cartSlice";

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");
const PRODUCTS_ENDPOINT = `${API_BASE_URL}/api/products`;

const formatINR = (amount) => new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0
}).format(amount);

function App() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [productError, setProductError] = useState("");
  const [createLoading, setCreateLoading] = useState(false);
  const [createMessage, setCreateMessage] = useState({ type: "", text: "" });
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: ""
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoadingProducts(true);
        const response = await axios.get(PRODUCTS_ENDPOINT);
        setProducts(response.data);
        setProductError("");
      } catch {
        setProductError("Unable to load products from backend.");
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, []);

  const itemCount = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  const grandTotal = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cartItems]);

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddProduct = async (event) => {
    event.preventDefault();
    setCreateMessage({ type: "", text: "" });

    try {
      setCreateLoading(true);
      const response = await axios.post(PRODUCTS_ENDPOINT, {
        ...formData,
        price: Number(formData.price)
      });

      setProducts((prev) => [...prev, response.data]);
      setCreateMessage({ type: "success", text: "Product added successfully." });
      setFormData({
        name: "",
        description: "",
        price: "",
        image: ""
      });
    } catch (error) {
      setCreateMessage({
        type: "error",
        text: error.response?.data?.message || "Unable to add product."
      });
    } finally {
      setCreateLoading(false);
    }
  };

  return (
    <Box>
      <AppBar position="sticky" elevation={0}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Redux Shopping Cart
          </Typography>
          <Badge color="secondary" badgeContent={itemCount} showZero>
            <AddShoppingCartIcon />
          </Badge>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" sx={{ mb: 1, fontWeight: 700 }}>
          Experiment 2.3.2
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 4 }}>
          Redux Toolkit cart with add, remove, quantity update, and localStorage persistence.
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Products
            </Typography>
            {loadingProducts && (
              <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
                <CircularProgress />
              </Box>
            )}
            {!!productError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {productError}
              </Alert>
            )}
            <Grid container spacing={2}>
              {products.map((product) => (
                <Grid key={product.id} item xs={12} sm={6}>
                  <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                    <CardMedia
                      component="img"
                      height="160"
                      image={product.image}
                      alt={product.name}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6">{product.name}</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {product.description}
                      </Typography>
                      <Chip label={formatINR(product.price)} color="primary" size="small" />
                    </CardContent>
                    <CardActions>
                      <Button
                        fullWidth
                        variant="contained"
                        onClick={() => dispatch(addToCart(product))}
                      >
                        Add To Cart
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Paper elevation={2} sx={{ p: 3, mt: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Add New Product
              </Typography>

              {!!createMessage.text && (
                <Alert severity={createMessage.type || "info"} sx={{ mb: 2 }}>
                  {createMessage.text}
                </Alert>
              )}

              <Box component="form" onSubmit={handleAddProduct}>
                <Stack spacing={2}>
                  <TextField
                    label="Product Name"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    required
                    fullWidth
                  />
                  <TextField
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleFormChange}
                    required
                    fullWidth
                    multiline
                    minRows={2}
                  />
                  <TextField
                    label="Price"
                    name="price"
                    type="number"
                    inputProps={{ min: 1 }}
                    value={formData.price}
                    onChange={handleFormChange}
                    required
                    fullWidth
                  />
                  <TextField
                    label="Image URL"
                    name="image"
                    value={formData.image}
                    onChange={handleFormChange}
                    required
                    fullWidth
                  />
                  <Button type="submit" variant="contained" disabled={createLoading}>
                    {createLoading ? "Adding..." : "Add Product"}
                  </Button>
                </Stack>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={5}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="h6">Cart</Typography>
                <Button
                  color="error"
                  size="small"
                  onClick={() => dispatch(clearCart())}
                  disabled={!cartItems.length}
                >
                  Clear Cart
                </Button>
              </Stack>
              <Divider sx={{ my: 2 }} />

              {!cartItems.length && (
                <Typography color="text.secondary">No items in cart.</Typography>
              )}

              <Stack spacing={2}>
                {cartItems.map((item) => (
                  <Paper key={item.id} variant="outlined" sx={{ p: 2 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Box>
                        <Typography sx={{ fontWeight: 600 }}>{item.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {formatINR(item.price)} each
                        </Typography>
                      </Box>
                      <IconButton
                        color="error"
                        onClick={() => dispatch(removeFromCart(item.id))}
                        aria-label={`remove ${item.name}`}
                      >
                        <DeleteOutlineIcon />
                      </IconButton>
                    </Stack>

                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1 }}>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() =>
                          dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))
                        }
                      >
                        -
                      </Button>
                      <Typography sx={{ minWidth: 24, textAlign: "center" }}>
                        {item.quantity}
                      </Typography>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() =>
                          dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))
                        }
                      >
                        +
                      </Button>
                      <Typography sx={{ ml: "auto", fontWeight: 600 }}>
                        {formatINR(item.quantity * item.price)}
                      </Typography>
                    </Stack>
                  </Paper>
                ))}
              </Stack>

              <Divider sx={{ my: 2 }} />
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography sx={{ fontWeight: 700 }}>Total</Typography>
                <Typography variant="h6" color="secondary" sx={{ fontWeight: 700 }}>
                  {formatINR(grandTotal)}
                </Typography>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default App;
