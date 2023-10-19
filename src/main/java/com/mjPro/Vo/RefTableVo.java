package com.mjPro.Vo;

import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RefTableVo {
	Integer id;
	Double bidPrice;
	VendorVo vendorvo;
	ProductVo productvo;
	RfpVo rfpvo;
	LocalDateTime creationTime;
	LocalDateTime updationTime;
}
