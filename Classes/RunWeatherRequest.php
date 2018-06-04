<?php
    //triggered by ajax request in weather-core.js/function myAjaxRequest() 
	//sends request to OpenWeather API and echo the json answer back to js
	
	class RunWeatherRequest
	{
		public static function askWeatherApi()
		{
			
			// get the city name from ajax JS request, a default city or a clicked
            $city = $_POST['serverCity'];
	       //echo "We get " . $city;
	       //$city = "Kyiv";
	
	       //form the URL for weather API
	       $data_url = "http://api.openweathermap.org/data/2.5/forecast/daily?q=" . $city . "&mode=json&units=metric&cnt=7&appid=42b614437754a4ec7c704604e2a3f97f";  //Kyiv
	      //echo "<br>url " . $data_url;
	
	     // Gets the OpenWeather API
         if (!$json = file_get_contents($data_url)) {
		     echo "<br>City Error</br>";
	     }
         //echo $json;
         //$obj = json_decode($json,true);//,  true used for [], not  used  for '->';
	
         echo $json;
         //print_r($obj); // display the JSOn to screen
         //echo json_encode($obj); // MAke sure JSOn encode  gotten result 
	
	
			
			
	    }
	}
?>