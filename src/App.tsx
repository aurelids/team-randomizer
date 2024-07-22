import React from 'react'; // Importa a biblioteca React
import './App.css'; // Importa estilos específicos para o componente App
import Home from './pages/Home'
import Header from './components/Header';
import Footer from './components/Footer';


// Define o componente App
const App: React.FC = () => {
  return (
    <div className="App">
      <Header/>
      <main className="Main-content">
      <Home/> 
      </main>
      <Footer/>
    </div>
  );
};

export default App; // Exporta o componente App para ser usado em index.tsx