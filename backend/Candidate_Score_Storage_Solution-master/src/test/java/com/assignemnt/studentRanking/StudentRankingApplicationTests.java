package com.assignemnt.studentRanking;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class })
public class StudentRankingApplicationTests {

	public static void main(String[] args) {
		SpringApplication.run(StudentRankingApplicationTests.class, args);
	}

}