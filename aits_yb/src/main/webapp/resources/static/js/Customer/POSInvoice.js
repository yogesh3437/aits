
function addItemInCart()
{
	
	var itemName = $("[name=itemName]").val();
	var itemNameText		= $("[ name=itemName ] option:selected").text()
	var quantity = $("[name=quantity]").val();
	var rate = $("[name=rate]").val();
	var discount = $("[name=discount]").val();
	
	if(rate=="" || rate==undefined)
	{
		showWarningAlert('Please enter Rate',$("[name=rate]"));
		return false;
		}
	if(parseFloat(rate) <= 0)
	{
		showWarningAlert('Rate must be greater than 0',$("[name=rate]"));
		return false;
	}
	
	if(quantity=="" || quantity==undefined)
	{
		showWarningAlert('Please enter Quantity',$("[name=quantity]"));
		return false;s
	}
	
	$("#btnAdd").attr("disabled",true);

		var reqCode		=	"addItemInCart";
		var url			=	"invoiceAction.do";
		$("#divLoading").show();
	  	
		new Ajax.Request
		  ( url , 
			  {
			  method: 'post',
			  parameters: { reqCode:reqCode,itemNameId:itemName,rate:rate,qty:quantity,oprFlag:'ADD',itemNameText:itemNameText,discountPercent:discount},
			  onSuccess: processItemDetails,
			  onFailure: function()
						  { 
							alert("There was an error with the connection.");
							$("#btnAdd").attr("disabled",false);
							$("#divLoading").hide();
						  }
						  
			  }
		   );
	
}

function processItemDetails(transport)
{	
	$("#btnAdd").attr("disabled",false);
	$("#divLoading").hide();
	var response 	= 	transport.responseText;
	var data		=	eval("("+response+")");    
    var cinfo		=	eval("("+data.DataInfo+")");	
	var msgType		=	trim(data.msgType);
	//var index		=	trim(data.index);
	var saveResult	=	trim(data.saveResult);
	var finalTotalAmt	=	data.finalTotalAmt;
	var roundOffVal				=	data.roundOffVal;
	var finalRoundedTotalAmt	=	data.finalRoundedTotalAmt;
	var isROEditable			=	"NO";
	
	var lastRecords	=	"";
	var cnt = 0;
	if(cinfo.length > 0)
	{
		var text	 =	"";
		text+='<table  class="table table-bordered"  id="collectionItemTable">';
		text+='<thead>';
		text+='<tr>';
		text+='<th>#</th>';
		text+='<th style="width:5%">Remove</th>';
		text+='<th>Product Name</th>';
		text+='<th>Quantity</th>';
		text+='<th>Rate</th>';
		text+='<th>Amount</th>';
		text+='<th>Discount(%)</th>';
		text+='<th>Discount Amt</th>';
		text+='<th>CGST(%)</th>';
		text+='<th>CGST Amt</th>';
		text+='<th>SGST(%)</th>';
		text+='<th>SGST Amt</th>';
		text+='<th>IGST(%)</th>';
		text+='<th>IGST Amt</th>';
		text+='<th>Total</th>';
		text+='</tr>';
		text+='</thead>';
		text+='<tbody>';
		for(var i=0;i<cinfo.length;i++)
			{
				
				text+='<tr>';
				text+='<td>'+(++cnt)+'</td>';
				
				text+='<td align="center"><a href="javascript:deleteItemDetails(\''+(i)+'\',\'DELETE\')" ><i class="fa fa-trash icons-gride-sb" aria-hidden="true"></i></a></td>';	
				
				text+='<td>'+cinfo[i].itemName+'</td>';
				text+='<td>'+cinfo[i].qty+'</td>';
				text+='<td>'+cinfo[i].rate+'</td>';
				text+='<td>'+cinfo[i].itemamount+'</td>';
				text+='<td>'+cinfo[i].discountP+'</td>';
				text+='<td>'+cinfo[i].discountA+'</td>';
				text+='<td>'+cinfo[i].cgstP+'</td>';
				text+='<td>'+cinfo[i].cgstA+'</td>';
				
				text+='<td>'+cinfo[i].sgstP+'</td>';
				text+='<td>'+cinfo[i].sgstA+'</td>';
				
				text+='<td>'+cinfo[i].igstP+'</td>';
				text+='<td>'+cinfo[i].igstA+'</td>';
				
				text+='<td>'+cinfo[i].finalAmount+'</td>';
				text+='</tr>';

			}
		text+='</tbody>';
		text+='</table>';
		
		$("#divListData").html(text);
		$("#divListData").show();
		$("#btnSubmit").show();
		
		$('#collectionItemTable').DataTable( {
			"paging":false
		});
		
		$("#totalAmt").html(finalTotalAmt);	
		
		if(isROEditable == "YES")
		{
			$("[name=roundOffAmt]").prop( "readonly", false );
		}
		else
		{
			$("[name=roundOffAmt]").prop( "readonly", true );
		}
		
		$("[name=roundOffAmt]").val(roundOffVal);
		$("[name=finalRoundedTotalAmt]").val(finalRoundedTotalAmt);
		
		newTotalAmt = finalRoundedTotalAmt;
		
		$("#rowOfFinalTotal").show();
		if(cnt == 0) // if all item deleted
		{
			$("#divListData").html("");
			$("#divListData").hide();
			$("#btnSubmit").hide();
			
			$("#totalAmt").html("");
			newTotalAmt = 0;
			$("#rowOfFinalTotal").hide();
			
		}
	}
	else
	{
		$("#divListData").html("");
		$("#divListData").hide();
		$("#btnSubmit").hide();
		
		$("#totalAmt").html("");
		newTotalAmt = 0;
		$("#rowOfFinalTotal").hide();
		
	}
	
	if(saveResult != "NOMSG" && msgType == "PASS")
	{
		$("[name=itemName]").val("").trigger("change");
		
		$("[name=rate]").val("");
		$("[name=quantity]").val("");
		$("[name=discount]").val("");		
	}
	else if(saveResult != "NOMSG" && msgType == "FAIL")
	{
		bootbox.alert(saveResult);
		return false;
	}		
}

