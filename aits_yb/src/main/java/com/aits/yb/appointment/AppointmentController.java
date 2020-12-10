package com.aits.yb.appointment;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.aits.yb.aits_yb.EMAILService;

@Controller
@Component
@RequestMapping("/doctor")
public class AppointmentController 
{
		@Autowired
		AppointmentDAO appointmentDAO;
		@Autowired
		ServletContext context;
		@Autowired
		EMAILService emailService;
		
		private static String UPLOAD_FOLDER = "PATIENT_DOC";
		
		
		@RequestMapping("/appointment")
		public ModelAndView showSchedule_appointmentPage(Model model)
		{	 
			System.out.println("1");
			model.addAttribute("appointmentModel", new AppointmentModel()); 
			   
			Map<String, Object> map = new HashMap<String, Object>();
			    
		    Map<String, String> doctorsList = new HashMap<String, String>();
		    doctorsList.put("1", "DR-NILESH M (MD)");
		    doctorsList.put("2", "DR-AVINASH D (SURGEON)");
		    doctorsList.put("3", "DR-ABHI N (DENTIST)");
		    
			map.put("doctorsList", doctorsList);
		    
			
			 Map<String, String> bloodGroupList = new HashMap<String, String>();
			 bloodGroupList.put("A+", "A+");
			 bloodGroupList.put("A-", "A-");
			 bloodGroupList.put("B+", "B+");
			 bloodGroupList.put("B-", "B-");
			 bloodGroupList.put("AB+", "AB+");
			 bloodGroupList.put("AB-", "AB-");
			 bloodGroupList.put("O+", "O+");
			 bloodGroupList.put("O-", "O-");
			 
				map.put("bloodGroupList", bloodGroupList);
			   
				System.out.println("2");
			return new ModelAndView("DoctorAppointment", map);
		}
		
		
		@RequestMapping(value="/schedule_appointment" , method=RequestMethod.POST)
		public ModelAndView schedule_appointment(Model model , @ModelAttribute("appointmentModel") AppointmentModel appointmentModel)
		{
			String msgType = "";
			Map<String, Object> map = new HashMap<String, Object>();
			
			 Map<String, String> doctorsList = new HashMap<String, String>();
			 doctorsList.put("1", "DR-NILESH M (MD)");
			 doctorsList.put("2", "DR-AVINASH D (SURGEON)");
			 doctorsList.put("3", "DR-ABHI N (DENTIST)");
		   
			 map.put("doctorsList", doctorsList);
			    
			 Map<String, String> bloodGroupList = new HashMap<String, String>();
			 bloodGroupList.put("A+", "A+");
			 bloodGroupList.put("A-", "A-");
			 bloodGroupList.put("B+", "B+");
			 bloodGroupList.put("B-", "B-");
			 bloodGroupList.put("AB+", "AB+");
			 bloodGroupList.put("AB-", "AB-");
			 bloodGroupList.put("O+", "O+");
			 bloodGroupList.put("O-", "O-");
			 
			 map.put("bloodGroupList", bloodGroupList);
			 
			 String filePath = "";
			if(appointmentModel!=null)
			{
				
				if(appointmentModel.getPatient_name().isEmpty())
				{
					 map.put("msgType", "FAIL");
					 map.put("saveResult", "PLEASE PROVIDE PATIENT NAME.");
					
					 return new ModelAndView("DoctorAppointment", map);
				}
				if(appointmentModel.getDoctorId() == 0)
				{
					 map.put("msgType", "FAIL");
					 map.put("saveResult", "PLEASE PROVIDE DOCTOR.");
					
					 return new ModelAndView("DoctorAppointment", map);
				}
				if(appointmentModel.getMobileNo().isEmpty())
				{
					 map.put("msgType", "FAIL");
					 map.put("saveResult", "PLEASE PROVIDE MOBILE NO.");
					
					 return new ModelAndView("DoctorAppointment", map);
				}
				if(appointmentModel.getPatient_age().isEmpty())
				{
					 map.put("msgType", "FAIL");
					 map.put("saveResult", "PLEASE PROVIDE PATIENT AGE.");
					
					 return new ModelAndView("DoctorAppointment", map);
				}
				
				if(appointmentModel.getDateOfAppointment().isEmpty())
				{
					 map.put("msgType", "FAIL");
					 map.put("saveResult", "PLEASE PROVIDE APPOINTMENT DATE.");
					
					 return new ModelAndView("DoctorAppointment", map);
				}
				
				
			}
			
			String saveResult = appointmentDAO.saveDetailsForScheduleAppointment(appointmentModel);
			
			
		    if(saveResult != null && !saveResult.equalsIgnoreCase("ERROR"))
			{
				msgType 		= 	saveResult.substring(0,4);
				saveResult		=	saveResult.substring(5,saveResult.length());
				
				 map.put("msgType", msgType);
				 map.put("saveResult", saveResult);
				
			    if(msgType!=null && msgType.equalsIgnoreCase("PASS"))
			    {
			    	if (!appointmentModel.getFile().isEmpty()) 
					{
						//
						String absolutePath = context.getRealPath("resources/uploads");
						//File uploadedFile = new File(absolutePath, "your_file_name");
						File newPath = new File(absolutePath+"/"+appointmentModel.getMobileNo());
						if(!newPath.isDirectory())
						{
							newPath.mkdirs();
							System.out.println("mkdir");
						}
						
						try {
							// read and write the file to the selected location-
							byte[] bytes = appointmentModel.getFile().getBytes();
							Path path = Paths.get(absolutePath+"/"+appointmentModel.getMobileNo()+"/"+ appointmentModel.getFile().getOriginalFilename());
							//need to rename file name as random number or store within app id folder
							Files.write(path, bytes);

							System.out.println("file writes"+path);
							filePath = ""+path;
						} catch (IOException e) {

							System.out.println("exception");
							e.printStackTrace();
						}
					}
			    	
			    	
			    	if(!appointmentModel.getEmailId().isEmpty())
			    	{
			    		emailService.sendMail(appointmentModel.getEmailId(),filePath,"Hello "+appointmentModel.getPatient_name()+" your appointment is scheduled on "+appointmentModel.getDateOfAppointment()+" , Thanks you.");
			    		
			    	}
			    	
			    	model.addAttribute("appointmentModel", new AppointmentModel()); 					
				}
			}
		    
		    
		    return new ModelAndView("DoctorAppointment", map);
		}
		

}
