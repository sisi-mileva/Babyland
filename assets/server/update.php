<?php
const DB_USER = 'root';
const DB_PASS = '';

$pdo = new PDO('mysql:host=localhost;dbname=babyland', DB_USER, DB_PASS, [
		PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
]);

$sth = $pdo->prepare('UPDATE baby_info SET name = :name, gender = :gender, food = :food, drink = :drink, happiness = :happiness,
					is_live = :is_live, last_visit = :last_visit WHERE parent = :parent');

$parent = empty($_POST['parent']) ? '' : $_POST['parent'];
$name = empty($_POST['name']) ? '' : $_POST['name'];
$gender = empty($_POST['gender']) ? '' : $_POST['gender'];
$food = empty($_POST['food']) ? '' : $_POST['food'];
$drink = empty($_POST['drink']) ? '' : $_POST['drink'];
$happiness = empty($_POST['happiness']) ? '' : $_POST['happiness'];
$isLive = empty($_POST['is_live']) ? '' : $_POST['is_live'];
$lastVisit = empty($_POST['last_visit']) ? '' : $_POST['last_visit'];

$sth->execute([':name' => $name, ':gender' => $gender, ':food' => $food, ':drink' => $drink, ':happiness' => $happiness, 
				':is_live' => $isLive, ':last_visit' => $lastVisit, ':parent' => $parent]);

echo json_encode('Done');