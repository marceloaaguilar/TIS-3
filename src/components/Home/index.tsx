import { Typography, Button } from '@mui/material';
import WhatsappBtn from '../WhatsappBtn';

const Home = () => {
  return (
    <div>
      <WhatsappBtn/>
        <div style={{ alignItems: "center", display: "flex", textAlign:"left", backgroundImage: 'url(jars-with-berries.png)', backgroundSize: '100%', height: '100vh', objectFit: 'cover', objectPosition: '40% 30%', opacity: '100%'}}>
          <div style={{marginLeft: "5rem"}}>
            <Typography style={{fontSize: '3rem', fontWeight: '700', color: "#FFFFFF"}}>Conheça Nossos Novos Sabores!</Typography>
            <Button variant="contained" style={{fontSize: '1.5rem', backgroundColor:"#FFA800", color: '#000000', fontWeight: '800'}} href='/catalogo'>Conheça já</Button>

          </div>
        </div>
  </div>
  )
} 

export default Home;