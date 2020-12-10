// JavaScript Document
function getProductSearchList()
{
	$("#btnGetList").attr("disabled",true);
	$("#btnClear").attr("disabled",true);
	$("[name=reqCode]").val("getProductSearchList");
	$("[name=ProductModel]").submit();
}

function clearListPage()
{

	$("[name=itemName]").val("").trigger("change");
	$("[name=status]").val("").trigger("change");
	
	$("#divList").hide();
}

function showAddNewProductPage()
{
	$("[name=reqCode]").val("showAddNewProductPage");
	$("[name=ProductModel]").submit();
}

function showProductListPage()
{
	$("[name=reqCode]").val("showProductListPage");
	$("[name=ProductModel]").submit();
}

function saveProductDetails()
{
	var	itemName		=	trim($("[name=itemName]").val());
	var	productNo		=	trim($("[name=productNo]").val());
	var	productCategoryId		=	trim($("[name=productCategoryId]").val());
	var	hsnCode		=	trim($("[name=hsnCode]").val());
	var	productDesc		=	trim($("[name=productDesc]").val());
	var	purchasePrice		=	trim($("[name=purchasePrice]").val());
	var	mrp		=	trim($("[name=mrp]").val());
	var	mrpIncludeTax		=	trim($("[name=mrpIncludeTax]").val());
	var	purchaseTaxId		=	trim($("[name=purchaseTaxId]").val());
	var	salesTaxId		=	trim($("[name=salesTaxId]").val());
	var	status		=	trim($("[name=status]").val());
	
	if(itemName == "")
	{
		showWarningAlert("Please enter Product Name.",$("[name=itemName]"));
		return false;
	}
	
	if(productCategoryId == "" || productCategoryId == undefined)
	{
		showSelect2WarningAlert("Please select Product Category.",$("[name=productCategoryId]"));
		return false;
	}
	if(mrp == "")
	{
		showWarningAlert("Please enter MRP.",$("[name=mrp]"));
		return false;
	}
	if($("[name=mrpIncludeTax]:checked").length==0)
	{
		showCheckBoxRadioAlert("Please select MRP Include Tax.",$("[name=mrpIncludeTax]:eq(0)"));
		return false;
	}
	if($("[name=status]:checked").length==0)
	{
		showCheckBoxRadioAlert("Please select Status.",$("[name=status]:eq(0)"));
		return false;
	}
	
	$("[name=reqCode]").val("saveNewProductDetails");
	$("[name=ProductModel]").submit();
}

function getProductCatWiseProductName()
{
	var	productCategoryId	=	$("[name=productCategoryId]").val();
	$("[name=itemName]").find('option:gt(0)').remove();//for serial no DDList
	
	var reqCode		=	"getProductCategoryWiseProductNameList";
	var url			=	"centralAction.do";
	
	$("[name=itemName]").val("").trigger("change");
	$("[name=itemName]").find('option:gt(0)').remove();
	if(productCategoryId == "" || productCategoryId == undefined)
	{
		
	}
	else
	{
		$("#divLoading").show();
		$.ajax({
		
				type	:	'post',
				url		: 	url,
				async	:	false,
				data	:	{reqCode:reqCode,productCategoryId:productCategoryId},
				dataType: 	"json",
				success :	processGetProductCatWiseProductName,
				error 	:	function()
							{
								bootbox.alert("There was an error with the connection."); 
								$("#divLoading").hide();
							}
		});
	}
}

function processGetProductCatWiseProductName(transport)
{
	$("#divLoading").hide();
	var data	 =	transport;
    var dataList =	data.DataList;
	var text	 =	"";
	
	if(dataList.length > 0)
	{
		fillDDUsingArray(dataList,"itemName");
		if($("[name=itemName]").find("option").length == 2)
		{
			$("[name=itemName]").select2().find('option:gt(0)').prop("selected", "selected").trigger("change");
		}
		else 
		{
			$("[name=itemName]").data('select2').open();
		}
	}else
	{
		$("[name=itemName]").val("").trigger("change");
		$("[name=itemName]").find('option:gt(0)').remove();
	}
}
