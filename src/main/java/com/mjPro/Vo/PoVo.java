package com.mjPro.Vo;

import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PoVo {

	Integer id;
	List<RefTableVo> refTable;
	LocalDateTime creationTime;
	LocalDateTime updationTime;
}
