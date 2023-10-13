package com.mjPro.service.impl;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
import com.mjPro.service.RfpService;

@Service
public class RfpServiceImpl implements RfpService{
	@Autowired
	IndentRepo irepo;
	
	@Autowired
	CsRepo csrepo;
	
	@Autowired
	VendorRepo venrepo;
	
	@Autowired
	RfpRepo rrepo;
	
	@Override
	public ResponseEntity<String> addRfpData(RfpVo rfpvo) {
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
		
		rfp = rrepo.save(rfp);
		
		if(rfp == null) {
			return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body("Not inserted in database");
		}
		return ResponseEntity.status(HttpStatus.OK).body("Data inserted in database");
		
	}
	
	@Override
	public ResponseEntity<List<RfpVo>> getAll(){
		
		List<Rfp> rfpList = rrepo.findAll();
		List<RfpVo> rfpvoList = new ArrayList<RfpVo>();
		
		if(rfpList == null) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
		}
		
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
		return ResponseEntity.status(HttpStatus.OK).body(rfpvoList);
	}
	
	@Override
	public ResponseEntity<RfpVo> getById(int id) {
		Rfp rfp = rrepo.findById(id).get();
		
		if(rfp == null) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
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
		
		return ResponseEntity.status(HttpStatus.OK).body(rfpvo);	
	}
	
	@Override
	public ResponseEntity<List<VendorVo>> getVendorListByRfpId(int id){
		Rfp rfp = rrepo.findById(id).get();
		List<VendorVo> venvoList = new ArrayList<VendorVo>();
		
		if(rfp == null) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
		}
		for(Vendor v : rfp.getVenList()) {
			VendorVo vvo = new VendorVo(v.getId(), v.getName(), v.getVendorId(), v.getEmail());
			venvoList.add(vvo);
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(venvoList);
	}
	@Override
	public ResponseEntity<String> deleteData(int id) {
		rrepo.deleteById(id);
		return ResponseEntity.status(HttpStatus.OK).body("Data deleted successfully!!!");
	}
}
