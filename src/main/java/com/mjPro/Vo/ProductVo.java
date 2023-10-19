package com.mjPro.Vo;

import java.time.LocalDateTime;
import java.util.List;

import com.mjPro.entity.Rfp;

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
	RfpVo rfp;
	LocalDateTime creationTime;
	LocalDateTime updationTime;
}
