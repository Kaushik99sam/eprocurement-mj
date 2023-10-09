package com.mjPro.service;

import com.mjPro.entity.Cs;
import com.mjPro.vo.CsVo;

public interface CsService {

     CsVo getAllCs();
    
    void saveCs(CsVo cs);
    
    CsVo findCsById(int id);
    
    void editCs(CsVo cs);
    
    void deleteCs(int id);
}
