import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Leaderboard.css';

const Leaderboard = () => {
  const [topScores, setTopScores] = useState([]);

  useEffect(() => {
    const fetchTopScores = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/api/top-scores'
        );
        if (response.data.success) {
          setTopScores(response.data.data);
        } else {
          console.error('Failed to retrieve top scores');
        }
      } catch (error) {
        console.error('Error fetching top scores:', error);
      }
    };

    fetchTopScores();
  }, []);

  return (
    <div>
      <h2>Top 10 Scores</h2>
      <ol>
        {topScores.map((user, index) => (
          <li key={index}>
            {user.username}: {user.score}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Leaderboard;
