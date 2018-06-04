<?php
    //make sure that this script can be called from your application, u should define $SecurityConstant in main  index.php
	
	class Security 
	{
		
		public  function checkSecurityConstant()
		{
			include("../index.php");
			if(!defined('SecurityConstant')){
		        die("Access is not permitted, no Security Constant");
	        }
	    }
		
		
	}
?>