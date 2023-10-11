package com.mjPro.service.impl;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mjPro.Vo.CsVo;
import com.mjPro.Vo.IndentVo;
import com.mjPro.Vo.RfpVo;
import com.mjPro.Vo.VendorVo;
import com.mjPro.entity.Cs;
import com.mjPro.entity.Indent;
import com.mjPro.entity.Rfp;
import com.mjPro.entity.Vendor;
import com.mjPro.repo.CsRepo;
import com.mjPro.repo.IndentRepo;
import com.mjPro.repo.RfpRepo;
import com.mjPro.repo.VendorRepo;

@Service
public class RfpServiceImpl {
	@Autowired
	IndentRepo irepo;
	
	@Autowired
	CsRepo csrepo;
	
	@Autowired
	VendorRepo venrepo;
	
	@Autowired
	RfpRepo rrepo;
	
	public void addRfpData(RfpVo rfpvo) {
		Rfp rfp = new Rfp();
		rfp.setStatus(rfpvo.getStatus());
		rfp.setIsSpilt(rfpvo.getIsSpilt());
		rfp.setDescription(rfpvo.getDescription());
		rfp.setCreation_date(LocalDate.now());
		rfp.setUpdation_date(LocalDate.now());
		
		Indent i = irepo.findById(rfpvo.getIndentId().getId()).get();
		rfp.setIndent(i);
		
		Cs cs = csrepo.findById(rfpvo.getCsId().getId()).get();
		rfp.setCs(cs);
		
		List<Vendor> venList = new ArrayList<>();
		for(VendorVo venvo : rfpvo.getVenIds()) {
			Vendor v = venrepo.findById(venvo.getId()).get();
			venList.add(v);
		}
		rfp.setVenList(venList);
		
		rrepo.save(rfp);
	}
	
	public List<RfpVo> getAll(){
		
		List<Rfp> rfpList = rrepo.findAll();
		List<RfpVo> rfpvoList = new ArrayList<RfpVo>();
		
		
		for(Rfp r : rfpList) {
			RfpVo rvo = new RfpVo();
			rvo.setId(r.getId());
			rvo.setStatus(r.getStatus());
			rvo.setIsSpilt(r.getIsSpilt());
			rvo.setDescription(r.getDescription());
			rvo.setCreation_date(r.getCreation_date());
			rvo.setUpdation_date(r.getUpdation_date());
			
			Indent i = irepo.findById(r.getIndent().getId()).get();
			IndentVo ivo = new IndentVo(i.getId());
			rvo.setIndentId(ivo);
			
			Cs cs = csrepo.findById(r.getCs().getId()).get();
			CsVo csvo = new CsVo(cs.getId());
			rvo.setCsId(csvo);
			
			List<VendorVo> venvoList = new ArrayList<VendorVo>();
			for(Vendor v : r.getVenList()) {
				VendorVo vvo = new VendorVo(v.getId(), v.getName(), v.getVendorId(), v.getEmail());
				venvoList.add(vvo);
			}
			rvo.setVenIds(venvoList);
			
			rfpvoList.add(rvo);
		}		
		return rfpvoList;
	}
	
	public RfpVo getById(int id) {
		Rfp rfp = rrepo.findById(id).get();
		
		if(rfp == null) {
			return null;
		}
		
		RfpVo rfpvo = new RfpVo();
		
		rfpvo.setId(rfp.getId());
		rfpvo.setStatus(rfp.getStatus());
		rfpvo.setIsSpilt(rfp.getIsSpilt());
		rfpvo.setDescription(rfp.getDescription());
		rfpvo.setCreation_date(rfp.getCreation_date());
		rfpvo.setUpdation_date(rfp.getUpdation_date());
		
		Indent i = irepo.findById(rfp.getIndent().getId()).get();
		IndentVo ivo = new IndentVo(i.getId());
		rfpvo.setIndentId(ivo);
		
		Cs cs = csrepo.findById(rfp.getCs().getId()).get();
		CsVo csvo = new CsVo(cs.getId());
		rfpvo.setCsId(csvo);
		
		List<VendorVo> venvoList = new ArrayList<VendorVo>();
		for(Vendor v : rfp.getVenList()) {
			VendorVo vvo = new VendorVo(v.getId(), v.getName(), v.getVendorId(), v.getEmail());
			venvoList.add(vvo);
		}
		rfpvo.setVenIds(venvoList);
		
		return rfpvo;
	}
	
	public void deleteData(int id) {
		rrepo.deleteById(id);
	}
}
