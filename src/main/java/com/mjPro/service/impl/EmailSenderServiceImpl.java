package com.mjPro.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import com.mjPro.service.EmailSenderService;

public class EmailSenderServiceImpl implements EmailSenderService{

	@Autowired
	private JavaMailSender mailSender;

	@Override
	public void sendNewMail(String to, String subject, String body) {
		// TODO Auto-generated method stub
		SimpleMailMessage message = new SimpleMailMessage();
		message.setTo(to);
		message.setSubject(subject);
		message.setText(body);
		mailSender.send(message);

	}

}
