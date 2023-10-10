package com.assignemnt.studentRanking.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.assignemnt.studentRanking.entities.Candidate;
import com.assignemnt.studentRanking.services.CandidateService;

@CrossOrigin( origins = "http://localhost:3000")
@RestController
public class CandidateController {

	@Autowired
	private final CandidateService candidateService;

	public CandidateController(CandidateService candidatService){
		this.candidateService=candidatService;
	}
	
	@PostMapping("/saveCandidate")
	public ResponseEntity<String> addCandidate(@RequestBody Candidate candidate) {
		candidateService.addCandidate(candidate);
	    System.out.println("Candidate "+candidate.getName()+" Added...");
	    return ResponseEntity.status(HttpStatus.CREATED).build();
	}
	
	@GetMapping("/candidates")
	public List<Candidate> getAll() {
		List<Candidate> candidates = candidateService.getAll();
	    if (candidates.isEmpty()) {
	    	return null; // Return 204 No Content if the list is empty
	    }
	    return candidates;
	}
	  
	@GetMapping("/candidate/rank/{name}")
	public ResponseEntity<Map<String, Integer>> getRankByName(@PathVariable String name) {
	    int rank = candidateService.getRankByName(name);
	    Map<String, Integer> response = new HashMap<>();
	    response.put("rank", rank);
	    return ResponseEntity.ok(response);
	}

	
	@PutMapping("/update")
	public ResponseEntity<String> updateCandidate(@RequestBody Candidate candidate) {
		candidateService.updateCandidate(candidate.getName(), candidate);
	    System.out.println("Candidate "+candidate.getName()+" Added...");
	    return ResponseEntity.status(HttpStatus.CREATED).build();
	}
	
	@DeleteMapping("/delete/{name}")
	public ResponseEntity<String> deleteCandidate(@PathVariable String name) {
		candidateService.deleteCandidate(name);
	    System.out.println("Candidate "+name+" Deleted...");
	       return ResponseEntity.noContent().build();
	   }
	  
}
