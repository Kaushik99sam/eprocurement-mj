package com.mjPro.Vo;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VendorVo {
	Integer id;
	String name;
	String vendorId;
	String email;
	RfpVo rfp;
	LocalDateTime creationTime;
	LocalDateTime updationTime;
}
