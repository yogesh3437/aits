<%
    String	saveResult	=	(String)request.getAttribute("saveResult");
	String	msgType		=	(String)request.getAttribute("msgType");
%>

<%if(saveResult!=null && saveResult.length() > 0)
{
	if(msgType.equalsIgnoreCase("PASS"))
	{
		%>
		<div class="alert alert-success" id="success-alert">
		  <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
		  <strong>SUCCESS!</strong> <%=saveResult%>
		</div>
		<%
	}
	else if(msgType.equalsIgnoreCase("FAIL"))
	{
		%>
		<div class="alert alert-warning" id="warning-alert">
			<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
			<strong>WARNING!</strong> <%=saveResult%>
		  </div>
		<%
	}
}
%>