<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %> 
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<jsp:include page="/WEB-INF/jsp/header.jsp"></jsp:include>
<c:set var="contextPath" value="${pageContext.request.contextPath}"/>

<script language="JavaScript" src="${contextPath }/js/common.js" type="text/javascript"></script>
<script language="JavaScript" src="${contextPath }/js/prototype.js" type="text/javascript"></script> 
<spring:url value="/doctor/schedule_appointment" var="generateURL" />

<form:form modelAttribute="appointmentModel" method="post" action="${generateURL }"  autocomplete="off" enctype="multipart/form-data" >
	
	<h2 >
	Appointment Form
	</h2>
	
	<div class="card">	
		<jsp:include page="../jsp/SaveResult.jsp" />
			<div class="row">
				<div class="col-md-10"><div class="description" style="margin-left: 10px;padding-top:7px;">Fields marked with <span class="requiredField">*</span> are mandatory.</div>
				<br>
				</div>
			</div>
			
		 	<div class="col-lg-12 mb-12">
			<div class="row">
		  		
		  			<div class="col-lg-3 mb-3">
					<div class="form-group required">
						<label>Patient Name <span class="requiredField">*</span></label>
						<form:input path="patient_name" title="Please enter Patient Name." class="form-control" />
						</div><!--Mobile No-->
					</div>
					
					<div class="col-lg-3 mb-3">
					<div class="form-group required">
						<label>Mobile No <span class="requiredField">*</span></label>
						<form:input path="mobileNo" class="form-control" id="mobileNo" />
						</div><!--Mobile No-->
					</div>
					
					<div class="col-lg-3 mb-3">
					<div class="form-group required">
						<label>Email Id </label>
						<form:input path="emailId" class="form-control" id="emailId" />
						</div><!--emailId No-->
					</div>
					
					
					<div class="col-lg-3 mb-3">
							<label>Doctor <span class="requiredField">*</span></label>
							 <form:select path="doctorId" class="form-control">
								<form:option value="0" label="--SELECT--"/>
								<form:options items="${doctorsList}"  />
							</form:select>
					</div>
					
					<div class="col-lg-3 mb-3">
					<div class="form-group required">
						<label>Patient Age <span class="requiredField">*</span></label>
						<form:input path="patient_age" title="Please enter Patient Age." class="form-control" />
						</div><!--Mobile No-->
					</div>
					
					<div class="col-lg-3 mb-3">
							<label>Blood Group</label>
							 <form:select path="bloodGroup" class="form-control">
								<form:option value="-" label="--SELECT--"/>
								<form:options items="${bloodGroupList}"  />
							</form:select>
					</div>
					<div class="col-lg-3 mb-3">
					<div class="form-group required">
						<label>Patient Address</label>
						<form:input path="patient_addr" title="Please enter Patient Address." class="form-control" />
						</div><!--Mobile No-->
					</div>
					
					<div class="col-lg-3 mb-3">
						<div class="form-group required">
						<label>Description </label>
						<form:input path="patient_desc" id="patient_desc" title="Please enter Description." class="form-control form-control-user" maxlength="148" />
						</div><!--Description-->
					</div>
					
					<div class="col-lg-3 mb-3">
						<div class="form-group">
							<label>Appointment Date <span class="requiredField">*</span></label>
								<div class="input-daterange input-group" id="datepickerOne">
									<form:input path="dateOfAppointment" id="dateOfAppointment" class="form-control date-pick"  onkeydown="return blockAllKeyOnDatePicker(event,this)" />
								</div>
						</div><!--TO DATE-->
					</div>
					
					<div class="col-lg-3 mb-3">
						<div class="form-group">
							<label>Upload Document</label>
									<form:input type="file" id="file" path="file" />
						</div><!--TO DATE-->
					</div>
					
					
					
			</div>
			</div>
			<div class="col-lg-12 mb-12">
			<div class="row">
				<div class="col-lg-3 mb-3">
					
				<button type="submit"  class="btn btn-primary searchbtn" value="Generate" id="btnGenerate" >Schedule Appointment</button>&nbsp;
				
				</div>
			</div>
			</div>
			
		
	</div>					

</form:form>

<jsp:include page="/WEB-INF/jsp/footer.jsp"></jsp:include>
<script language="javascript">

var date = new Date();
	
$("#datepickerOne").datepicker({
		format	: 'dd/mm/yyyy',
		startDate : date
	 });
	
	$("#dateOfAppointment").on('changeDate', function (ev) {
                $(this).datepicker('hide');
            });

/* $('input').on('keypress', function (event) {
    var regex = new RegExp("^[a-zA-Z0-9 ]+$");
    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regex.test(key)) {
       event.preventDefault();
       return false;
    }
});
 */


</script>