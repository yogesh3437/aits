var left;
var top;
var height;
var	responceWaiting	=	false;

function showPos(element)
{
	/*
    left = element.offsetLeft;
	top  = element.offsetTop;
	height= element.offsetHeight;
	*/
	
	left = $(element).position().left;
	top = $(element).position().top;
	height = $(element).position().height;
	/*
	while(element=element.offsetParent)
    {
        left += element.offsetLeft;
        top  += element.offsetTop;
    }
*/
	document.body.onclick= hideTTS;	
}

function trim(str)
{
	return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}

function checkenter(event)
{	
	 if(window.event) 
	 {
		keychar = String.fromCharCode(event.keyCode)
		
		if (event.keyCode ==13)
			  return false;     
	 }
	 if(event.which)
	 {
	   if (event.which ==13)
			return false;     
	 }
}	

function hideTTS(eObj)
{
	var is_chrome 	= navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
	var is_firefox	= navigator.userAgent.indexOf("Firefox") > -1;
	
	if(is_chrome == true)
	{
		var e = (window.event);	
		if(typeof(e.target) != "undefined")
		{
			if(e.target.parentNode.className != "multilist")
			{		
				hideAjaxDiv();		
			}else
			{
				checkAjaxDiv();
			}
		}
	}else if(is_firefox == true)
	{
	    if(typeof(eObj.target) != "undefined")
		{
			if(eObj.target.parentNode.className != "multilist")
			{		
				hideAjaxDiv();		
			}else
			{
				checkAjaxDiv();
			}
		}
	}else
	{
		var e = (window.event);	
		if(typeof(e.target) != "undefined")
		{
			if(e.target.parentNode.className != "ajaxDiv")
			{		
				hideAjaxDiv();		
			}else
			{
				checkAjaxDiv();
			}
		}
		if(e.srcElement.parentNode.className != "ajaxDiv")
		{		
			hideAjaxDiv();		
		}else
		{
			checkAjaxDiv();
		}
	}
}

function hideAjaxDiv()
{
	var allDivTags=document.getElementsByTagName("div");

	for (i=0; i<allDivTags.length; i++) 
	{
		if(allDivTags[i].className=="ajaxDiv") 
		{
			allDivTags[i].style.display = "none";
			allDivTags[i].innerHTML = "";
		}
	}
}

function checkAjaxDiv()
{
	/*var obj = document.activeElement;	
	if(obj.className != "multilist")
	{
		hideAjaxDiv();		
	}	*/
}
/**
* Provide JSON Array Of JSON Object with key value and name respectively
* DDList    : JSON Array
* fieldName : Name of Select DD
*/
function fillDDUsingArray(DDList,fieldName)
{	
	if(fieldName != "")
	{
		$("[name="+fieldName+"] options").length 	= 1;	
		if(DDList.length > 0)
		{
			for(var i=0;i<DDList.length;i++)
			{	
				$("[name="+fieldName+"]").append("<option value=\""+DDList[i].value+"\">"+DDList[i].name+"</option>");			
			}
		}
	}else
	{
		bootbox.alert("Field Name Not Provided.");
	}
}

function fillDDUsingArrayWithHiddenAllowDecimal(DDList,collection,fieldName)
{	
	if(fieldName != "")
	{
		$("[name="+fieldName+"] options").length 	= 1;	
		if(DDList.length > 0)
		{
			var textForAllowDcml = "";
			for(var i=0;i<DDList.length;i++)
			{	
				var tmpStrArr = DDList[i].value.split("#@#");
				$("[name="+fieldName+"]").append("<option value=\""+tmpStrArr[0]+"\">"+DDList[i].name+"</option>");	
				
				
				textForAllowDcml = "<input type='hidden' value=\""+tmpStrArr[1]+"\" name=isAllowDecimalWithSrNo"+tmpStrArr[0]+"\"/>";
				
			}
			
			$("#divTmpData"+collection).html(textForAllowDcml);
		}
	}else
	{
		bootbox.alert("Field Name Not Provided.");
	}
}

