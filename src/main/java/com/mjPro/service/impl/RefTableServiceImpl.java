package com.mjPro.service.impl;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mjPro.Vo.ProductVo;
import com.mjPro.Vo.RefTableVo;
import com.mjPro.Vo.RfpVo;
import com.mjPro.Vo.VendorVo;
import com.mjPro.entity.Product;
import com.mjPro.entity.RefTable;
import com.mjPro.entity.Rfp;
import com.mjPro.entity.Vendor;
import com.mjPro.repo.ProductRepo;
import com.mjPro.repo.RefProjection;
import com.mjPro.repo.RefTableRepo;
import com.mjPro.repo.RfpRepo;
import com.mjPro.repo.VendorRepo;
import com.mjPro.service.RefTableService;
import com.mjPro.util.ClassConvertor;
import com.mjPro.util.ExcelGenerator;

@Service
public class RefTableServiceImpl implements RefTableService {

	@Autowired
	VendorRepo vrepo;

	@Autowired
	ProductRepo prepo;

	@Autowired
	RfpRepo rfprepo;

	@Autowired
	RefTableRepo refrepo;

	@Override
	public String addData(RefTableVo refvo) {
		// TODO Auto-generated method stub
		Vendor ven = vrepo.findById(refvo.getVendor().getId()).orElse(null);
		VendorVo venvo = ClassConvertor.convertTo(ven, VendorVo.class);
		refvo.setVendor(venvo);
		System.out.println(refvo);

		Product pro = prepo.findById(refvo.getProduct().getId()).orElse(null);
		ProductVo provo = ClassConvertor.convertTo(pro, ProductVo.class);
		refvo.setProduct(provo);
		System.out.println(refvo);
		Rfp rfp = rfprepo.findById(refvo.getRfp().getId()).orElse(null);
		RfpVo rfpvo = ClassConvertor.convertTo(rfp, RfpVo.class);
		refvo.setRfp(rfpvo);
		System.out.println(refvo);
		RefTable ref = ClassConvertor.convertTo(refvo, RefTable.class);
		ref.setCreationTime(LocalDateTime.now());
		ref.setUpdationTime(LocalDateTime.now());
		refrepo.save(ref);
		return "RefTable data added successfully!!!";
	}

	@Override
	public List<RefTableVo> getAll() {
		// TODO Auto-generated method stub
		List<RefTable> refList = refrepo.findAll();
		if (refList != null) {
			List<RefTableVo> refvoList = ClassConvertor.convertList(refList, RefTableVo.class);
			return refvoList;
		}
		return null;
	}

	@Override
	public RefTableVo getById(int id) {
		// TODO Auto-generated method stub
		RefTable ref = refrepo.findById(id).orElse(null);
		System.out.println(refrepo.findByProduct_IdAndVendor_Id(1, 2));
		if (ref != null) {
			RefTableVo refvo = ClassConvertor.convertTo(ref, RefTableVo.class);
			return refvo;
		}
		return null;
	}

	@Override
	public String deleteData(int id) {
		// TODO Auto-generated method stub
		refrepo.deleteById(id);
		return "RefTable data deleted successfully!!!";
	}

	@Override
	public List<RefTableVo> getByRfp(int id) {
		// TODO Auto-generated method stub
		List<RefTable> refList = refrepo.findByRfp(id);
		List<RefTableVo> refvoList = ClassConvertor.convertList(refList, RefTableVo.class);
		return refvoList;
	}

	@Override
	public List<RefTableVo> getProductByVendorId(int id) {
		List<RefTableVo> refVoList = ClassConvertor.convertList(refrepo.findByVendor_Id(id), RefTableVo.class);

		return refVoList;
	}

	@Override
	public List<Object> getProductWithVendorList(int id) {
		List<RefTable> refList = refrepo.findByRfp(id);
		List<Object> olist = ExcelGenerator.vendorListByProduct(refList);
		return olist;
	}

}
