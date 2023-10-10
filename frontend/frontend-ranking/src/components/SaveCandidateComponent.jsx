import React, { useState } from 'react';

function SaveCandidateComponent() {
  const [candidate, setCandidate] = useState({
    name: '',
    address: '',
    city: '',
    country: '',
    pincode: '',
    score: '',
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCandidate({
      ...candidate,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Send the candidate data to your Spring Boot API via a POST request
    fetch('http://localhost:8089/saveCandidate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(candidate),
    })
    .then((response) => {
        if (response.status === 201) {
          // Candidate successfully deleted
          alert(`Candidate is created.`);
        } else {
          // Error deleting candidate
          alert(`Error saving the candidate.`);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error deleting candidate:', error);
        setLoading(false);
      })
      .then((data) => {
        console.log('Candidate added:', data);
        // Optionally, reset the form fields
        setCandidate({
          name: '',
          address: '',
          city: '',
          country: '',
          pincode: '',
          score: '',
        });
      })
      .catch((error) => {
        console.error('Error adding candidate:', error);
      });
  };

  return (
    <div>
      <h2 className="text-center my-4">Enter Candidate Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Candidate Name:</label>
          <input
            type="text"
            name="name"
            value={candidate.name}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={candidate.address}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>City:</label>
          <input
            type="text"
            name="city"
            value={candidate.city}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Country:</label>
          <input
            type="text"
            name="country"
            value={candidate.country}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Pincode:</label>
          <input
            type="text"
            name="pincode"
            value={candidate.pincode}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>SAT Score:</label>
          <input
            type="text"
            name="score"
            value={candidate.score}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="my-4 btn btn-success">
          Save
        </button>
      </form>
      {loading && <p>Creating...</p>}
    </div>
  );
}

export default SaveCandidateComponent;
