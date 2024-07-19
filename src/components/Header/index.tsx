import React from 'react'; // Importa a biblioteca React
import {Typography, Box } from '@mui/material'; // Importa componentes do MUI
import './styles.css'; // Importa estilos específicos para o Header
import ball from '../../assets/ball.png'

// Define o componente Header
const Header: React.FC = () => {
  return (
        <Box className="header"> {/* Aplica a classe de estilo 'header-content' */}
          <img src={ball} alt="Logo" className="header-logo" /> {/* Aplica a classe de estilo 'header-logo' */}
          <Typography variant="h2" className="header-title">
            Team Randomizer
          </Typography>
        </Box>
  );
};

export default Header; // Exporta o componente Header para ser usado em App.tsx
