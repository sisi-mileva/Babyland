<?php
const DB_USER = 'root';
const DB_PASS = '';

$pdo = new PDO('mysql:host=localhost;dbname=babyland', DB_USER, DB_PASS, [
		PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
]);

$userName = empty($_POST['user_name']) ? '' : $_POST['user_name'];

$sth = $pdo->prepare("SELECT user_name FROM player_info WHERE user_name='$userName'");
$sth->execute();

$result = $sth->fetchAll(PDO::FETCH_ASSOC);

if ($result == []) {
	$response = 0;
} else {
	$response = 1;
}
echo json_encode($response);