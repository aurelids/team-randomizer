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

const sortPlayersIntoTeams = (players: Player[], playersPerTeam: number): Team[] => {
  const teams: Team[] = [];
  let currentTeam: Player[] = [];
  let totalLevel = 0;

  players.forEach((player, index) => {
    currentTeam.push(player);
    totalLevel += player.level;

    if (currentTeam.length === playersPerTeam || index === players.length - 1) {
      teams.push({ players: currentTeam, totalLevel });
      currentTeam = [];
      totalLevel = 0;
    }
  });

  // If the last team is not complete, it becomes the reserve team
  if (teams[teams.length - 1].players.length < playersPerTeam) {
    const reserveTeam = teams.pop();
    if (reserveTeam) {
      teams.push({ ...reserveTeam, isReserve: true });
    }
  }

  return teams;
};

const TeamSorter: React.FC<{ players: Player[]; playersPerTeam: number }> = ({ players, playersPerTeam }) => {
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    const sortedTeams = sortPlayersIntoTeams(players, playersPerTeam);
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
