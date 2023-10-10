import React, { useState } from 'react';
import ViewCandidatesComponent from './ViewCandidatesComponent';
import UpdateCandidateComponent from './UpdateCandidateComponent';
import DeleteCandidateComponent from './DeleteCandidateComponent';
import SaveCandidateComponent from './SaveCandidateComponent';
import GetRankComponent from './GetRankComponent';

function HomePage() {
  const [selectedOption, setSelectedOption] = useState('view');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-md mx-auto bg-white p-5 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Candidate Management System
        </h2>
        <div className="form-group">
          <label className="block mb-2">Select an option:</label>
          <select
            className="form-control"
            value={selectedOption}
            onChange={handleOptionChange}
          >
            <option value="view">View Candidates</option>
            <option value="update">Update Candidate Score</option>
            <option value="delete">Delete Candidate</option>
            <option value="save">Save Candidate</option>
            <option value="getRank">Get Candidate Rank</option>
          </select>
        </div>

        {selectedOption === 'view' && <ViewCandidatesComponent />}
        {selectedOption === 'update' && <UpdateCandidateComponent />}
        {selectedOption === 'delete' && <DeleteCandidateComponent />}
        {selectedOption === 'save' && <SaveCandidateComponent />}
        {selectedOption === 'getRank' && <GetRankComponent />}
      </div>
    </div>
  );
}

export default HomePage;