function restrict4SpecialChar(obj)
{
	var result = true;	
	var string = obj.value.length;	
	var val	   = obj.value;		
	var iChars = "\"\'\\\/";
	for (var i = 0; i < string; i++) 
	{
		if (iChars.indexOf(val.charAt(i)) != -1)
		{
			var  objname = obj.name;
			showCommonWarningAlert("Special Characters  \\ \/ \' \"  Not Allowed.",$("[name="+objname+"]"));
			
			/*bootbox.alert('Special Characters  \\ \/ \' \"  Not Allowed.');
			obj.focus();
			obj.select();*/
			result = false;
			break;
		}
	}
	return result;	
}
function textAreaMaxlength(field , maxlen)
{
	if(field.value.length > maxlen)
	{
		while(field.value.length > maxlen)
		{
			field.value	=	field.value.replace(/.$/,'');
		}
	}	
}
function showProcessing(elementId)
{	
	document.getElementById(elementId).innerHTML ='<img src="images/ajax-loading.gif" style="vertical-align:middle; background-color:#CCCCCC;filter:alpha(opacity=80); width:30px;height:30px;border:0;" />';
	document.getElementById(elementId).style.display	=	'block';
}


function validateEmailID(obj)
{

		var	str =	trim(obj.value);
		if(str == "")
		{
			obj.value = "";
			return true;	
		}
		
		var at="@"
		var dot="."
		var lat=str.indexOf(at)
		var lstr=str.length
		var ldot=str.indexOf(dot)
		if (str.indexOf(at)==-1){
		   bootbox.alert("Invalid E-mail ID.");
		   obj.select();
		   obj.focus();
		   return false
		}

		if (str.indexOf(at)==-1 || str.indexOf(at)==0 || str.indexOf(at)==lstr){
		   bootbox.alert("Invalid E-mail ID.");
		   obj.select();
		   obj.focus();
		   return false
		}

		if (str.indexOf(dot)==-1 || str.indexOf(dot)==0 || str.indexOf(dot)==lstr){
		    bootbox.alert("Invalid E-mail ID.");
			obj.select();
		    obj.focus();
		    return false
		}

		 if (str.indexOf(at,(lat+1))!=-1){
		    bootbox.alert("Invalid E-mail ID.");
			obj.select();
		   obj.focus();
		    return false
		 }

		 if (str.substring(lat-1,lat)==dot || str.substring(lat+1,lat+2)==dot){
		    bootbox.alert("Invalid E-mail ID.");
			obj.select();
		   obj.focus();
		    return false
		 }

		 if (str.indexOf(dot,(lat+2))==-1){
		    bootbox.alert("Invalid E-mail ID.");
			obj.select();
		   obj.focus();
		    return false
		 }
		
		 if (str.indexOf(" ")!=-1){
		    bootbox.alert("Invalid E-mail ID.");
			obj.select();
		   obj.focus();
		    return false
		 }
		  if (str.indexOf(dot) == (lstr-1)){
		    bootbox.alert("Invalid E-mail ID.")
		    return false
		 }
		 if(str.charAt(lstr-1) == "." )
		 {
			bootbox.alert("Invalid E-mail ID.")
		    return false 
		 }

 		 return true					
}
/*
	InPut String like 	'\\'\\\/\x22><' 
*/
function restrictSuggestedCharacters(obj,restictCharString)
{
	var result	 	= true;	
	var string	 	= obj.value.length;	
	var val	   	 	= obj.value;		
	var iChars	 	= restictCharString;
	for (var i = 0; i < string; i++) 
	{
			if (iChars.indexOf(val.charAt(i)) != -1)
			{
				bootbox.alert('Special Characters  '+restictCharString+'  Not Allowed.');
				obj.focus();
				obj.select();
				result = false;
				break;
			}
	}
	return result;	
}

function arrowKeyFunctionForTTS(event,ajaxDivId)
{
	var 	keyvalue		=	event.keyCode;
	if(document.getElementById(ajaxDivId).options.length > 0  )
	{	
		var 	keyvalue		=	event.keyCode;
		var		selectedIndex	=	document.getElementById(ajaxDivId).selectedIndex;		
		if(keyvalue == 40)
		{
			selectedIndex	=	selectedIndex + 1;
			if(selectedIndex < document.getElementById(ajaxDivId).options.length)
			{
				document.getElementById(ajaxDivId).options[document.getElementById(ajaxDivId).selectedIndex+1].selected	=	true;
			}
		}else if(keyvalue == 38)
		{
			if(selectedIndex > 0)
			{			
				document.getElementById(ajaxDivId).options[document.getElementById(ajaxDivId).selectedIndex-1].selected	=	true;	
			}
		}
	}
}

