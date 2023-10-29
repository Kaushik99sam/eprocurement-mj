package com.mjPro.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.mjPro.entity.RefTable;
import com.mjPro.entity.Rfp;

@Repository
public interface RefTableRepo extends JpaRepository<RefTable, Integer> {

//	@Query("select r from RefTable r where r.rfp.id = :id ")
//	public List<RefTable> findByRfp(int id);

	@Query("select r from RefTable r where r.rfp.id = :id order by r.bidPrice asc")
	public List<RefTable> findByRfp(int id);

	public List<RefTable> findByVendor_Id(Integer id);
	
	public List<RefTable> findByProduct_Id(Integer id);
	
	public List<RefTable> findByProduct_IdAndVendor_Id(Integer pid,Integer vid);

//	@Query("SELECT NEW com.mjPro.repo.RefProjection(p, v) FROM RefTable r " + "JOIN r.product p " + "JOIN r.vendor v " + "GROUP BY p")
//	List<RefProjection> findProductWithVendorList();

}
