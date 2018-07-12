//runs interaction with modal windows
// Google maps are displayed with { <script src="https://maps.googleapis.com/maps/api/js?callback=initMap" async defer></script> } in index.html.


	
    $(document).ready(function(){
			
	
	
	
	
	   // If u click "Add" in  modal widnow with fields "Add a new marker"-> send ajax request to add a marker to SQL DB
	   // Send Ajajx to a add a new marker
	   // **************************************************************************************
       // **************************************************************************************
       //                                                                                     **
	   
        $(document).on("click", '#agreedAddToSQL', function() {  // this  click  is  used  to   react  to  newly generated;
			
			
			// AJAX sends data to PHP handler, which insert a new marker to SQL DB
            $.ajax({
                url: 'ajax_php/insertSqlMarker_Handler.php', // handler which runs {Classes/InsertNewMarker.php}
                type: 'POST',
			    dataType: 'text', // without this it returned string(that can be alerted), now it returns object
			    //passing the data
                data: { 
			        markerName: $('#formMarkerName').val(),	 //marker name
					markerCoords: globalCoords, //coordinates, get them from global {globalCoords} defined in storeLocator_core.js in {google.maps.event.addListener(map, 'click', function(event) {}
			        markerInfo: $('#formMarkerInfo').val(), //marker info
					markerDescription: $('#formMarkerDescription').val(),
				},
			    async: false,
                success: function(data) {
                    // do something;
				    alert(data);
					 window.location.reload(); //reloads the page to get fresh markers
					//runSQLRequestToGetMarkers(); //Run SQL request to get updated markers to object {stores}
					//put markers on map according to object {stores}
					//alert(JSON.stringify(stores, null, 4));
					/*stores.forEach(function(store){
		                markStore(store);
	                }); */
				            
                },  //end success
			    error: function (error) {
				    alert('Failed adding a marker');
                }	
            });
		                                     
           // END AJAX sends data to PHP handler, which insert a new marker to SQL DB 
            
       }); //END $("#btn_Control").click
	  // **                                                                                  **
      // **************************************************************************************
      // **************************************************************************************
	  
	  
	  
	  
	  
	  
	  
	  
	  
		
		
	   // If u click "No" in "Add this point to your markers?" in #info_div-> hide #info_div + hide clicked infoWindow
	   // **************************************************************************************
       // **************************************************************************************
       //                                                                                     **
	   
        $(document).on("click", '#btn_add_cancel', function() {  // this  click  is  used  to   react  to  newly generated;
			$("#info_div").fadeOut(900);
			scroll_toTop(); 
			//hide infowindow, if any
			if (infowindow) {
                infowindow.close();
			}
			
            
       }); //END $("#btn_Control").click
	  // **                                                                                  **
      // **************************************************************************************
      // **************************************************************************************
	   
	   
	
      
	  
	  
	  
	



	
   });
	//   END ready 

