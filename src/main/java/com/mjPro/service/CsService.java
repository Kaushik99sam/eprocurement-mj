package com.mjPro.service;

import com.mjPro.entity.Cs;

public interface CsService {

     Cs getAllCs();
    
    void saveCs(Cs cs);
    
    Cs findCsById(int id);
    
    void editCs(Cs cs);
    
    boolean deleteCs(int id);
}
