<?php
const DB_USER = 'root';
const DB_PASS = '';

$pdo = new PDO('mysql:host=localhost;dbname=babyland', DB_USER, DB_PASS, [
		PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
]);

$userName = empty($_POST['user_name']) ? '' : $_POST['user_name'];
$password = empty($_POST['password']) ? '' : $_POST['password'];

$sth = $pdo->prepare("SELECT user_name, password FROM player_info");
$sth->execute();

$result = $sth->fetchAll(PDO::FETCH_ASSOC);

$check = false;
for ($i = 0; $i < count($result); $i++) {
	if ($result[$i]['user_name'] == $userName && $result[$i]['password'] == $password) {
		$check = true;
		break;
	}
}

echo json_encode($check);