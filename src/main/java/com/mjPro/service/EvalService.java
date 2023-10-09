package com.mjPro.service;

import java.util.List;

import com.mjPro.eval.Evaluation;


public interface EvalService {
	
	List<Evaluation> getAllEvaluation();
	Boolean deleteEvaluation(int id);
	void editEvaluation (Evaluation evaluation);
	Evaluation findEvaluationById(int id);
	void saveEvaluation(Evaluation evaluation);
}
