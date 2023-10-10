import React, { useState, useEffect } from 'react';

function ViewCandidatesComponent() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch candidate data from your Spring Boot API
    fetch('http://localhost:8089/candidates')
      .then((response) => response.json())
      .then((data) => {
        setCandidates(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching candidate data:', error);
      });
  }, []); // Empty dependency array to run the effect once on component mount

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className="text-center my-4">Candidates List</h2>
      <div className="row">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Candidate Name</th>
              <th>Address</th>
              <th>City</th>
              <th>Country</th>
              <th>Pincode</th>
              <th>SAT Score</th>
              <th>Result</th>
            </tr>
          </thead>

          <tbody>
            {candidates.map((candidate) => (
              <tr key={candidate.id}>
                <td>{candidate.name}</td>
                <td>{candidate.address}</td>
                <td>{candidate.city}</td>
                <td>{candidate.country}</td>
                <td>{candidate.pincode}</td>
                <td>{candidate.score}</td>
                <td>{candidate.result}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewCandidatesComponent;
