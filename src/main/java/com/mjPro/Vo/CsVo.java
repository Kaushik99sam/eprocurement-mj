package com.mjPro.Vo;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CsVo {
	
	Integer id;
	RfpVo rfp;
	LocalDateTime creationTime;
	LocalDateTime updationTime;
}
