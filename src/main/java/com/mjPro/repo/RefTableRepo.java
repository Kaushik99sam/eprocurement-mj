package com.mjPro.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mjPro.entity.RefTable;

@Repository
public interface RefTableRepo extends JpaRepository<RefTable, Integer> {

}
