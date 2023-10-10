package com.assignemnt.studentRanking.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.assignemnt.studentRanking.entities.Candidate;

@Repository
public interface CandidateRepository extends MongoRepository<Candidate, String> {

	 
	@Query("{'Name': ?0}")
	Optional<Candidate> findByName(String name);

	@Query(value="{'Name': ?0}", delete = true)
	void deleteByName(String name);

	@Query("{'SATscore': {$gte: ?0}}")
	List<Candidate> findByScore(int candidateScore);


}
