<?php
const DB_USER = 'root';
const DB_PASS = '';

$pdo = new PDO('mysql:host=localhost;dbname=babyland', DB_USER, DB_PASS, [
		PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
]);

$userName = empty($_POST['user_name']) ? '' : $_POST['user_name'];

$sth = $pdo->prepare("SELECT is_live FROM baby_info WHERE parent='$userName'");
$sth->execute();

$result = $sth->fetchAll(PDO::FETCH_ASSOC);

if ($result == []) {
	$response = -1;
} elseif ($result[0]['is_live'] == 0) {
	$response = 0;
} else {
	$response = 1;
}
echo json_encode($response);