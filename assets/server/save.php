<?php
const DB_USER = 'root';
const DB_PASS = '';

$pdo = new PDO('mysql:host=localhost;dbname=babyland', DB_USER, DB_PASS, [
		PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
]);

$insertBabySql = 'INSERT INTO baby_info (parent, name, gender, food, drink, happiness, is_live, last_visit) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

if (!empty($_POST)) {
	$parent = empty($_POST['parent']) ? '' : $_POST['parent'];
	$name = empty($_POST['name']) ? '' : $_POST['name'];
	$gender = empty($_POST['gender']) ? '' : $_POST['gender'];
	$food = empty($_POST['food']) ? '' : $_POST['food'];
	$drink = empty($_POST['drink']) ? '' : $_POST['drink'];
	$happiness = empty($_POST['happiness']) ? '' : $_POST['happiness'];
	$isLive = empty($_POST['is_live']) ? '' : $_POST['is_live'];
	$lastVisit = empty($_POST['last_visit']) ? '' : $_POST['last_visit'];
	
	$baby = [$parent, $name, $gender, $food, $drink, $happiness, $isLive, $lastVisit];
	
	$statement = $pdo->prepare($insertBabySql);
	
	$statement->execute($baby);
	
	echo json_encode('Done');
}