function deleteItemDetails(index,deleteFlag){
	var reqCode		=	"addItemInCart";
	var url			=	"invoiceAction.do";
	$("#divLoading").show();
 
	new Ajax.Request
	  ( url , 
		  {
		  method: 'post',
		  parameters: { reqCode:reqCode,index:index,oprFlag:deleteFlag},
		  onSuccess: processItemDetails,
		  onFailure: function()
					  { 
						alert("There was an error with the connection.");
						$("#btnAdd").attr("disabled",false);
						$("#divLoading").hide();
					  }
					  
		  }
	   );
}

function roundOffAmtValChanged()
{
	var roundOffAmt = trim($("[name=roundOffAmt]").val());
	var totalAmt = $("#totalAmt").html();
			
	if(roundOffAmt != "")
	{
		var amt = parseFloat(totalAmt);
		if(parseFloat(roundOffAmt)<0)
		{
			amt = parseFloat(amt) - parseFloat(roundOffAmt);
		}
		else
		{
			amt = parseFloat(amt) + parseFloat(roundOffAmt);
		}
		$("[name=finalRoundedTotalAmt]").val(totalAmt);
	}
	else if(roundOffAmt == "")
	{
		$("[name=roundOffAmt]").val("0");
		var totalAmt = $("#totalAmt").html();
		$("[name=finalRoundedTotalAmt]").val(totalAmt);
		
	}
}


function resetSelectedItem()
{
	$("[name=quantity]").val("");
	$("[name=rate]").val("");
	$("[name=discount]").val("");
	$("[name=itemName]").val("").trigger("change");
}

function canCounterSales(){
	$('#btnCancel').attr('disabled',true);
	$('#btnSubmit').attr('disabled',true);	
	$("[name=reqCode]").val('showPOSInvoicePage');
	$('[name=InvoiceModel]').submit();
}

function itemNameValueChnaged()
{
	var itemName = $("[name=itemName]").val();
	
	if(itemName == "" || itemName == undefined)
	{
		$("[name=quantity]").val("");
		$("[name=rate]").val("");
		$("[name=discount]").val("");
		$("[name=purhasePrice").val("");
	}
	else
	{
		$("[name=purhasePrice").val("");
		getItemNameIdWiseRate();
	}
}


function getItemNameIdWiseRate()
{
	var	itemName	=	$("[name=itemName]").val();
	
	var reqCode		=	"getItemNameIdWiseRate";
	var url			=	"centralAction.do";
	
		$("#divLoading").show();
		$.ajax({
		
				type	:	'post',
				url		: 	url,
				async	:	true,
				data	:	{reqCode:reqCode,itemNameId:itemName},
				dataType: 	"json",
				success :	processItemNameValueChnaged,
				error 	:	function()
							{
								bootbox.alert("There was an error with the connection."); 
								$("#divLoading").hide();
							}
		});
	
}

function processItemNameValueChnaged(transport)
{
	$("#divLoading").hide();
	var data	 =	transport;
    var PURCHASE_PRICE =	data.PURCHASE_PRICE;
	var MRP =	data.MRP;
	var text	 =	"";
	
	$("[name=rate]").val(MRP);
	$("[name=purhasePrice").val(PURCHASE_PRICE);
	$("[name=quantity]").val("1");
	$("[name=quantity]").focus();
}

function generatePOSInvoice()
{
	var companyId	= trim($("[name=companyId]").val());
	var date	= trim($("[name=date]").val());
	var mobileNo	= trim($("[name=mobileNo]").val());
		
	if(companyId == "" || companyId == "undefined")
	{
		showSelect2WarningAlert("Please select Company.",$("[name=companyId]"));
		return false;
	}
	if(date == "" || date == "undefined")
	{
		showSWarningAlert("Please select Date.",$("[name=date]"));
		return false;
	}
	
	if(mobileNo != "")
	{
		if(!validateMobileNo(document.InvoiceModel.mobileNo))
		{
			return false;	
		}
	}
	
	$('#btnCancel').attr('disabled',true);
	$('#btnSubmit').attr('disabled',true);	
	$("[name=reqCode]").val('generatePOSInvoice');
	$('[name=InvoiceModel]').submit();
}


function getPOSInvoiceListDetails()
{
	$("#btnGetList").attr("disabled",true);
	$("#btnClear").attr("disabled",true);
	$("[name=reqCode]").val("getPOSInvoiceListDetails");
	$("[name=InvoiceModel]").submit();
}

function clearListPage()
{
	$("[name=invoiceNo]").val("");
	$("[name=mobileNo]").val("");
	$("[name=fromDate]").val("");
	$("[name=toDate]").val("");
	$("[name=modeOfPayment]").val("").trigger("change");s
	$("[name=status]").val("").trigger("change");
	$("[name=fromDate]").data('datepicker').setDate(null);
	$("[name=toDate]").data('datepicker').setDate(null);
	$("#divList").hide();
}

function showInvoicePrintPage(invoiceID)
{
	var url = contextPath+"/invoiceAction.do?reqCode=showPOSInvoicePrintPage&invoiceId="+invoiceID;
	window.open(url,"Document",'_blank',"height=500,width=1000,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=no,status=yes");
	
}