function blockAllKeyOnDatePicker(event,obj)
{	
	var keyvalue	=	event.charCode ? event.charCode : event.keyCode;
	if(keyvalue != 46 && keyvalue != 16) 
	{
		 if(keyvalue == 9) 
		 {
            obj.value += "";            
		 }else
		 {
			return false;         
		 }		 
    }	
}

function allowOnlyFloatGreaterZero(obj)
{
	var flag	=	true;
	var val = trim(obj.value);
	if (isNaN(val))
	{
		bootbox.alert("Please Enter Proper Numeric Value.");
		obj.value="";
		obj.focus();
		obj.select();
		return false;
	}
	if(parseFloat(val) <= 0)
	{
		bootbox.alert("Entered Value Should Be Greater Than Zero.");
		obj.value="";
		obj.focus();		
		return false;
	}else{
		return flag;	
	}
	
}

function allowIntegerGreaterThanZero(obj)
{     
	var flag	=	true;
	var objname = obj.name;
	var val = trim(obj.value);
	if(val== null)
	{
			flag	=	false;
			return flag;
	}
	if (val.length == 0)
	{
			flag	=	false;
			return flag;
	}
	if(val <= 0)
	{
		showWarningAlert("Please Enter Value Greater Than Zero.",$("[name="+objname+"]"));
		/*bootbox.alert("Please Enter Value Greater Than Zero.");
		obj.value="";
		obj.focus();*/
		flag	=	false;
		return flag;
	}
	else
	{
		for (var i = 0; i < val.length; i++) 
		{
			var ch = val.charAt(i) 
			if (ch < "0" || ch > "9") 
			{           
				showWarningAlert("Please Enter Only Whole Number.",$("[name="+objname+"]"));
				/*bootbox.alert("Please Enter Only Whole Number.");
				obj.value="";
				obj.focus();*/
				flag	=	false;
				break;
			}
		}  
		return flag;
	}
}

function nextFocus(element)
{
	if(element != undefined)
	{
		var focusables = $(":focusable");
		var current = focusables.index(element),
		next = focusables.eq(current + 1).length ? focusables.eq(current + 1) : focusables.eq(0);
		next.focus();
	}
}

function compareDate(fromDate,toDate)
{
	var fromdateArray 		=	new Array();
	var from_date_month 	= 	"";
	var from_date_day 		= 	"";
	var from_date_year 		= 	"";
	
	var to_date_month 		= 	"";
	var to_date_day 		= 	"";
	var to_date_year 		=	"";
	
	fromdateArray 			=	 fromDate.split("/");
	//d-m-y
	from_date_month 		= 	fromdateArray[1];
	from_date_day			= 	fromdateArray[0];
	from_date_year 			=	fromdateArray[2];
	
	fromdateArray 			= 	toDate.split("/");
	
	to_date_month 			=	fromdateArray[1];
	to_date_day 			= 	fromdateArray[0];
	to_date_year 			= 	fromdateArray[2];
		
	if(parseInt(from_date_year,10) < parseInt(to_date_year,10))
	{
		return false;
	}
	if(parseInt(from_date_year,10) > parseInt(to_date_year,10))
	{
		return true;
	}
	
	if( parseInt(from_date_month,10) < parseInt(to_date_month,10) )
	{
		return false;
	}	
	
	if( parseInt(from_date_month,10) > parseInt(to_date_month,10) )
	{
		return true;
	}	
	
	if(	parseInt(from_date_day,10) <= parseInt(to_date_day,10) )	
	{		
		return false;
	}
	
	return true; 	
}

function closeWaitingImgModalDialog(divId)
{
	responceWaiting		=	false;
	$("#"+divId).dialog("close");	
	$(".ui-dialog-titlebar").show();
}

