package com.mjPro.service.impl;

import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.mjPro.service.EmailSenderService;

@Service
public class EmailSenderServiceImpl implements EmailSenderService {

	@Autowired
	private JavaMailSender mailSender;

	@Override
	public void sendNewMail(String to, String subject, String body) {
		// TODO Auto-generated method stub
		MimeMessage message = mailSender.createMimeMessage();
		try {
			message.setRecipients(MimeMessage.RecipientType.TO, to);
			message.setSubject("TESTING");
			String content = "<h1>PO</h1>" + "<p>" + body + "<p>";
			message.setContent(content, "text/html; charset=utf-8");
		} catch (MessagingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		mailSender.send(message);

	}

	@Override
	public void sendMultipleMail(Object[] to, String subject, Object[] body) {
		for (int i = 0; i < to.length; i++) {
			sendNewMail(to[i].toString(), subject, body[i].toString());
		}
	}

}
