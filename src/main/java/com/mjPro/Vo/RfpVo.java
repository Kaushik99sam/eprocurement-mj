package com.mjPro.Vo;

import java.time.LocalDate;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RfpVo {
	Integer id;
	String status;
	Boolean isSpilt;
	String description;
	
	LocalDate creation_date;
	LocalDate updation_date;
	
	IndentVo indentId;
	
	List<VendorVo> venIds;
	
	CsVo csId;
}