function openWaitingImgModalDialog(divId)
{
	var	modalDialogHeight	=	250;
	if ($.browser.msie) 
	{
	  modalDialogHeight 	=	460;
	}
	$("#"+divId).dialog({close:"",width:250,height:modalDialogHeight,resizable: false,beforeclose:function()
																							{ 
																								if(responceWaiting)
																								{
																									return false;
																								}
																								return true;
																							}
								});	
	$("#"+divId).dialog("open");
	$(".ui-dialog-titlebar").hide();
}

/*function allowOnlyFloatGreaterEqualsZero(obj)
{
	var val = trim(obj.value);
	if (isNaN(val))
	{
		bootbox.alert("Please Enter Proper Numeric Value.");
		obj.value="";
		obj.focus();
		obj.select();
		return false;
	}
	if(parseFloat(val) < 0)
	{
		bootbox.alert("Entered Value Should Be Greater Than Or Equals To Zero.");
		obj.value="";
		obj.focus();		
		return false;
	}
	
}*/

function OpenWindowWithPost(url, windowoption, name, params,blankPage)
{
	var form = document.createElement("form");
	form.setAttribute("method", "post");
	form.setAttribute("action", url);
	form.setAttribute("target", name);

	for (var i in params) 
	{
		if (params.hasOwnProperty(i)) {
			var input = document.createElement('input');
			input.type = 'hidden';
			input.name = i;
			input.value = params[i];
			form.appendChild(input);
		}
	}

	document.body.appendChild(form);
	
	window.open(blankPage, name,windowoption);
	
	form.submit();
	document.body.removeChild(form);
}

function validateMobileNo(obj)
{
	var m 		= trim(obj.value);
	var flag 	= false;
	
	if(m.length > 0)
	{
		if(m.indexOf(",") == -1)
		{
			if(isNaN(m))
			{
				bootbox.alert("Mobile No Should Contain Only Digits.");
				obj.select();
				return false;
			}
			if(m.length != 10)
			{
				bootbox.alert("Mobile No Should Be Of 10 Digits.");
				obj.select();
				return false;
			}
			
		}else
		{
			var mo = m.split(",");
			
			for(var i=0;i<mo.length;i++)
			{
				if(isNaN(trim(mo[i])))
				{
					bootbox.alert("Mobile No Should Contain Only Digits.");
					obj.select();
					return false;
				}				
				if(trim(mo[i]).length != 10)
				{
					bootbox.alert("Each Mobile No Should Be Of 10 Digits.");
					obj.select();
					return false;
				}				
			}
		}
	}
	return true;	
}

function validatePinCode(obj)
{      
	var val = trim(obj.value);
	if(val==null)
	{
			return false;
	}
	if (val.length==0)
	{
		return false;
	}
	if(val.length < 6 || val.length > 10)
	{
			bootbox.alert("Please Enter Valid Pin Code.");
			obj.value="";
			obj.focus();
			return false;
	}
	for (var i = 0; i < val.length; i++) 
	{
		var ch = val.charAt(i) 
		if (ch < "0" || ch > "9") 
		{           
			bootbox.alert("Please Enter Valid Pin Code.");
			obj.value="";
			obj.focus();
			return false;
		}      
	}   
}
function allowOnlyPercentageGreaterThanZero(obj)
{
	var	result	=	true;
	var val = trim(obj.value);
	if (isNaN(val))
	{
		bootbox.alert("Please Enter Proper Numeric Value.");
		obj.value	=	"";
		obj.focus();
		result	=	false;
	}
	if(parseFloat(val) <= 0)
	{
		bootbox.alert("Entered Value Should Be Greater Than Zero.");
		obj.value	=	"";
		obj.focus();		
		result	=	false;
	}
	if(parseFloat(val) > 100)
	{
		bootbox.alert("Entered Value Should Be Less Than Or Equal To 100.");
		obj.value	=	"";
		obj.focus();		
		result	=	false;
	}
	return result;
}

