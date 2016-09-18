<?php
const DB_USER = 'root';
const DB_PASS = '';

$pdo = new PDO('mysql:host=localhost;dbname=babyland', DB_USER, DB_PASS, [
		PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
]);

$userName = empty($_POST['user_name']) ? '' : $_POST['user_name'];

$sth = $pdo->prepare("SELECT * FROM baby_info WHERE parent='$userName'");
$sth->execute();

$result = $sth->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($result);