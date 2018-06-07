Updated Weather_2018_API, which now works on PHP.

Weather Php, how it works
1. Works on OpeWeather Api, unlike the previouse weather pure Js application, this application uses Php (file_get_content()) to send request.
  Thus Api key and Url we use is server-side and can not be reached by 3rd persons.
2. By default it loads Kyiv.
3. Core function is  function myAjaxRequest(), it passes var with city name(default or clicked) and sends ajax request to our php script "ajax_php_script/weather_script.php", the php script itself gets $_Post['city'] and sends request by file_get_content(), then echo the result (json answer). 
  Js function myAjaxRequest() receives json response, and if ajax is "success" it runs function getAjaxAnswer(data), which constructs div with all weather using function  constructAjaxResponse() inside for() loop (lenght is the amount of days (cn) used in URL in php)  function and html() it to #weatherResult.
4. OnLoad JS takes default city (Kyiv) and run  function myAjaxRequest()( located in core_js/weather_core.js). 
  OnClick JS checks if city input is not empty/not in russian, if Ok runs function runCityName(), which triggers  the same function myAjaxRequest();
5. Function myAjaxRequest() sends ajax request to "ajax_php_script/weather_script.php" and if the ajax is success, runs getAjaxAnswer(data), which fires for() loop, 
  in this loop it converts every day UnixTime to normal form(29/05)  +  this loop calls function constructAjaxResponse(myIteration, i, formattedDate, data, dayOfWeek), which constructs the whole div with all days weather content to html(). 
  For translation we use here function setApiResponse_Language(apiString).

6.Index.php uses autoload.php to load all php scripts in Classes folder.
7.Php file_get_content (apiUrl) is runned by class RunWeatherRequest::askWeatherApi();





Language localization--------------------
1. Uses 2 languages, english by default.
2. OnLoad js checks if a local storage key {localStorageLanguageSetting} exists, if not, it creates it and set to English, if exists, reads its value.
2. Function {isEnglish_SetInLocalStorage()} checks if local storage {localStorageLanguageSetting} is set to English and returns true in this case.
3. Two functions runs translation:   {changeLanguages(english, russ, div)} and {setApiResponse_Language(singleApiString). 
  First {changeLanguages()} translates static html values set in index.php (header, submit button, clear button, ru/eng switcher). 
  English/Ru words are called directly in function  as arguments { changeLanguages(english, russ, div)}.
  Second function {setApiResponse_Language(singleApiString)} translates dynamic div text values received from ajax response and constructed in {constructAjaxResponse()}.
  For translation this function uses js object  {Eng_Ru_Object}  which stores eng/ru values as key:value. 
  Js Object Kies (eng words) should have no backspace, use "_" if it is necessary, (i.e "light_ rain").
  Function {setApiResponse_Language(singleApiString)} gets original english ajax Api string, checks if English is set to local storage {localStorageLanguageSetting}, if true returns without change. 
  If {isEnglish_SetInLocalStorage()} returns false , it replaces all backspace(if any) in string (i.e "light rain") and search this string as  Object key in {Eng_Ru_Object } , if found returns its russian value. If not found, returns English original text.