function allowOnlyFloatGreaterEqualsZero(obj)
{
	var val = trim(obj.value);
	if (isNaN(val))
	{
		var  objname = obj.name;
		showWarningAlert("Please Enter Proper Numeric Value.",$("[name="+objname+"]"));	
		//	obj.value="";
		//bootbox.alert("Please Enter Proper Numeric Value.");
		//obj.value="";
		//obj.focus();
		//obj.select();
		return false;
	}
	if(parseFloat(val) < 0)
	{
		var  objname = obj.name;
		showWarningAlert("Entered Value Should Be Greater Than Or Equals To Zero.",$("[name="+objname+"]"));
		//obj.value="";
		
		/*bootbox.alert("Entered Value Should Be Greater Than Or Equals To Zero.");
		
		obj.focus();	*/	
		return false;
	}
}

function validateDate(obj)
{
	var validformat=/^\d{2}\/\d{2}\/\d{4}$/ //Basic check for format validity
	var dataValue	=	trim(obj.value);
	if(dataValue.length > 0)
	{
		if (!validformat.test(dataValue))
		{
			bootbox.alert("Invalid Date Format. Please Correct Date Format.")
			obj.focus();
			return false;
		}else
		{
			
			var dayfield	=	obj.value.split("/")[0]
			var monthfield	=	obj.value.split("/")[1]		
			var yearfield	=	obj.value.split("/")[2]
			var dayobj 		=	new Date(yearfield, monthfield-1, dayfield)
					
			if (dayobj.getDate()!=dayfield)
			{
				bootbox.alert("Invalid Day Range detected. Please Correct.");
				obj.focus();
				return false;
			}else if (dayobj.getMonth()+1!=monthfield)
			{
				bootbox.alert("Invalid Month Range detected. Please Correct.");
				obj.focus();
				return false;
			}else if (dayobj.getFullYear()!=yearfield)
			{
				bootbox.alert("Invalid Year Range detected. Please Correct.");
				obj.focus();
				return false;
			}else
			{
				return true;	
			}
		}
	}
}
function checkPhoneNumber(obj)
{
	var result = true;
	var val    = trim(obj.value);
	
	var string = val.length;	
	//var iChar = /^\(?\ ?\+?\d+\ ?\)?\ ?\-?\d+$/;
	var iChar = /^[0-9]+\d$/;
	
	if(val.length > 0)
	{
		if (!iChar.test(val)) 
		{
			  /* bootbox.alert("Please Enter In Proper Number Format. For example : (022)1234567 or +919812345678 or 022-123456");*/
			  bootbox.alert("Please Enter In Proper Number Format. For example : 0221234567 or 919812345678 ");
			  // obj.select();
			   obj.value="";
			   obj.focus();
			   return false;
		}
		result =  true;
	}else
	{
		result =  true;
	}
	return result;
}
function allowOnlyWholeNumber(e)
{
	var val = trim(e.value);
	if (isNaN(val))
	{
		bootbox.alert("Please Enter Proper Numeric Value.");
		e.value="";
		return false;
	}
	else 
	{
		var flag = true;
		for (var i = 0; i < val.length; i++) 
		{
			var ch = val.charAt(i) 
			if (ch < "0" || ch > "9") 
			{           
				bootbox.alert("Please Enter Only Whole Number.");
				e.value="";
				flag	=	false;
				break;
			}
		}  
		return flag;
		
	}
}

function validatePAN(Obj) 
{
   if (Obj == null) Obj = window.event.srcElement;
	   if (trim(Obj.value) != "") 
	   {
            ObjVal = Obj.value;
            var panPat = /^([a-zA-Z]{5})(\d{4})([a-zA-Z]{1})$/;
            var code = /([C,P,H,F,A,T,B,L,J,G,c,p,h,f,a,t,b,l,j,g])/;
            var code_chk = ObjVal.substring(3,4);
            if (ObjVal.search(panPat) == -1) 
			{
                bootbox.alert("Invalid Pan No");
                Obj.focus();
                return false;
            }
            if (code.test(code_chk) == false) 
			{
                bootbox.alert("Invaild PAN Card No.");
				Obj.focus();
                return false;
            }
			return true;
        }
		else
		{
			Obj.value = "";
			return true;	
		}
}

