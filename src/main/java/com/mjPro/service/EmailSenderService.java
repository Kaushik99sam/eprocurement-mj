package com.mjPro.service;

public interface EmailSenderService {

	public void sendNewMail(String to, String subject, String body);
	
	public void sendMultipleMail(Object[] objects,String subject,Object[] objects2);

	
}
