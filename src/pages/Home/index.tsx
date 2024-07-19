// src/pages/home/index.tsx

import React, { useState } from 'react'; // Importa a biblioteca React e useState
import Header from '../../components/Header'; // Importa o componente Header
import Footer from '../../components/Footer'; // Importa o componente Footer
import './styles.css'; // Importa estilos específicos para a página inicial

// Define o componente Home
const Home: React.FC = () => {
  const [text, setText] = useState(''); // Estado para controlar o texto do campo

  return (
    <div className="home-container"> {/* Container principal da página inicial */}
      <Header /> {/* Renderiza o componente Header */}
      <div className="content">
        
        <h1 className="title">Jogadores</h1> {/* Título acima do campo de texto */}
        <textarea
          className="text-field"
          placeholder="Insira os jogadores e seus respectivos níveis conforme ilustrado abaixo:
          1- Jogador [Nível aqui]
          2- Jogador [10]
          3- Jogador [5]
          4- Jogador [7]
          5- Jogador [8]
          .
          .
          ."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        
      </div>
      <Footer /> {/* Renderiza o componente Footer */}
    </div>
  );
};

export default Home; // Exporta o componente Home para ser usado em App.tsx