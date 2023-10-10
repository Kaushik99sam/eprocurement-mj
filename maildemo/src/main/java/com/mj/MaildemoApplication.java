package com.mj;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MaildemoApplication implements CommandLineRunner{

	public static void main(String[] args) {
		SpringApplication.run(MaildemoApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		GEmailSender gEmailSender = new GEmailSender();
		String to = "kaushik99sam@gmail.com";
//		String from = "kausik99sam@gmail.com";
		String subject = "Demo from Spring Boot Application";
		String text = "Hello From spring boot";
		
		boolean b = gEmailSender.sendEmail(to, subject, text);
		if(b) {
			System.out.println("Email sent successfully");
		}else {
			System.out.println("Email not sent");
		}
		
	}

}
