package com.mjPro.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mjPro.Vo.ProductVo;
import com.mjPro.entity.Product;
import com.mjPro.repo.ProductRepo;

@Service
public class ProductServiceImpl {
	
	@Autowired
	ProductRepo prepo;
	
	public void addProductData(ProductVo provo) {
		Product pro = new Product();
		pro.setName(provo.getName());
		pro.setEstPrice(provo.getEstPrice());
		pro.setUom(provo.getUom());
		pro.setQty(provo.getQty());
		
		prepo.save(pro);
	}
	
	public List<ProductVo> getAll(){
		List<Product> proList = prepo.findAll();
		
		List<ProductVo> provoList = new ArrayList<>();
		
		for(Product p : proList) {
			ProductVo pvo = new ProductVo(p.getId(), p.getName(), p.getEstPrice(), p.getUom(), p.getQty());
			provoList.add(pvo);
		}
		
		return provoList;
	}
	
	public ProductVo getById(int id) {
		Product pro = prepo.findById(id).get();
		if(pro == null) {
			return null;
		}
		ProductVo pvo = new ProductVo(pro.getId(), pro.getName(), pro.getEstPrice(), pro.getUom(), pro.getQty());
		return pvo;
	}
	
	public void deleteProductData(int id) {
		prepo.deleteById(id);
	}
}
