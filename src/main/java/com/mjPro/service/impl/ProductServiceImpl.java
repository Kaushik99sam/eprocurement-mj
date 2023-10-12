package com.mjPro.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.mjPro.Vo.ProductVo;
import com.mjPro.entity.Product;
import com.mjPro.repo.ProductRepo;
import com.mjPro.service.ProductService;

@Service
public class ProductServiceImpl implements ProductService{
	
	@Autowired
	ProductRepo prepo;
	
	@Override
	public ResponseEntity<String> addProductData(ProductVo provo) {
		Product pro = new Product();
		pro.setName(provo.getName());
		pro.setEstPrice(provo.getEstPrice());
		pro.setUom(provo.getUom());
		pro.setQty(provo.getQty());
		
		pro = prepo.save(pro);
		
		if(pro == null) {
			return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body("Not inserted in database");
		}
		return ResponseEntity.status(HttpStatus.OK).body("Data inserted in database");
		
	}
	
	@Override
	public ResponseEntity<List<ProductVo>> getAll(){
		List<Product> proList = prepo.findAll();
		List<ProductVo> provoList = new ArrayList<>();
		
		if(proList == null) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
		}
		for(Product p : proList) {
			ProductVo pvo = new ProductVo(p.getId(), p.getName(), p.getEstPrice(), p.getUom(), p.getQty());
			provoList.add(pvo);
		}
		return ResponseEntity.status(HttpStatus.OK).body(provoList);
	}
	
	@Override
	public ResponseEntity<ProductVo> getById(int id) {
		Optional<Product> pro1 = prepo.findById(id);
		if(!pro1.isPresent()) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
			
		}
		Product pro = pro1.get();
		ProductVo pvo = new ProductVo(pro.getId(), pro.getName(), pro.getEstPrice(), pro.getUom(), pro.getQty());
		return ResponseEntity.status(HttpStatus.OK).body(pvo);
	}
	
	@Override
	public ResponseEntity<String> deleteProductData(int id) {
		prepo.deleteById(id);
		return ResponseEntity.status(HttpStatus.OK).body("Data Deleted successfully!!!");
	}
}
