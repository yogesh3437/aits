package com.aits.yb.appointment;

import java.sql.Connection;
import java.sql.Statement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class AppointmentDAOImpl implements AppointmentDAO 
{

	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@Transactional
	@Override
	public String saveDetailsForScheduleAppointment(AppointmentModel appointmentmodel) 
	{
		String output = "ERROR";
		Statement stmt = null;
		String 	mobileNo 	  =  appointmentmodel.getMobileNo()!=null && appointmentmodel.getMobileNo().length()>0 ? appointmentmodel.getMobileNo().trim():"0";
		int 	doctorId 	  =  appointmentmodel.getDoctorId();
		String 	emailId 	  =  appointmentmodel.getEmailId()!=null && appointmentmodel.getEmailId().length()>0 ? appointmentmodel.getEmailId().trim():"-";
		
		String 	patientName   =  appointmentmodel.getPatient_name()!=null && appointmentmodel.getPatient_name().length()>0 ? appointmentmodel.getPatient_name().trim():"-";
		String 	patientAge 	  =  appointmentmodel.getPatient_age()!=null && appointmentmodel.getPatient_age().length()>0 ? appointmentmodel.getPatient_age().trim():"-";
		String 	address 	  =  appointmentmodel.getPatient_addr()!=null && appointmentmodel.getPatient_addr().length()>0 ? appointmentmodel.getPatient_addr().trim():"-";
		String 	description   =  appointmentmodel.getPatient_desc()!=null && appointmentmodel.getPatient_desc().length()>0 ? appointmentmodel.getPatient_desc().trim():"-";
		String 	bloodGroup 	  =  appointmentmodel.getBloodGroup();
		String 	appDate 	  =  appointmentmodel.getDateOfAppointment();
		
		String fileName = "";
		
		if(!appointmentmodel.getFile().isEmpty())
		{
			fileName = appointmentmodel.getFile().getOriginalFilename();
			
		}
		
		Connection connection = null;
		try
		{
			connection = jdbcTemplate.getDataSource().getConnection();
			
			StringBuilder qString = new StringBuilder();
			
			qString.append(	"	insert into test.appointment " + 
					"	(patient_name, " + 
					"	patient_age, " + 
					"	mobileNo, " + 
					"	emailId, " + 
					"	address, " + 
					"	description, " + 
					"	bloodGroup, " + 
					"	doctorId, " + 
					"	doc_file_path, " + 
					"	appointmentDate" + 
					"	)" + 
					"	values" + 
					"	('"+patientName+"', " + 
					"	'"+patientAge+"', " + 
					"	'"+mobileNo+"', " + 
					"	'"+emailId+"', " + 
					"	'"+address+"', " + 
					"	'"+description+"', " + 
					"	'"+bloodGroup+"', " + 
					"	"+doctorId+", " + 
					"	'"+fileName+"', " + 
					"	"+appDate+")" );
			stmt = connection.createStatement(  );
			int  rslt = stmt.executeUpdate(qString.toString()); 
			if(rslt>0)
			{
				output = "PASS.APPOINTMENT SCHEDULED SUCCESSFULLY ON "+appDate;
			}
			else
			{
				output = "FAIL.UNABLE TO SCHEDULE YOUR APPINTMENT , PLEASE TRY AGAIN LATER.";
			}
			
		}
		catch (Exception e) 
		{
			 System.out.print(Thread.currentThread().getStackTrace()[1].getClassName());
			 System.out.print(Thread.currentThread().getStackTrace()[1].getMethodName()+" : "+e);
		}
		finally
        {
       	 try 
       	 { 
	        	if(connection!= null)
	        	{
	 				connection.close();
	 			}
	 			
       	 }
       	catch (Exception e)
    		{
    			System.out.print(Thread.currentThread().getStackTrace()[1].getClassName());
    			System.out.print(Thread.currentThread().getStackTrace()[1].getMethodName()+" : "+e);
    			
    		}
        }    
		  return output;
	}
	

}
