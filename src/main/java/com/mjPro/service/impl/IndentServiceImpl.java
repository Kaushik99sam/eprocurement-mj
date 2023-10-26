package com.mjPro.service.impl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mjPro.Vo.IndentVo;
import com.mjPro.entity.Indent;
import com.mjPro.repo.IndentRepo;
import com.mjPro.service.IndentService;
import com.mjPro.util.ClassConvertor;

@Service
public class IndentServiceImpl implements IndentService{
	@Autowired
	IndentRepo irepo;

	@Override
	public String addData(IndentVo ivo) {
		// TODO Auto-generated method stub
		Indent i = ClassConvertor.convertTo(ivo, Indent.class);
		i.setCreationTime(LocalDateTime.now());
		i.setUpdationTime(LocalDateTime.now());
		irepo.save(i);
		return "Indent data added successfully!!!";
	}

	@Override
	public List<IndentVo> getAll() {
		// TODO Auto-generated method stub
		List<Indent> iList = irepo.findAll();
		if(iList != null) {
			List<IndentVo> ivoList = ClassConvertor.convertList(iList, IndentVo.class);
			return ivoList;
		}
		return null;
	}

	@Override
	public IndentVo getById(int id) {
		// TODO Auto-generated method stub
		Indent i = irepo.findById(id).orElse(null);
		if(i != null) {
			IndentVo ivo = ClassConvertor.convertTo(i, IndentVo.class);
			return ivo;
		}
		return null;
	}

	@Override
	public String deleteData(int id) {
		// TODO Auto-generated method stub
		irepo.deleteById(id);
		return "Indent data deleted successfully!!!";
		
	}
	
}