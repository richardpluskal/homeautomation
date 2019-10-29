function formatDateTimeString(str,format)
{
	var date_time=new Date(str.slice(0,4),str.slice(5,7),str.slice(8,10),str.slice(11,13),str.slice(14,16),str.slice(17));
	switch(format)
	{
	case 1:
		return date_time.getDate()+"."+date_time.getMonth()+"."+date_time.getFullYear();
		break;
	case 2:
		return date_time.getHours()+":"+(((date_time.getMinutes()<10)?'0':'')+date_time.getMinutes());
		break;
	default:
		return date_time.getDate()+"."+date_time.getMonth()+"."+date_time.getFullYear()+" "+date_time.getHours()+":"
			+(((date_time.getMinutes()<10)?'0':'')+date_time.getMinutes());
		break;
	}	
	
}