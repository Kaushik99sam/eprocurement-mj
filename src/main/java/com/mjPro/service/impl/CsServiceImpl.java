package com.mjPro.service.impl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mjPro.Vo.CsVo;
import com.mjPro.Vo.RfpVo;
import com.mjPro.entity.Cs;
import com.mjPro.entity.RefTable;
import com.mjPro.entity.Rfp;
import com.mjPro.repo.CsRepo;
import com.mjPro.repo.RefTableRepo;
import com.mjPro.repo.RfpRepo;
import com.mjPro.service.CsService;
import com.mjPro.util.ClassConvertor;

@Service
public class CsServiceImpl implements CsService{
	@Autowired
	CsRepo csrepo;
	
	@Autowired
	RfpRepo rfprepo;
	
	@Autowired
	RefTableRepo refrepo;

	@Override
	public String addData(CsVo csvo) {
		// TODO Auto-generated method stub
		Rfp rfp = rfprepo.findById(csvo.getRfp().getId()).orElse(null);
		if(rfp != null) {
			RfpVo rfpvo = ClassConvertor.convertTo(rfp, RfpVo.class);
			csvo.setRfp(rfpvo);
			Cs cs = ClassConvertor.convertTo(csvo, Cs.class);
			cs.setCreationTime(LocalDateTime.now());
			cs.setUpdationTime(LocalDateTime.now());
			csrepo.save(cs);
			return "Cs data inserted successfully!!!";
		}
		return null;
	}

	@Override
	public List<CsVo> getAll() {
		// TODO Auto-generated method stub
		List<Cs> csList = csrepo.findAll();
		if(csList != null) {
			List<CsVo> csvoList = ClassConvertor.convertList(csList, CsVo.class);
			return csvoList;
		}
		return null;
	}

	@Override
	public CsVo getById(int id) {
		Cs cs = csrepo.findById(id).orElse(null);
		if(cs != null) {
			CsVo csvo = ClassConvertor.convertTo(cs, CsVo.class);
			return csvo;
		}
		return null;
	}

	@Override
	public String deleteData(int id) {
		csrepo.deleteById(id);
		return "Cs data deleted successfully!!!";
	}
	
}
