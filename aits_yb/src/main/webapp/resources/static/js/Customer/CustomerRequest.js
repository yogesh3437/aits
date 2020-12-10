// JavaScript Document

function generateCustomerRequest()
{
	var	mobileNo		=	trim($("[name=mobileNo]").val());
	var	reference	=	trim($("[name=reference]").val());
	var	expectedDate		=	trim($("[name=expectedDate]").val());
	var	requestFor	=	$("[name=requestFor]").val();
	
	if(mobileNo == "")
	{
		showWarningAlert("Please enter Mobile No.",$("[name=mobileNo]"));
		return false;
	}
	if(!validateMobileNo(document.CustomerRequestModel.mobileNo))
	{
		return false;	
	}
	if(requestFor == "" || requestFor == undefined)
	{
		showSelect2WarningAlert("Please select Request For.",$("[name=requestFor]"));
		return false;
	}
	
	if(expectedDate == "")
	{
		showWarningAlert("Please enter Expected Date.",$("[name=expectedDate]"));
		return false;
	}
	var requestForName		= $("[ name=requestFor ] option:selected").text()
	
	$("[name=requestForName]").val(requestForName);
	$("#btnGenerate").attr("disabled",true);
	$("#btnClear").attr("disabled",true);
	$("[name=reqCode]").val("generateCustomerRequest");
	$("[name=CustomerRequestModel]").submit();	
}

function clearForm()
{
	$("[name=mobileNo]").val("");
	$("[name=reference]").val("");
	$("[name=expectedDate]").val("");
	$("[name=requestFor]").val("0").trigger("change");
	$("[name=expectedDate]").data('datepicker').setDate(null);
	$("[name=mobileNo]").focus();
}

function searchCustomerRequest()
{
	$("#btnSearch").attr("disabled",true);
	$("#btnClear").attr("disabled",true);
	$("[name=reqCode]").val("getCustomerRequestListDetails");
	$("[name=CustomerRequestModel]").submit();
}


function clearListPage()
{
	$("[name=expectedDate]").val("");
	$("[name=requestFor]").val("0").trigger("change");
	$("[name=status]").val("").trigger("change");
	$("[name=expectedDate]").data('datepicker').setDate(null);
	$("#divList").hide();
}

function processCustomerRequestAs(lineId,requestAs)
{
	var tmpVariable = "";
	if(requestAs == "ARRIVED")
	{
		tmpVariable = "send SMS to Customer , that their Product is ready";
	}
	else if(requestAs == "CLOSED")
	{
		tmpVariable = "Close Request"
	}
	else if(requestAs == "REJECTED")
	{
		tmpVariable = "Reject Request"
	}
	
	bootbox.confirm("Are you sure, you want to "+tmpVariable+"?",function(result)
	{															 
		if(result)
		{
			$("[name=mode]").val(requestAs);
			$("[name=customerRequestId]").val(lineId);
			$("[name=reqCode]").val("markCustomerRequestAs");
			$("[name=CustomerRequestModel]").submit();
		}
			  
	});
	
}

function requestForValChanged()
{
	var requestFor = $("[name=requestFor]").val();
	var requestForName		= $("[ name=requestFor ] option:selected").text();
	
	if(requestFor == "0" || requestFor == undefined)
	{
		$("[name=requestForName]").val("");
	}
	else
	{
		$("[name=requestForName]").val(requestForName);
	}

}

