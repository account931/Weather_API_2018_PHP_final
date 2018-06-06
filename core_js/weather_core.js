$(document).ready(function(){
	
	//PHP VERSION
	
	
    // **************************************************************************************
    // **************************************************************************************
    //                                                                                     **
    // START HEADER  CHANGE HOVER HEADER Change -> Waze Check Apllication******
    $('#headXz').hover(function(){    
        //$('#headerp').html('Social Networking');
       $("#textChange").clearQueue();//prevent endeless
       $("#textChange").stop().fadeOut(900,function(){  $(this).html("<span style=''>Weather on-line </span> ") }).fadeIn(900);

             /*$('#textChange').stop().hide(800);  
             $('#headerpHIDDEN').stop().show(1000);*/

             /*$('#textChange').animate({ "margin-left": 200 }, 2000, 'linear');
              $('#headerpHIDDEN').stop().show(1000);*/
    },
    function(){ //hover off
           
          $("#textChange").clearQueue();
          $("#textChange").stop().fadeOut(900,function(){  $(this).html("Weather on-line") }).fadeIn(900);
         
              //$(this).html('Dynamically  changed MVC');
              /*$('#headerpHIDDEN').stop().hide(900);
              $('#textChange').stop().show(1000);*/

              //$('#textChange').html('Waze');
             /* $('#textChange').animate({ "margin-right": 0 }, 2000, 'linear');
              $('#headerpHIDDEN').stop().hide(1000);*/
              
    });
    // END HEADER  CHANGE HOVER HEADER Change----------------------
    // **                                                                                  **
    // **************************************************************************************
    // **************************************************************************************









	
	
    //---------------------------------------------
	$("#clear").click(function() {   // $(document).on("click", '.circle', function() {   // this  click  is  used  to   react  to  newly generated cicles;
        
		clearQRField();

    });
    //END Click random main Button------------------
	
	
	
	
	
	
	
	
	
	
	
	
	// **************************************************************************************
    // **************************************************************************************
    //                                                                                     **
	function clearQRField()
	{
		
		$("#citytext").val("");
		$("#weatherResult").hide(900);
		//clear Error div
		//this caused Mega error ->($("#qrResult").hide()), div was moving right, rescaling the whole window, was fixed by changing to html('');
		$("#qrResult").stop().fadeOut("slow",function(){ $(this).html('')}).fadeIn(2000); 
		scroll_toTop(); // function to scroll the page up
	}
	// **                                                                                  **
    // **************************************************************************************
    // **************************************************************************************
	
	
	
	
	window.data_url ="";
	
	
	
	
	
	
	
	
	
	
	
	
	
     //RUNS on load
	
	// Weather in Loop-----
	// ***********************************************************************
    // ***********************************************************************
    // **                                                                   **
	window.cityX = '';
	var days = 7; // counter for loop
	if ($("#citytext").val().trim()==''){
		//alert('default city'); //Important alert
	    var city = "Kyiv"; 
	} else {
		//alert('user'); //Important alert
		var city =  window.cityGet;
	}
	window.cityX = city;
	$("#cityName").html(city);
	
	myAjaxRequest(); //working onLoad !!!!!!!!!!!!!
	
	
	
	
	
	
	//Main action button click, Prevents empty form submitting, runs ajax if the field is not empty---------
	// **************************************************************************************
    // **************************************************************************************
    //                                                                                     **
	$("#submit").click(function() {   
	//const cyrillicPattern = /[\u0400-\u04FF]/; russ letters
	
        if ($("#citytext").val().trim()==''){
			if ( !$("#qrResult").is(':visible')) {  //will never fire, we changed the div property to always visible, we don't hide it, we html("") it
				$("#qrResult").show(900);           // 
			}
			 clearQRField();
			//html Error No City wresult with animation
            $("#qrResult").stop().fadeOut("slow",function(){ $(this).html('<div class="red alert alert-danger"><h3><center><span class="glyphicon glyphicon-log-in"></span><br><br>NO INPUT FOR YOUR CITY </center> </h3></div>')}).fadeIn(2000);
			return false;
			
			//check if the input is not russian
			
		} else if ( /[\u0400-\u04FF]/.test(  $("#citytext").val().trim()  ) ){
			 $("#qrResult").stop().fadeOut("slow",function(){ $(this).html('<div class="red alert alert-danger"><h3><center><span class="glyphicon glyphicon-log-in"></span><br><br>No cities in Russian </center> </h3></div>')}).fadeIn(2000);
			return false;
			
		} else {
			//Run core function onClick
			runCityName();

		}
    });
    //END Main action button click, Prevents empty form submitting, runs ajax if the field is not empty------------------
	
	
	
	
	
	// function that runs on click
	// **************************************************************************************
    // **************************************************************************************
    //                                                                                     **
	 function runCityName()
	 {	 
	 	 
		 window.cityGet = $('#citytext').val();
	
		  
		 //alert(cityGet);
		 //$("#cityName").html(cityGet); //not used any more
		 //getWeather(function (data));
		 //return false;
		 
		 if (window.cityGet.trim()==''){
			 var city = "Kiev"; //will never fire
		 } else {
			 var city = window.cityGet; 
			 window.cityX = city;
			 //alert("You selected " + city); // alert important
		 }
		  
		  
		  //var days = 7; // counter for loop
		
		  
		  
		  
		  // Used to RUN DUBLICATE getWeather(); on your custom city click, can not run myAction() with getWeather() inside, though runs it on default load
		  myAjaxRequest();
		  //  END Used to run DUBLICATE getWeather(); on your custom city click, can not run myAction() with getWeather() inside, though runs it on default load
		  
		  //Scroll to results in Mobile only
		  if(screen.width <= 640){ 
	          scrollResults("#weather_header"); //scroll the page down to weather results
		  }
		  $("#qrResult").html(''); // Mega error, should use html('') instead of hide(900)
		  
		  
		} // END runCityName()
	    // **                                                                                  **
        // **************************************************************************************
        // **************************************************************************************
	
	
	
	
	
	
	
	
	
	
	
	// Core action which includes getWeather(function (data), it is called onLoad and onClick
	// **************************************************************************************
    // **************************************************************************************
    //                                                                                     **
	function myAjaxRequest() 
	{	
        // send  data  to  PHP handler  ************ 
        $.ajax({
            url: 'ajax_php_script/weather_script.php',
            type: 'POST',
			dataType: 'JSON', // without this it returned string(that can be alerted), now it returns object
			//passing the city
            data: { 
			    serverCity:window.cityX
			},
            success: function(data) {
                // do something;
                //$("#weatherResult").stop().fadeOut("slow",function(){ $(this).html(data) }).fadeIn(2000);
			    //alert(data.city.name);
				getAjaxAnswer(data);
            },  //end success
			error: function (error) {
				$("#weatherResult").stop().fadeOut("slow",function(){ $(this).html("<h4 style='color:red;padding:3em;'>ERROR!!! <br> NO CITY FOUND</h4>")}).fadeIn(2000);
            }	
        });
                                               
       //  END AJAXed  part 
	
	}
	
	// **                                                                                  **
    // **************************************************************************************
    // **************************************************************************************
	// END Core action which includes getWeather(function (data), it is called onLoad and onClick
	
	
	
	
	
	
	
	
	
	
	// Core action which includes getWeather(function (data), it is called onLoad and onClick
	// **************************************************************************************
    // **************************************************************************************
    //                                                                                     **
	
	function getAjaxAnswer(data)
	{
		weather_day_all = "";
        weather_day = "<center>";
	
		//alert(data);
		for (var i = 0; i < days; i++){
		    //alert(hours24);
			 var myIteration = i + 1; // for divs, which are from 1-7, not 0-6
	
   
            // convert received in JSOn answer UNIX to norm date
            var date = new Date(data.list[i].dt * 1000);
           // Form the date in {day/month}, all uncommented string returns {day/month/year/hour/min}
           var formattedDate = ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) /* + '/' + date.getFullYear() + ' ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2) */;
            
           //get the day of the week			
		   var daysArr = ['Sund','Mond','Tues','Wedn','Thurs','Frid_','Satur'];
           var dayOfWeek = daysArr[new Date(data.list[i].dt * 1000).getDay()];
           //alert(dayOfWeek);		   
   
       
   
          // calling the function to construct the whole Div with results, arg[counter which starts from 1, not 0 for Div naming(div1)/, for()iteration value/, Unix data from a]ax, converted to norn(29/05)/, all ajax data response, dayOfWeek(Friday))
          constructAjaxResponse(myIteration, i, formattedDate, data, dayOfWeek);
					  
         //document.getElementById('weather' + myIteration).innerHTML = weather_day;
	     weather_day_all = weather_day_all + weather_day; // getting all days in one varibale
	} //end For loop
	
	weather_day_all = weather_day_all + "</center>";
	//alert(weather_day_all);
	
	//$('#weatherResult').html(weather_day_all);  //html the result
	//html weather result with animation
    $("#weatherResult").stop().fadeOut("slow",function(){ $(this).html(weather_day_all)}).fadeIn(2000);
	
	
		  
		  
	$('#pureJson').html(JSON.stringify(data, null, 4));  //html pure json to Bootsrap dropdown
	//alert(JSON.stringify(data, null, 4));
	}
	
	// **                                                                                  **
    // **************************************************************************************
    // **************************************************************************************
	
	
	
	
	
	
	
	
	
	//Used in myAction() function onLoad and onClick, 
	// Constructs Div with results, arg passed are from {{function myAction() {getWeather(function (data) }}
	//Some arg have the same name as passed arg, when u call the funtion for simplicity, some(i.e passed "myIteration", but here we use "iteration") are the same,in this case, here in original function, we should rename "myIteration"
	// function setApiResponse_Language(ApiString) is used to translate the string to Rus(if rus is set in local storage), if set Eng, we return string without any change
	//function setApiResponse_Language(ApiString) is USED only for changing/constructing strings declared/received/constructed in weather_script.js (), not used for html elements declared in index.php(header, buttons,lang switch cog),	// set the relavant language for a single Api string response, ie "rain" to "дождь", it is called directly in function constructAjaxResponse()
	// **************************************************************************************
    // **************************************************************************************
    //                                                                                     **
	
	function constructAjaxResponse(iteration, i, formattedDate, data, dayOfWeek) //(iteration=i+1{to form div id="weather1"}), i=i, formattedDate=29/05,data=whole json answer, dayOfWeek=Sunday)
	{
		//getting 2 colors
		var colorArray = ['bg-primary', 'bg-info'];
		var colorFlag = 1;
		    if(i%2 == 0 ){
		       colorFlag = 0;	
		    } 
			
		 // getting  today date and today weather, icon (the 1st day) for adding TODAY date in City header	
            if (i==0){
			    todayXconstruct = formattedDate;
                todayTemp =  Math.floor(data.list[i].temp.min) + "&#186; +" + Math.floor(data.list[i].temp.max) + "&#186;" ;	
                todayIcon = "<img class='weather_icon' style='width:8%;' src='http://openweathermap.org/img/w/" + data.list[i].weather[0].icon +  ".png'/>"			
			}	
			
		
        //getting every day in the loop
        weather_day = "<div class='myStyle row " + colorArray[colorFlag] +  "' id='weather" + iteration + "'><center>" +  // <div class='row bg-primary' id='weather1'>
		              
					  // Date and ictyname in <title>
	                  "<div class='col-sm-1 col-xs-2' title='" +data.city.name + " '>" +
	                       setApiResponse_Language(dayOfWeek)  + " " + formattedDate +  // Date, city in <title>
					  "</div>" +	
					  
                      "<div class='col-sm-2 col-xs-2'>" +					  
					       Math.floor(data.list[i].temp.day) + "&#186;" + // average temp
					  "</div>" +
					  
					  // min and max temp, symbol{&#186;} is a degree mark, temp is Math.floor() to prevent 19.87C
					  "<div class='col-sm-2 col-xs-2'>" +
	                      "+" + Math.floor(data.list[i].temp.min) + "&#186; +" + Math.floor(data.list[i].temp.max) + "&#186;" +
					  "</div>" +
					  
					  "<div class='col-sm-2 col-xs-2'    >" +	  
					      setApiResponse_Language("Wind") + " " + data.list[i].speed + " m/h" +
					  "</div>" +
					  
					  // Weather description (condition, description)+icon(visible in mobile only (class='weather_icon_mob))
					  "<div class='col-sm-1 col-xs-2'  >" +
					     setApiResponse_Language( data.list[i].weather[0].description ) +
						  "<br><img class='weather_icon_mob'  src='http://openweathermap.org/img/w/" + data.list[i].weather[0].icon +  ".png'/>" +
					  "</div>" + 
					  
					    // Weather icon, visible in web only, hidden in mobile (class='weather_icon)
					  "<div class='col-sm-2 col-xs-1'  >" +
						      "<img class='weather_icon'  src='http://openweathermap.org/img/w/" + data.list[i].weather[0].icon +  ".png'/>" +
					  "</div>" + 
					  
					  "</center></div>";
					  // End construct of var weather_day =  
					  
					  
					  //Construction city info, name, country, population, lat/lon + weather for today only(Used in City header)
					  city_info = "<br><h3>" + setApiResponse_Language('Weather in') + " "  + data.city.name + ", " + data.city.country + " " + setApiResponse_Language("for 7 days") + "<h3>" +
					              "<h6>" + 
								  setApiResponse_Language("Population") + ": " + data.city.population +  ", lon:"  + data.city.coord.lon + ", lat:" + data.city.coord.lat + "<br>" /* + todayIcon */ +  
								  setApiResponse_Language("today") + " " + todayXconstruct + " +" + todayTemp + /* +  "<br>" + todayIcon */   // today date and today tempature
								  "<br></h6>";
					              
					  $('#weather_header').html(city_info);
	}
	
	// **                                                                                  **
    // **************************************************************************************
    // **************************************************************************************
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	// Scroll the page to results  #resultFinal
	// **************************************************************************************
    // **************************************************************************************
    //                                                                                     **
	function scrollResults(divName) 
	{
		 
         $('html, body').animate({
            
            scrollTop: $(divName).offset().top
			//scrollTop: $('.footer').offset().top
            //scrollTop: $('.your-class').offset().top
        }, 'slow'); 
		// END Scroll the page to results
	}
	
	// **                                                                                  **
    // **************************************************************************************
    // **************************************************************************************
	
	
	
	
	function scroll_toTop() 
	{
	    $("html, body").animate({ scrollTop: 0 }, "slow");	
	}
	// **                                                                                  **
    // **************************************************************************************
    // **************************************************************************************
	
	
	
	
	
	
	
	
	
	
	
	
	
	// LANGUAGES  BIG SECTION-------------------------------------------------------------------------------------------------------------------
	
	
	
	// Check if there is a local storage with language was already saved in Local Storage, if not - creat it
	// **************************************************************************************
    // **************************************************************************************
    //                                                                                     **
    if (localStorage.getItem("localStorageLanguageSetting") != null) { // If Local Storage was prev created and exists
		    //var retrievedObject = localStorage.getItem('localStorageLanguageSetting'); // get Loc Storage item
			
			/*
			if(retrievedObject==engLoc){
				localStorage.setItem('localStorageLanguageSetting', 'ruLoc');
			} else {
				localStorage.setItem('localStorageLanguageSetting', 'engLoc');
			}
			*/
			//var retrievedObject = JSON.parse(retrievedObject);
			//productsObject = retrievedObject;
			
			alert ("Loc St exists " +  localStorage.getItem("localStorageLanguageSetting") );
    } else {
        
		// if Loc Storage does not exist (i.e Object was never initialized), create a new Object, set English as default
	    if (typeof localStorage.getItem("localStorageLanguageSetting") == "undefined") {
            alert("Object will be created now");
		    //var productsObject = { }; //empty object for all cart products
			localStorage.setItem('localStorageLanguageSetting', 'engLoc');
        } else {
		    alert("Object Exists"); // will never fire
	    }
	}	
	
	
	
	

	
	
	
	
	
	// switch language on header click
	$(".language").click(function() {   // $(document).on("click", '.circle', function() {   // this  click  is  used  to   react  to  newly generated cicles;
        
		if ( !isEnglish_SetInLocalStorage() ){
			localStorage.setItem('localStorageLanguageSetting', 'engLoc');
		    //alert("detect russ");
			//flag = "Ru";
		} else {
			 //alert(" no russ");
			 localStorage.setItem('localStorageLanguageSetting', 'ruLoc');
			 
		}
		//Called to change all div languages
        changeAllLanguages();
		myAjaxRequest(); // NEW TEST, changing language
    });
	
	
	
	// runs onLoad to change language 
	changeAllLanguages();
	//changeLanguages("US text", "Ru text", ".lang");
	
	
	
	
	//USED for changing strings in html part in index.php(header, buttons), not used for constructing strings in weather_core.js(for this case we use function setApiResponse_Language)
	// detects if URL contains  {?lang=russ} and changes language, used only in NON-DYMAMIC translation (Not for translation of API response, for this use function setApiResponse_Language(singleApiString))
	// **************************************************************************************
    // **************************************************************************************
    //                                                                                     **
	function changeLanguages(english, russ, div){ //english, russ, div to change
		if ( !isEnglish_SetInLocalStorage() ){   // check  if  not ENGLISH
		    //alert("detect russ");
			//flag = "Ru";
			langX = russ;
			$("" + div).stop().fadeOut("slow",function(){ $(this).html(russ)}).fadeIn(2000);
		} else {
			 //alert(" no russ here ");
			 //flag = "Eng";
			 langX = english;
			 $("" + div).stop().fadeOut("slow",function(){ $(this).html(english)}).fadeIn(2000);
		}
		//flag == "Ru" ? langX = russ : langX = english;
		
		//$("" + div).html(langX);
		//$("" + div).stop().fadeOut("slow",function(){ $("" + div).html(langX)}).fadeIn(2000);
		
	}
	
	
	//USED for changing strings in html part in index.php(header, buttons), not used for constructing strings in weather_core.js(for this case we use function setApiResponse_Language)
	//Called to change all div languages, used only in NON-DYMAMIC translation (Not for translation of API response, for this use function setApiResponse_Language(singleApiString))
	// **************************************************************************************
    // **************************************************************************************
    //                                                                                     **
	
	function changeAllLanguages()
	{
		changeLanguages("Ru", "Eng", ".lang");
		changeLanguages("Weather on-line 7 days", "Погода в мире на 7 дней ", "#textChange");
		changeLanguages("Your city", "Ваш город", "#cityLable");
		changeLanguages("Submit", "Ввод", "#submit");
		changeLanguages("Clear", "Сброс", "#clear");
		//changeLanguages("Population: ", "Население: ", "#population");
		//changeLanguages("today: ", "Сегодня: ", "#today");
		
	}
	 
	
	
	
	
	
	// check the language setting in Local storage and return true/false
	// **************************************************************************************
    // **************************************************************************************
    //                                                                                     **
	function isEnglish_SetInLocalStorage() {
		if ( localStorage.getItem('localStorageLanguageSetting')=="engLoc" ){   // check  if  english lang and return true
		    return true;
		} else {
			return false;
		}
	}
	
	
	
	
	// Weather Localization 
	// **************************************************************************************
    // **************************************************************************************
    //                                                                                     **
	 //var daysArr_Ru = ['Воск','Понд','Втор','Сред','Четв','Пятн','Субб'];	//reassigned to Eng_Ru_Object 		 
						 
						 
	//JS object with all translation for API dynamic response, use Object keys without No blankspace (i.e NOT "light rain", but "light_rain")					 
	var Eng_Ru_Object = {
		                Sund:'Воск', Mond:'Понд', Tues:'Втор', Wedn:'Сред', Thurs:'Четв', Frid_:'Пятн', Satur:'Субб', //eng week days name must be the same as in daysArr
						Population: 'Население',
						Wind: 'ветер',
						today:  'сегодня ',
						Weather_in: 'Погода в',
						for_7_days: 'на 7 дней',
						
						
		                rain:  'дождь',
						moderate_rain: 'небольшой дождь',
		                light_rain : 'небольшой дождь',
		                scattered_clouds: 'облачно',
		                sky_is_clear: 'ясно',
						broken_clouds: 'тучи',
						overcast_clouds: 'тучи',
						
						clear_sky: 'ясно',
						few_clouds: 'малооблачно',
						shower_rain: 'дождь',
						thunderstorm: 'гроза',
						snow: 'снег',
						mist: 'туман',
						thunderstorm_with_light_rain: 'гроза с небольшим дождем',
						thunderstorm_with_rain: 'гроза с дождем',
						thunderstorm_with_heavy_rain: 'гроза с ливнем',
						light_thunderstorm: 'небольшая гроза',
					
	                    }
	
	//https://openweathermap.org/weather-conditions
	
	
	
	//USED only for changing/constructing strings declared/received/constructed in weather_script.js (), not used for html elements declared in index.php(header, buttons,lang switch cog)
	// set the relavant language for a single Api string response, ie "rain" to "дождь", it is called directly in function constructAjaxResponse()
	// **************************************************************************************
    // **************************************************************************************
    //                                                                                     **
	function setApiResponse_Language(singleApiString)
	{
	    if (isEnglish_SetInLocalStorage()) 
		{  
	        //if set English lang, return with No change
			return singleApiString;
		
        
		} else {  //if not set Eng, ie set to Russian	
		    // convert value in format ("light rain" to "light_rain")
			var adopted_ApiString = singleApiString.replace(new RegExp(" ",'g'),  "_"); // replace blankspace in string(if any) to "_", ie "sky_is_clear" as keys in Eng_Ru_Object
			if (!Eng_Ru_Object.hasOwnProperty(adopted_ApiString)){ // if the translation is not described in Eng_Ru_Object
				//var end = 'Not translated';
				var end = singleApiString; //return English variant
			} else {
				var end = Eng_Ru_Object[adopted_ApiString]; // the value of Eng_Ru_Object.rain
			}
			return end;
		}			
	}
	
	
	
	
	// OLD ----------------------------------------------------------------------------------------------------------------------------------
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
});
// end ready



