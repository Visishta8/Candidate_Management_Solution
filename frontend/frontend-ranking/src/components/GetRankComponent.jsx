import React, { useState } from 'react';

function GetCandidateRankComponent() {
  const [candidateName, setCandidateName] = useState('');
  const [rank, setRank] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    setCandidateName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    // Send a GET request to your Spring Boot API with candidateName as a path variable
    fetch(`http://localhost:8089/candidate/rank/${candidateName}`)
      .then((response) => response.json())
      .then((data) => {
        setRank(data.rank);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching candidate rank:', error);
        setLoading(false);
      });
  };

  return (
    <div>
      <h2 className="text-center text-md font-semibold my-4">Get Candidate Rank</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Candidate Name:</label>
          <input
            type="text"
            name="candidateName"
            value={candidateName}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary my-4">
          Get Rank
        </button>
      </form>
      {loading && <p>Loading...</p>}
      {rank !== null && (
        <div>
          <p>Candidate Rank: {rank}</p>
        </div>
      )}
    </div>
  );
}

export default GetCandidateRankComponent;
