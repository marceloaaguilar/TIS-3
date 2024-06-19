import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

function Header() {
  const { auth } = useContext(AuthContext);
  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Button color="inherit" component={Link} to="/">
            <img style={{width: '9rem', margin: '1rem'}}src="logo.png"/>
          </Button>
        </Box>
        <Box>
          {auth ? (
            <div>
              <Button color="inherit" style={{fontSize: '1.2rem'}} component={Link} to="/catalogo">Catálogo</Button>
              <Button color="inherit" style={{fontSize: '1.2rem'}} component={Link} to="/meuspedidos">Meus Pedidos</Button>
              <Button color="inherit" style={{fontSize: '1.2rem'}}  component={Link} to="/meuperfil">Meu Perfil</Button>
            </div>
          ) : (
            <Button color="inherit" style={{fontSize: '1.2rem'}}  component={Link} to="/login">Login</Button>
          )}
        </Box>

      </Toolbar>
    </AppBar>
  );
}

export default Header;
