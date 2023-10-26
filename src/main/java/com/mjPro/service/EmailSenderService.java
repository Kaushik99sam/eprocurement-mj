package com.mjPro.service;

public interface EmailSenderService {

	public void sendNewMail(String to, String subject, String body);
}
