import React, { useState, useEffect } from 'react';
import './styles.css';

interface Player {
  name: string;
  level: number;
}

interface Team {
  players: Player[];
  totalLevel: number;
  isReserve?: boolean;
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

const balanceTeamsByLevel = (players: Player[], playersPerTeam: number): Team[] => {
  if (players.length === 0 || playersPerTeam <= 0) return [];

  // Shuffle players to ensure randomness
  const shuffledPlayers = shuffleArray([...players]);

  const numTeams = Math.floor(shuffledPlayers.length / playersPerTeam);
  const teams: Team[] = Array.from({ length: numTeams }, () => ({ players: [], totalLevel: 0 }));
  const reserveTeam: Team = { players: [], totalLevel: 0, isReserve: true };

  // Sort players by level in descending order
  const sortedPlayers = [...shuffledPlayers].sort((a, b) => b.level - a.level);

  // Shuffle sorted players to add randomness
  const randomizedPlayers = shuffleArray(sortedPlayers);

  // Distribute players to teams with added randomness
  randomizedPlayers.forEach((player) => {
    // Randomly choose a team for the player, or add to reserve team
    const eligibleTeams = teams.filter(team => team.players.length < playersPerTeam);
    if (eligibleTeams.length > 0) {
      const randomTeam = shuffleArray(eligibleTeams)[0];
      randomTeam.players.push(player);
      randomTeam.totalLevel += player.level;
    } else {
      reserveTeam.players.push(player);
      reserveTeam.totalLevel += player.level;
    }
  });

  // Add reserve team if it has players
  if (reserveTeam.players.length > 0) {
    teams.push(reserveTeam);
  }

  return teams;
};


const TeamSorter: React.FC<{ players: Player[]; playersPerTeam: number }> = ({ players, playersPerTeam }) => {
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    const sortedTeams = balanceTeamsByLevel(players, playersPerTeam);
    setTeams(sortedTeams);
  }, [players, playersPerTeam]);

  return (
    <div className="team-sorter">
      <div className="teams-container">
        {teams.map((team, index) => (
          <div key={index} className="team">
            <h2>{team.isReserve ? 'Time reserva' : `Time ${index + 1}`}</h2>
            <table>
              <tbody>
                {team.players.map((player, idx) => (
                  <tr key={idx}>
                    <td>{player.name}</td>
                    <td>{player.level}</td>
                  </tr>
                ))}
                <tr className="team-total-row">
                  <td><b>Nível do time:</b></td>
                  <td><b>{team.totalLevel}</b></td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamSorter;
