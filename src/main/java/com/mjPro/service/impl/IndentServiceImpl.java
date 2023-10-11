package com.mjPro.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mjPro.Vo.IndentVo;
import com.mjPro.entity.Indent;
import com.mjPro.repo.IndentRepo;

@Service
public class IndentServiceImpl {
	@Autowired
	IndentRepo irepo;
	
	public void addIndentData(IndentVo ivo) {
		irepo.save(new Indent());
	}
	
	public List<IndentVo> getAll() {
		List<Indent> ilist = irepo.findAll();
		List<IndentVo> ivolist = new ArrayList<IndentVo>();
		for(Indent i : ilist) {
			IndentVo ivon = new IndentVo(i.getId());
			ivolist.add(ivon);
		}
		return ivolist;
	}
	
	public IndentVo getById(int id) {
		Indent i = irepo.findById(id).get();
		if(i == null) {
			return null;
		}
		IndentVo ivo = new IndentVo(i.getId());
		return ivo;
	}
	
	public void deleteData(int id) {
		irepo.deleteById(id);
	}
}
