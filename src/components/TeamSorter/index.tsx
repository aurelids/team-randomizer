import React, { useState, useEffect } from 'react';
import './styles.css';

interface Player {
  name: string;
  level: number;
}

interface Team {
  players: Player[];
  totalLevel: number;
}

const sortPlayersIntoTeams = (players: Player[], playersPerTeam: number): Team[] => {
  const numTeams = Math.ceil(players.length / playersPerTeam);
  const teams: Team[] = Array.from({ length: numTeams }, () => ({ players: [], totalLevel: 0 }));

  // Ordena jogadores por nível (decrescente) para distribuir os melhores primeiro
  const sortedPlayers = [...players].sort((a, b) => b.level - a.level);

  // Distribui jogadores nos times tentando balancear a média de níveis
  sortedPlayers.forEach((player, index) => {
    const teamIndex = index % numTeams; // Distribui jogadores ciclicamente
    teams[teamIndex].players.push(player);
    teams[teamIndex].totalLevel += player.level;
  });

  return teams;
};

const TeamSorter: React.FC<{ playersText: string; playersPerTeam: number }> = ({ playersText, playersPerTeam }) => {
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    const players = playersText.split('\n').map(line => {
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

    const sortedTeams = sortPlayersIntoTeams(players, playersPerTeam);
    setTeams(sortedTeams);
  }, [playersText, playersPerTeam]);

  return (
    <div className="team-sorter">
      <div className="teams-container">
        {teams.map((team, index) => (
          <div key={index} className="team">
            <h2>Time {index + 1}</h2>
            <table>
              <tbody>
                {team.players.map((player, idx) => (
                  <tr key={idx}>
                    <td>{player.name}</td>
                    <td>{player.level}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamSorter;
