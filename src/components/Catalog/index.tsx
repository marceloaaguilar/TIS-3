import axios from "axios";
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Accordion from "react-bootstrap/Accordion";
import Box from '@mui/material/Box';
import CardMui from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import ButtonMui from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { CatalogProducts } from "../../interfaces/CatalogProducts";
import { CartProducts } from "../../interfaces/CartProducts";
import { Product } from "../../interfaces/Product";
import Swal from 'sweetalert2';
import WhatsappBtn from "../WhatsappBtn";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import "./catalog.css";


const Catalogo = () => {
  const [catalogProducts, setCatalogProducts] = useState<CatalogProducts>([]);
  const [cartProducts, setCartProducts] = useState<CartProducts>([]);
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/product/list`).then((res) => {
      setCatalogProducts(res.data);
      var cartData = localStorage.getItem('cart');
      if (cartData != undefined)
        setCartProducts(JSON.parse(cartData));
      
    });
  }, [catalogProducts === undefined ]);



  useEffect(() => {
    if (cartProducts.length > 0){
      localStorage.setItem('cart', JSON.stringify(cartProducts));
    }
  }, [cartProducts]);

  
  const processaCarrinho = (product:Product, quantity: number) => {
    var productExist = 'N'
    cartProducts.forEach((element)=> {
      if(element.product.id == product.id || cartProducts.length > 0){
        Swal.fire("Produto já adicionado ao carrinho!");
        productExist = 'S'
      }
    })
    
    const productPrice = quantity * product.price;
    if (productExist === 'N'){
      setCartProducts([...cartProducts, {product: product, quantity: 1, total: productPrice}])
      Swal.fire("Produto adicionado ao carrinho!");

    }
  } 
  
  const redirect = () => {
    navigate('/checkout')
  }



  return (
    <div style={{height: '100vh'}}>
      <Container style={{marginTop: '6rem', marginBottom: '1rem'}}>
        <h2 style={{fontSize: '2.5rem', marginBottom: '2rem'}}>Confira o catálogo de produtos</h2>
        <Row>
          {catalogProducts.map((product) => {
            return (
              <Card key={product.id} style={{ width: "25rem", zIndex: '0'}} className="m-3">
                <Card.Img variant="top" src={'data:image/png;base64,' + product.image} style={{backgroundColor: '#FAFAFA',height: '20rem',  padding: '2rem', objectFit: 'cover'}}/>
                <Card.Body style={{display: "flex", justifyContent: "space-between", padding: '2rem'}}>
                  <div>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>
                      <b>Preço:</b> R$ {product.price} <br/> <b>Peso:</b> {product.weight}g
                    </Card.Text>
                  </div>
                  <div style={{display: 'flex', justifyContent: 'end'}}>
                    <AddShoppingCartIcon id="btn-carrinho" style={{backgroundColor: "#1976D2", cursor: "pointer", fontSize: '5rem', color: "white", padding: '0.5rem', borderRadius: '30px'}} onClick={() => processaCarrinho(product, quantity)}/>
                  </div>
                </Card.Body>
              </Card>
            )
          })}
        </Row> 
      </Container>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "end",
          alignItems: "end",
          zIndex: "3000",
        }}
        className="cartProducts">
        <Accordion
          defaultActiveKey={["1"]}
          style={{ width: "25rem", margin: "0", flexWrap: "nowrap", position: "fixed", bottom: '0'}}>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Carrinho</Accordion.Header>
            <Accordion.Body>
              {cartProducts.length !== 0 ? cartProducts.map(element => ( 
                <CardMui sx={{ display: 'flex',marginTop: '1rem', alignItems: 'center'}} key={element.product.id}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                      <Typography component="div" variant="h5">
                        {element.product.name}
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary" component="div">
                        R$ {element.product.price}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <div style={{display: 'grid'}}>
                          <Typography component="div">Quantidade: {`${element.quantity}`}</Typography>
                        <Button  variant="text" onClick={() => {
                          setCartProducts(cartProducts.filter(a => a.product.id !== element.product.id))
                        }}>Excluir
                        </Button>
                      </div>
                  </CardActions>
                  </Box>
                <CardMedia style={{maxWidth: '8rem', margin: '1rem'}}
                  component='img'
                  src={`data:image/png;base64, ${element.product.image}`}
                />
              </CardMui>
              )): <p style={{fontStyle: "italic"}}>Carrinho vazio!</p>}
              <> {cartProducts.length == 0 ? '' :
                <div style={{width: '100%', justifyContent:'center', display: 'flex'}}>
                  <ButtonMui style={{marginTop: '2rem', width: '22rem', backgroundColor: '#05A100'}} onClick={redirect} variant="contained">Concluir Pedido</ButtonMui>
                </div>
                 }
              </>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
};

export default Catalogo;
