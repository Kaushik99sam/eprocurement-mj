package com.mjPro.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mjPro.entity.Po;

@Repository
public interface PoRepo extends JpaRepository<Po, Integer> {

	
}
