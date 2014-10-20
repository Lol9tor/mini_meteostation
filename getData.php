<?php
// записываем название нашего хоста
$dbhost = 'localhost';
//название базы данных
$dbuser = 'murano182_artem';

$dbpass = 'avatar555355';

$dbname = 'murano182_arduino';
// подключаемся к хосту
$connect = mysql_connect($dbhost, $dbuser, $dbpass);

if(! $connect )
{
  die('Could not connect: ' . mysql_error());
}
// выбираем БД
mysql_select_db ($dbname, $connect);

$rows = array();
// достать все элементы из таблицы sensor_data
$result = mysql_query("SELECT * FROM sensor_data");
while ($row = mysql_fetch_array($result)) {
    $rows[] = $row;
}
// пакуем в JSON для обработки на клиенте
echo json_encode($rows);

?>