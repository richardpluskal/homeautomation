function getDBData(period,function_callback)
{
	period_id={"date_from":period.date_from,"date_to":period.date_to,"id":Math.random().toString()};	

	params=JSON.stringify(period_id);

	var xmlhttp=new XMLHttpRequest();
   
        xmlhttp.onreadystatechange=function() 
	{
		if (this.readyState==4 && this.status==200)
		{
			function_callback(this);
            	};
        };

        xmlhttp.open("GET","get_data.php?params="+params,true);
        xmlhttp.send();
}