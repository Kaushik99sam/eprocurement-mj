package com.mjPro.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mjPro.eval.Evaluation;
import com.mjPro.repo.EvalRepo;
import com.mjPro.service.EvalService;
import com.mjPro.vo.EvaluationVo;
@Service
public class EvalImpl implements EvalService {

	@Autowired
	EvalRepo evalRepo;
	@Override
	public List<EvaluationVo> getAllEvaluation() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void deleteEvaluation(int id) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void editEvaluation(EvaluationVo evaluation) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public Evaluation findEvaluationById(int id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void saveEvaluation(EvaluationVo evaluation) {
		// TODO Auto-generated method stub
		
	}

}