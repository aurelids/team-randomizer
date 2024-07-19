import React from 'react'; // Importa o React para definir o componente
import './styles.css';    // Importa os estilos específicos para o Footer

// Define o componente Footer como um componente funcional
const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <p>&copy; 2024 Team Randomizer. All rights reserved.</p> {/* Texto do rodapé */}
    </footer>
  );
};

export default Footer; // Exporta o componente Footer para ser usado em outros lugares
