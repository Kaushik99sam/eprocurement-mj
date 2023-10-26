package com.mjPro.Vo;

import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class IndentVo {
	Integer id;
	LocalDateTime creationTime;
	LocalDateTime updationTime;
}
