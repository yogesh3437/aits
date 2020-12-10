package com.aits.yb.aits_yb;

import java.io.IOException;
import java.util.Date;
import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

import org.springframework.stereotype.Service;

@Service
public class EMAILService 
{
	public void sendMail(String toEmailID ,String attachmentPath,String msgBody)
	{
		try
		{
		   Properties props = new Properties();
		   props.put("mail.smtp.auth", "true");
		   props.put("mail.smtp.starttls.enable", "true");
		   props.put("mail.smtp.host", "smtp.gmail.com");
		   props.put("mail.smtp.port", "587");
		   
		   Session session = Session.getInstance(props, new javax.mail.Authenticator() {
		      protected PasswordAuthentication getPasswordAuthentication() {
		         return new PasswordAuthentication("yogesh3437@gmail.com", "xxxxx");
		      }
		   });
		   Message msg = new MimeMessage(session);
		   msg.setFrom(new InternetAddress("yogesh3437@gmail.com", false));
		   
		   msg.setRecipients(Message.RecipientType.TO, InternetAddress.parse(toEmailID));
		   msg.setSubject("Tutorials point email");
		   msg.setContent("Tutorials point email", "text/html");
		   msg.setSentDate(new Date());
		   
		   MimeBodyPart messageBodyPart = new MimeBodyPart();
		   messageBodyPart.setContent(msgBody, "text/html");

		   Multipart multipart = new MimeMultipart();
		   multipart.addBodyPart(messageBodyPart);
		   MimeBodyPart attachPart = new MimeBodyPart();

		   attachPart.attachFile(attachmentPath);
		   multipart.addBodyPart(attachPart);
		   msg.setContent(multipart);
		   Transport.send(msg);   
		
		}
		catch (Exception e) 
		{
			System.out.println("ERROR IN SENDING MAIL TO : "+toEmailID);
		}
	}	
}
