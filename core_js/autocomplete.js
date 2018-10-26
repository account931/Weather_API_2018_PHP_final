//JQ autocomplete UI, for IOS as IOS does not support dataList(+ must include JQ_UI.js + JQ_UI.css in index.php)
//DataList is used alongside with JQ autocomplete UI(core_js/autocomplete.js)

//used in IOS only
if(navigator.userAgent.match(/(iPhone|iPod|iPad)/i)){

    $( function() {
        var availableCityTags = [
                              "Amsterdam",

							  "Anchorage",
							  "Anuradhapura",
							  "Athens",
							  "Copenhagen",
							  "Delhi",
							  "Dubai",
							  "Honolulu",
							  
							  "Istanbul",
							  "Kuala Lumpur",
							  "Kuwait",
							  "Kyiv",
							  
							  "London",
							  "Manila",
							  "Marrakech",
							  "Miami",
                              "Milan",
                              "Moscow",							  
                              "Odessa,UA",
							  "Rome",
							  "Stockholm",
							  "Sydney",
							  "Tokyo",
							  "Vienna",
							  "Yakutsk",
							  "Zhytomyr"
        ];
		
		//connect autocomplete to input
        $( "#citytext" ).autocomplete({
            source: availableCityTags
        });
   } );

}
