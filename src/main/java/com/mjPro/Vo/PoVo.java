package com.mjPro.Vo;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PoVo {

	Integer id;
	RefTableVo refTableVo;
	LocalDateTime creationTime;
	LocalDateTime updationTime;
}
