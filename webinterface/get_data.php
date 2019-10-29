<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Content-Type: application/json; charset=UTF-8");

$params = json_decode($_GET["params"], false);

$con = new mysqli('DB URL','DB_NAME','DB_PASSWORD','DB_USERNAME');
if ($con->connect_error) 
{
    die('Could not connect: ' . $con->connect_error);
}

$sql=$con->prepare("SELECT * FROM solar_data WHERE date_time BETWEEN ? AND ? AND tank_temp <> 0 ORDER BY date_time ASC LIMIT 2016");
$sql->bind_param("ss",$params->date_from,$params->date_to);

$sql->execute();
$result = $sql->get_result();
$output_table = $result->fetch_all(MYSQLI_ASSOC);

echo json_encode($output_table);
$sql->close();
$con->close();

?>