function dateDiffInDays(fromDate,toDate,noOfDays)
{
	var one_day		=	1000*60*60*24;
	var fDateArr	=	fromDate.split("/");
	var fDate		=	new Date(fDateArr[2],fDateArr[1],fDateArr[0]);
	var tDateArr	=	toDate.split("/");
	var tDate		=	new Date(tDateArr[2],tDateArr[1],tDateArr[0]);
	var dayDateDiff	=	Math.ceil((tDate.getTime()-fDate.getTime())/(one_day));

	if((parseInt(dayDateDiff) >= parseInt(noOfDays,10)) || parseInt(dayDateDiff) < 0)
	{
		bootbox.alert("Difference Between From Date And To Date Should Not Greater Than "+noOfDays+" Days.");
		return false;
	}else
	{
		return true;
	}
	
}
function validateGSTIN(obj)
{
	//var regularExp = /^([0-9]{2}[a-z]{4}([a-z]{1}|[0-9]{1}).[0-9]{3}[a-z]([a-z]|[0-9]){3})$/;
	var regularExp = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
	
	/*/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}Z[0-9]{1}/;*/
	
	var gstin	=	trim(obj.value);
	if(gstin.length > 0)
	{
		if(gstin == "-")// if "-" is entered then gstin validation except
		{
			return true;
		}
		else
		{
			if (!regularExp.test(gstin)) 
			{
				bootbox.alert("Invalid GSTIN Format.");
				//obj.value="";
				obj.focus();
				return false;
			}
			else
			{
				return true;	
			}
		}
	}
	else
	{
		//obj.value="";
		obj.focus();
		return false;
	}
}
function allowOnlyPercentageGreaterEqualsZero(obj)
{
	var	result	=	true;
	var val = trim(obj.value);
	if (isNaN(val))
	{
		bootbox.alert("Please Enter Proper Numeric Value.");
		obj.value	=	"";
		obj.focus();
		result	=	false;
	}
	if(parseFloat(val) < 0)
	{
		bootbox.alert("Entered Value Should Be Greater Than Or Equals Zero.");
		obj.value	=	"";
		obj.focus();		
		result	=	false;
	}
	if(parseFloat(val) > 100)
	{
		bootbox.alert("Entered Value Should Be Less Than Or Equal To 100.");
		obj.value	=	"";
		obj.focus();		
		result	=	false;
	}
	return result;
}

function roundToTwo(num) {    
	return +(Math.round(num + "e+2")  + "e-2");
    
}

function allowOnlyWholeNumberWithSign(e)
{
	var tempval 	= trim(e.value);
	var sign    	= tempval.substring(0,1)
	var val		 	= "";
	if(sign!="" && sign=="-")
	{
		val=tempval.substring(1,tempval.length)
		
	}else if(sign!="" && sign=="+")
	{
		val=tempval.substring(1,tempval.length)
			
	}else
	{
		val=tempval;
	}
		
		
		if (isNaN(val))
		{
			bootbox.alert("Please Enter Proper Numeric Value.");
			e.value="";
			return false;
		}
		else 
		{
			var flag = true;
			for (var i = 0; i < val.length; i++) 
			{
				var ch = val.charAt(i) 
				if (ch < "0" || ch > "9") 
				{           
					bootbox.alert("Please Enter Only Whole Number.");
					e.value="";
					flag	=	false;
					break;
				}
			}  
			
		  return flag;
			
		}
}

function allowOnlyFloatValue(obj)
{
	var val = trim(obj.value);
	if (isNaN(val))
	{
		var  objname = obj.name;
		showWarningAlert("Please Enter Proper Numeric Value.",$("[name="+objname+"]"));	
		return false;
	}
}

function allowNegativeNumber(e) 
{
  var charCode = (e.which) ? e.which : event.keyCode
  if (charCode > 31 && (charCode < 45 || charCode > 57 )) {
    return false;
  }
  return true;
    
}


function showMyYouTubeVideo()
{	  
	myYouTubeVideo.style.display = "block";		
}

function closemyYouTubeVideo()
{
	 $('.youtube-iframe').each(function(index) {
        $(this).attr('src', $(this).attr('src'));
        return false;
      });
	 
	myYouTubeVideo.style.display = "none";		
}


