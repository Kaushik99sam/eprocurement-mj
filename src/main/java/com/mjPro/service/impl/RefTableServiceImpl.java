package com.mjPro.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

@Service
public class RefTableServiceImpl {
	
	@Autowired
	VendorRepo vrepo;
	
	@Autowired
	ProductRepo prepo;
	
	@Autowired
	RefTableRepo refrepo;
	
	public void addRefTableData(RefTableVo refvo) {
		RefTable reftable = new RefTable();
		
		reftable.setBidPrice(refvo.getBidPrice());
		
		Vendor v = vrepo.findById(refvo.getVenIds().getId()).get();
		reftable.setVendor(v);
		
		Product pro = prepo.findById(refvo.getProIds().getId()).get();
		reftable.setProduct(pro);
		
		refrepo.save(reftable);
	}
	
	public List<RefTableVo> getAll(){
		List<RefTable> refList = refrepo.findAll();
		List<RefTableVo> refvoList = new ArrayList<RefTableVo>();
		
		for(RefTable r : refList) {
			VendorVo vo = new VendorVo(r.getVendor().getId(), r.getVendor().getName(), r.getVendor().getVendorId(), r.getVendor().getEmail());
			ProductVo pvo = new ProductVo(r.getProduct().getId(), r.getProduct().getName(), r.getProduct().getEstPrice(), r.getProduct().getUom(), r.getProduct().getQty());
			
			RefTableVo rvo = new RefTableVo(r.getId(), r.getBidPrice(), vo, pvo);
			
			refvoList.add(rvo);
		}
		return refvoList;
	}
	
	public RefTableVo getById(int id) {
		RefTable ref = refrepo.findById(id).get();

		if(ref == null) {
			return null;
		}
		
		VendorVo vo = new VendorVo(ref.getVendor().getId(), ref.getVendor().getName(), ref.getVendor().getVendorId(), ref.getVendor().getEmail());
		ProductVo pvo = new ProductVo(ref.getProduct().getId(), ref.getProduct().getName(), ref.getProduct().getEstPrice(), ref.getProduct().getUom(), ref.getProduct().getQty());
		
		RefTableVo refvo = new RefTableVo(ref.getId(), ref.getBidPrice(), vo, pvo);
		
		return refvo;
	}
	
	public void deleteData(int id) {
		refrepo.deleteById(id);
	}
	
}
