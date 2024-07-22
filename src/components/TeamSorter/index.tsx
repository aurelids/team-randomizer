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

  players.forEach((player, index) => {
    const teamIndex = index % numTeams;
    teams[teamIndex].players.push(player);
    teams[teamIndex].totalLevel += player.level;
  });

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
