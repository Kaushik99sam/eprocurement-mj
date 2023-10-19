package com.mjPro.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mjPro.Vo.IndentVo;
import com.mjPro.repo.IndentRepo;
import com.mjPro.service.IndentService;

@Service
public class IndentServiceImpl implements IndentService{
	@Autowired
	IndentRepo irepo;

	@Override
	public void addData(IndentVo ivo) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<IndentVo> getAll() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public IndentVo getById(int id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void deleteData(int id) {
		// TODO Auto-generated method stub
		irepo.deleteById(id);
	}
	
}