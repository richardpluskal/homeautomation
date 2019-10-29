function getSolarHeaterData(function_callback)
{
	var xmlhttp=new XMLHttpRequest();
   
        xmlhttp.onreadystatechange=function() 
	{
		if (this.readyState==4 && this.status==200)
		{
			function_callback(this);
            	};
        };

        xmlhttp.open("GET","/cgi-bin/solarheater",true);
        xmlhttp.send();
}