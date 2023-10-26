package com.mjPro.service.impl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mjPro.Vo.ProductVo;
import com.mjPro.Vo.RfpVo;
import com.mjPro.entity.Product;
import com.mjPro.entity.Rfp;
import com.mjPro.repo.ProductRepo;
import com.mjPro.repo.RfpRepo;
import com.mjPro.service.ProductService;
import com.mjPro.util.ClassConvertor;

@Service
public class ProductServiceImpl implements ProductService{
	
	@Autowired
	ProductRepo prepo;
	
	@Autowired
	RfpRepo rfprepo;

	@Override
	public String addData(ProductVo provo) {
		// TODO Auto-generated method stub
		Rfp rfp = rfprepo.findById(provo.getRfp().getId()).orElse(null);
		if(rfp != null) {
			RfpVo rfpvo = ClassConvertor.convertTo(rfp, RfpVo.class);
			provo.setRfp(rfpvo);
			Product pro = ClassConvertor.convertTo(provo, Product.class);
			pro.setCreationTime(LocalDateTime.now());
			pro.setUpdationTime(LocalDateTime.now());
			prepo.save(pro);
			return "Product data added successfully!!!";
		}
		return null;
	}

	@Override
	public List<ProductVo> getAll() {
		// TODO Auto-generated method stub
		List<Product> proList = prepo.findAll();
		if(proList != null) {
			List<ProductVo> provoList = ClassConvertor.convertList(proList, ProductVo.class);
			return provoList;
		}
		return null;
	}

	@Override
	public ProductVo getById(int id) {
		// TODO Auto-generated method stub
		Product pro = prepo.findById(id).orElse(null);
		if(pro != null) {
			ProductVo provo = ClassConvertor.convertTo(pro, ProductVo.class);
			return provo;
		}
		return null;
	}

	@Override
	public String deleteData(int id) {
		// TODO Auto-generated method stub
		prepo.deleteById(id);
		return "Product data deleted successfully!!!";
	}
	
}
