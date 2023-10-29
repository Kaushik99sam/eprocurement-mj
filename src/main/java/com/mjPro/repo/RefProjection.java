package com.mjPro.repo;

import java.util.List;

import com.mjPro.entity.Product;
import com.mjPro.entity.Vendor;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RefProjection {
	private Product p;
	private List<Vendor> vList;
}
