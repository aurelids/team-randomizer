import React from 'react'; // Importa a biblioteca React
import './App.css'; // Importa estilos específicos para o componente App
import Home from './pages/Home'


// Define o componente App
const App: React.FC = () => {
  return (
    <div className="App">
      <Home/> 
    </div>
  );
};

export default App; // Exporta o componente App para ser usado em index.tsx