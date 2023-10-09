package com.mjPro.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mjPro.entity.Rfp;

@Repository
public interface RfpRepo extends JpaRepository<Rfp, Integer>{

}
