import React, { useState } from 'react';
import './styles.css';
import TeamSorter from '../../components/TeamSorter';

interface Player {
  name: string;
  level: number;
}

const shuffleArray = <T,>(array: T[]): T[] => {
  let currentIndex = array.length, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
};

const Home: React.FC = () => {
  const [text, setText] = useState(''); // Estado para controlar o texto do campo
  const [numPlayers, setNumPlayers] = useState(1); // Estado para controlar o número de jogadores por equipe
  const [players, setPlayers] = useState<Player[]>([]); // Estado para armazenar a lista de jogadores

  const handleSort = () => {
    const newPlayers = text.split('\n').map(line => {
      const [name, level] = line.split('[');
      if (name && level) {
        const levelNumber = parseInt(level.replace(']', '').trim(), 10);
        return {
          name: name.trim(),
          level: !isNaN(levelNumber) ? levelNumber : 0
        };
      }
      return null;
    }).filter(player => player !== null) as Player[];

    // Embaralha a lista de jogadores
    const shuffledPlayers = shuffleArray(newPlayers);
    setPlayers(shuffledPlayers);
  };

  return (
    <div className="home-container">
      <div className="content">
        <div className="left-content">
          <h1 className="title">Jogadores</h1>
          <div className="input-container">
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
          <div className="subtitles-container">
            <label className="subtitle">Nº de jogadores por equipe:</label>
            <input
              type="number"
              className="number-input"
              value={numPlayers}
              onChange={(e) => setNumPlayers(Number(e.target.value))}
              min="1"
            />
          </div>
          <button className="parse-button" onClick={handleSort}>Sortear</button>
        </div>
        <div className="vertical-divider"></div>
        <div className="right-content">
          <TeamSorter players={players} playersPerTeam={numPlayers} />
        </div>
      </div>
    </div>
  );
};

export default Home;
