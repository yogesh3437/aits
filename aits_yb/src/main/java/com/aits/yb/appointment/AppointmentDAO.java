package com.aits.yb.appointment;

import org.springframework.stereotype.Repository;

@Repository
public interface AppointmentDAO 
{
	String saveDetailsForScheduleAppointment(AppointmentModel appointmentmodel);
	

}
