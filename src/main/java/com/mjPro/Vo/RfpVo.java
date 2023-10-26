package com.mjPro.Vo;

import java.time.LocalDateTime;

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
	
	IndentVo indent;
	
	LocalDateTime creationTime;
	LocalDateTime updationTime;
}
