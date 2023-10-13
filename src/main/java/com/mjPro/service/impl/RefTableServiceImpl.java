package com.mjPro.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.mjPro.Vo.ProductVo;
import com.mjPro.Vo.RefTableVo;
import com.mjPro.Vo.VendorVo;
import com.mjPro.entity.Product;
import com.mjPro.entity.RefTable;
import com.mjPro.entity.Vendor;
import com.mjPro.repo.ProductRepo;
import com.mjPro.repo.RefTableRepo;
import com.mjPro.repo.VendorRepo;
import com.mjPro.service.RefTableService;

@Service
public class RefTableServiceImpl implements RefTableService{
	
	@Autowired
	VendorRepo vrepo;
	
	@Autowired
	ProductRepo prepo;
	
	@Autowired
	RefTableRepo refrepo;
	
	@Override
	public ResponseEntity<String> addRefTableData(RefTableVo refvo) {
		RefTable reftable = new RefTable();
		
		
		
		reftable.setBidPrice(refvo.getBidPrice());
		
		Vendor v = vrepo.findById(refvo.getVenIds().getId()).get();
		reftable.setVendor(v);
		
		Product pro = prepo.findById(refvo.getProIds().getId()).get();
		reftable.setProduct(pro);
		
		reftable = refrepo.save(reftable);
		
		if(reftable == null) {
			return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body("Not inserted in database");
		}
		return ResponseEntity.status(HttpStatus.OK).body("Data inserted in database");
		
	}
	
	@Override
	public ResponseEntity<List<RefTableVo>> getAll(){
		List<RefTable> refList = refrepo.findAll();
		List<RefTableVo> refvoList = new ArrayList<RefTableVo>();
		
		if(refList == null) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
		}
		for(RefTable r : refList) {
			VendorVo vo = new VendorVo(r.getVendor().getId(), r.getVendor().getName(), r.getVendor().getVendorId(), r.getVendor().getEmail());
			ProductVo pvo = new ProductVo(r.getProduct().getId(), r.getProduct().getName(), r.getProduct().getEstPrice(), r.getProduct().getUom(), r.getProduct().getQty());
			
			RefTableVo rvo = new RefTableVo(r.getId(), r.getBidPrice(), vo, pvo);
			
			refvoList.add(rvo);
		}
		return ResponseEntity.status(HttpStatus.OK).body(refvoList);
	}
	
	@Override
	public ResponseEntity<RefTableVo> getById(int id) {
		RefTable ref = refrepo.findById(id).get();

		if(ref == null) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
		}
		
		VendorVo vo = new VendorVo(ref.getVendor().getId(), ref.getVendor().getName(), ref.getVendor().getVendorId(), ref.getVendor().getEmail());
		ProductVo pvo = new ProductVo(ref.getProduct().getId(), ref.getProduct().getName(), ref.getProduct().getEstPrice(), ref.getProduct().getUom(), ref.getProduct().getQty());
		
		RefTableVo refvo = new RefTableVo(ref.getId(), ref.getBidPrice(), vo, pvo);
		
		return ResponseEntity.status(HttpStatus.OK).body(refvo);
	}
	
	public List<RefTable> getByVendorId(int id){
		return refrepo.getByVendorId(id);
	}
	
	@Override
	public ResponseEntity<String> deleteData(int id) {
		refrepo.deleteById(id);
		return ResponseEntity.status(HttpStatus.OK).body("Data deleted successfully!!!");
	}
	
}
