var themeFlag = 1; //flag to distinguish if "Change Theme1 or 2" was clicked and what to {constructAjaxResponse()} or  {constructAjaxResponseColor()}run 

$(document).ready(function(){

   
	
	//change text in Theme on click and set a Flag to be used in getAjaxAnswer(data) to decide to run {constructAjaxResponse()} or  {constructAjaxResponseColor()}, 
	//which are responsible for theme changing
	// **************************************************************************************
    // **************************************************************************************
    //                                                                                     **
	$(".theme").click(function() { 
	    if ($(".them").text()=="*"){
			$(".them").text("**");
			themeFlag = 2;
			//alert(themeFlag);
		} else {
			$(".them").text("*");
			themeFlag = 1;
			//alert(themeFlag);
		}
	 
	    //alert("fin" + themeFlag);
	});
	
	
	
	
	
	
	
	
	
});
// end ready



