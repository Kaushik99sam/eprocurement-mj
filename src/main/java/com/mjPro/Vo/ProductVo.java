package com.mjPro.Vo;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductVo {
	Integer id;
	String name;
	Double estPrice;
	String uom;
	Integer qty;
}
