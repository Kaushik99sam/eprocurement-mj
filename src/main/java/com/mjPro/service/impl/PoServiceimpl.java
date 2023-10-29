package com.mjPro.service.impl;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mjPro.Vo.PoVo;
import com.mjPro.Vo.RefTableVo;
import com.mjPro.entity.Po;
import com.mjPro.entity.RefTable;
import com.mjPro.repo.PoRepo;
import com.mjPro.repo.RefTableRepo;
import com.mjPro.service.EmailSenderService;
import com.mjPro.service.PoService;
import com.mjPro.util.ClassConvertor;
@Service
public class PoServiceimpl implements PoService {

	@Autowired
	PoRepo poRepo;
	
	@Autowired
	RefTableRepo refrepo;
	
	@Autowired
	EmailSenderService es;
	
	@Override
	public String addData(PoVo pvo) {
		// TODO Auto-generated method stub
		List<String> to = new ArrayList<String>();
		List<String> body = new ArrayList<String>();
		List<RefTableVo> refvoList = new ArrayList<>();
		
		for(RefTableVo refvo : pvo.getRefTable()) {
			RefTable ref = refrepo.findById(refvo.getId()).get();
			to.add(ref.getVendor().getEmail());
			body.add(ref.getProduct().getName()+" "+ref.getBidPrice());
			RefTableVo reftablevo = ClassConvertor.convertTo(ref, RefTableVo.class);
			refvoList.add(reftablevo);
		}
		pvo.setRefTable(refvoList);
		
		Po po = ClassConvertor.convertTo(pvo, Po.class);
		po.setCreationTime(LocalDateTime.now());
		po.setUpdationTime(LocalDateTime.now());
		poRepo.save(po);
		es.sendMultipleMail(to.toArray(), "PO", body.toArray());
		return "Po data added successfully!!!";
	}

	@Override
	public List<PoVo> getAll() {
		// TODO Auto-generated method stub
		List<Po> poList = poRepo.findAll();
		if(poList != null) {
			List<PoVo> povoList = ClassConvertor.convertList(poList, PoVo.class);
			return povoList;
		}
		return null;
	}

	@Override
	public PoVo getById(int id) {
		// TODO Auto-generated method stub
		Po po = poRepo.findById(id).orElse(null);
		if(po != null) {
			PoVo povo = ClassConvertor.convertTo(po, PoVo.class);
			return povo;
		}
		return null;
	}

	@Override
	public String deleteData(int id) {
		// TODO Auto-generated method stub
		poRepo.deleteById(id);
		return "Po data deleted successfully!!!";
	}

}
