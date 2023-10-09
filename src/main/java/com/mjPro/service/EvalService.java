package com.mjPro.service;

import java.util.List;

import com.mjPro.eval.Evaluation;
import com.mjPro.vo.EvaluationVo;


public interface EvalService {
	
	List<EvaluationVo> getAllEvaluation();
	void deleteEvaluation(int id);
	void editEvaluation (EvaluationVo evaluation);
	EvaluationVo findEvaluationById(int id);
	void saveEvaluation(EvaluationVo evaluation);
}
