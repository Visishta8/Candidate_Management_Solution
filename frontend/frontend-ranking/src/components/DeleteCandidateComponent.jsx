import React, { useState } from 'react';

function DeleteCandidateComponent() {
  const [candidateName, setCandidateName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    setCandidateName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    // Send a DELETE request to your Spring Boot API with the candidateName as a path variable
    fetch(`http://localhost:8089/delete/${candidateName}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.status === 204) {
          // Candidate successfully deleted
          alert(`Candidate ${candidateName} is deleted.`);
        } else {
          // Error deleting candidate
          alert(`Error deleting candidate ${candidateName}.`);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error deleting candidate:', error);
        setLoading(false);
      });
  };

  return (
    <div>
      <h2 className="text-center my-4">Delete Candidate</h2>
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
        <button type="submit" className="btn btn-danger my-4">
          Delete
        </button>
      </form>
      {loading && <p>Deleting...</p>}
    </div>
  );
}

export default DeleteCandidateComponent;
