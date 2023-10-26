package com.mjPro.service.impl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mjPro.Vo.IndentVo;
import com.mjPro.Vo.RfpVo;
import com.mjPro.entity.Indent;
import com.mjPro.entity.Rfp;
import com.mjPro.repo.CsRepo;
import com.mjPro.repo.IndentRepo;
import com.mjPro.repo.RfpRepo;
import com.mjPro.repo.VendorRepo;
import com.mjPro.service.RfpService;
import com.mjPro.util.ClassConvertor;

@Service
public class RfpServiceImpl implements RfpService{
	@Autowired
	IndentRepo irepo;
	
	@Autowired
	RfpRepo rrepo;

	@Override
	public String addData(RfpVo rfpvo) {
		// TODO Auto-generated method stub
		Indent i = irepo.findById(rfpvo.getIndent().getId()).orElse(null);
		if(i != null) {
			IndentVo ivo = ClassConvertor.convertTo(i, IndentVo.class);
			rfpvo.setIndent(ivo);
			Rfp rfp = ClassConvertor.convertTo(rfpvo, Rfp.class);
			rfp.setCreationTime(LocalDateTime.now());
			rfp.setUpdationTime(LocalDateTime.now());
			rrepo.save(rfp);
			return "Rfp data added successfully!!!";
		}
		return null;
	}

	@Override
	public List<RfpVo> getAll() {
		// TODO Auto-generated method stub
		List<Rfp> rfpList = rrepo.findAll();
		if(rfpList != null) {
			List<RfpVo> rfpvoList = ClassConvertor.convertList(rfpList, RfpVo.class);
			return rfpvoList;
		}
		return null;
	}

	@Override
	public RfpVo getById(int id) {
		// TODO Auto-generated method stub
		Rfp rfp = rrepo.findById(id).orElse(null);
		if(rfp != null) {
			RfpVo rfpvo = ClassConvertor.convertTo(rfp, RfpVo.class);
			return rfpvo;
		}
		return null;
	}

	@Override
	public String deleteData(int id) {
		// TODO Auto-generated method stub
		rrepo.deleteById(id);
		return "Rfp data deleted successfully!!!";
	}


	
	
	
}
