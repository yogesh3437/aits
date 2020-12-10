package com.aits.yb.appointment;

import org.springframework.web.multipart.MultipartFile;

public class AppointmentModel 
{
	private int appointmentId;
	
	private String patient_name;
	private String mobileNo;
	private String emailId;
	private int doctorId;
	private String patient_age;
	private String patient_desc;
	private String dateOfAppointment;
	private String status;
	private String bloodGroup;
	private String patient_addr;
	private MultipartFile  file;
	
	
	public int getAppointmentId() {
		return appointmentId;
	}
	public void setAppointmentId(int appointmentId) {
		this.appointmentId = appointmentId;
	}
	public String getPatient_name() {
		return patient_name;
	}
	public void setPatient_name(String patient_name) {
		this.patient_name = patient_name;
	}
	public String getMobileNo() {
		return mobileNo;
	}
	public void setMobileNo(String mobileNo) {
		this.mobileNo = mobileNo;
	}
	public String getEmailId() {
		return emailId;
	}
	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}
	public int getDoctorId() {
		return doctorId;
	}
	public void setDoctorId(int doctorId) {
		this.doctorId = doctorId;
	}
	public String getPatient_age() {
		return patient_age;
	}
	public void setPatient_age(String patient_age) {
		this.patient_age = patient_age;
	}
	public String getPatient_desc() {
		return patient_desc;
	}
	public void setPatient_desc(String patient_desc) {
		this.patient_desc = patient_desc;
	}
	public String getDateOfAppointment() {
		return dateOfAppointment;
	}
	public void setDateOfAppointment(String dateOfAppointment) {
		this.dateOfAppointment = dateOfAppointment;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public MultipartFile getFile() {
		return file;
	}
	public void setFile(MultipartFile file) {
		this.file = file;
	}
	public String getBloodGroup() {
		return bloodGroup;
	}
	public void setBloodGroup(String bloodGroup) {
		this.bloodGroup = bloodGroup;
	}
	public String getPatient_addr() {
		return patient_addr;
	}
	public void setPatient_addr(String patient_addr) {
		this.patient_addr = patient_addr;
	}	
	
	
	
	
	
}
