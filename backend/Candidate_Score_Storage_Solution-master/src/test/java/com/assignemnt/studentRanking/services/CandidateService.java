package com.assignemnt.studentRanking.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.assignemnt.studentRanking.entities.Candidate;
import com.assignemnt.studentRanking.repositories.CandidateRepository;

@Service
public class CandidateService {
	@Autowired
    private CandidateRepository candidateRepository;

    public CandidateService(CandidateRepository candidateRepository){
        this.candidateRepository=candidateRepository;
    }

    public void addCandidate(Candidate candidate){
    	int score = candidate.getScore();
    	if(score > 30)
    		candidate.setResult("pass");
    	else
    		candidate.setResult("fail");
        candidateRepository.insert(candidate);
    }
	
	public List<Candidate> getAll(){
        return candidateRepository.findAll();
    }

	public int getRankByName(String name) {
        Optional<Candidate> optionalCandidate = candidateRepository.findByName(name);
        if (optionalCandidate.isPresent()) {
            Candidate candidate = optionalCandidate.get();
            int candidateScore = candidate.getScore();
            List<Candidate> candidatesWithHigherOrEqualScores = candidateRepository.findByScore(candidateScore);
            return candidatesWithHigherOrEqualScores.size(); 
        } else {
            throw new RuntimeException("Candidate not found with name: " + name);
        }
    }
	
	public void updateCandidate(String name, Candidate candidate) {
		Candidate savedCandidate = candidateRepository.findByName(name)
	            .orElseThrow(() -> new RuntimeException(
	                    String.format("Cannot Find Candidate by ID %s", name)));
		savedCandidate.setName(candidate.getName());
	    savedCandidate.setAddress(candidate.getAddress());
	    savedCandidate.setCity(candidate.getCity());
	    savedCandidate.setCountry(candidate.getCountry());
	    savedCandidate.setPincode(candidate.getPincode());
	    savedCandidate.setScore(candidate.getScore());
	    if(candidate.getScore()>30)
	    	 savedCandidate.setResult("pass");
	    else
	    	savedCandidate.setResult("fail");
	    candidateRepository.save(savedCandidate);
	}
	
    public void deleteCandidate(String name){
        candidateRepository.deleteByName(name);
    }
    
}
