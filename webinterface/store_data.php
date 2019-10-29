<?php

if($_POST["passwd"]!="PASSWORD_TO_STORE_DATA")
{
	exit("Incorrect password");
}

date_default_timezone_set('Europe/Prague');
$date_time = date("Y-m-d H:i:s");

$panel_temp=intval($_POST["panel"]);
$tank_temp=intval($_POST["tank"]);
$pump=$_POST["pump"]=="ON"?1:0;
$heater=$_POST["heater"]=="ON"?1:0;

$con = new mysqli('DB URL','DB_NAME','DB_PASSWORD','DB_USERNAME');
if ($con->connect_error) 
{
    die('Could not connect: ' . $con->connect_error);
}

$sql=$con->prepare("INSERT INTO solar_data (date_time,panel_temp,tank_temp,pump,heater) VALUES(?,?,?,?,?)");

$sql->bind_param("siiii",$date_time,$panel_temp,$tank_temp,$pump,$heater);

if($sql->execute())
{
echo "SQL result: OK\n";
}
else
{
echo "SQL result: FAILED\n";
}

$sql->close;
$con->close;
?>
