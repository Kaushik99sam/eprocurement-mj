package com.mjPro.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mjPro.eval.Evaluation;

@Repository
public interface EvalRepo extends JpaRepository<Evaluation, Integer>{

}
