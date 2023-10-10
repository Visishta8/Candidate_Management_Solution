import React, { useState } from 'react';

function UpdateCandidateScore() {
  const [candidateName, setCandidateName] = useState('');
  const [newScore, setNewScore] = useState('');
  const [loading, setLoading] = useState(false);

  const handleNameChange = (event) => {
    setCandidateName(event.target.value);
  };

  const handleScoreChange = (event) => {
    setNewScore(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    // Create a payload with the candidate's name and new SAT score
    const payload = {
      name: candidateName,
      score: parseInt(newScore, 10), // Convert score to an integer
    };

    // Send a PUT request to update the candidate's SAT score
    fetch(`http://localhost:8089/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error updating SAT score: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('SAT score updated:', data);
        setCandidateName('');
        setNewScore('');
      })
      .catch((error) => {
        console.error(error.message); // Display the error message from the response status
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <h2 className="text-sm font-semibold my-4">Update Candidate SAT Score</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label>Candidate Name: </label>
          <input
            type="text"
            name="candidateName"
            value={candidateName}
            onChange={handleNameChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-4">
          <label>New SAT Score:</label>
          <input
            type="number"
            name="newScore"
            value={newScore}
            onChange={handleScoreChange}
            className="form-control"
            required
          />
        </div>
        <button
          type="submit" className="btn btn-primary">
          Update Score
        </button>
      </form>
      {loading && <p className="mt-4">Updating SAT score...</p>}
    </div>
  );
}

export default UpdateCandidateScore;
