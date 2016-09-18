<?php
const DB_USER = 'root';
const DB_PASS = '';

$pdo = new PDO('mysql:host=localhost;dbname=babyland', DB_USER, DB_PASS, [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
]);

$insertPersonSql = 'INSERT INTO player_info (first_name, last_name, email, user_name, password) VALUES (?, ?, ?, ?, ?)';

$errors = [];
function test_input($data) {
	$data = trim($data);
	$data = stripslashes($data);
	$data = htmlspecialchars($data);
	return $data;
}

if (!empty($_POST)) {
	$firstName = empty($_POST['first_name']) ? '' : $_POST['first_name'];
	$lastName = empty($_POST['last_name']) ? '' : $_POST['last_name'];
	$email = empty($_POST['email']) ? '' : $_POST['email'];
	$userName = empty($_POST['user_name']) ? '' : $_POST['user_name'];
	$password = empty($_POST['password']) ? '' : $_POST['password'];
	
	if (!$firstName) {
		$errors[] = 'First name is required';
	} else {
		$firstName = test_input($_POST['first_name']);
		
		if (!preg_match('/^[a-zA-Z ]*$/',$firstName)) {
			$errors[] = 'Only letters and white space allowed';
		}
	}
	
	if (!$lastName) {
		$errors[] = 'Last name is required';
	} else {
		$lastName = test_input($_POST['last_name']);
	
		if (!preg_match('/^[a-zA-Z ]*$/',$lastName)) {
			$errors[] = 'Only letters and white space allowed';
		}
	}
	
	if (!$email) {
		$errors[] = 'Email is required';
	} else {
		$email = test_input($_POST['email']);
	
		if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
	      $errors[] = "Invalid email format"; 
	    }
	}
	
	if (!$userName) {
		$errors[] = 'User name is required';
	} else {
		$userName = test_input($_POST['user_name']);
	
		if (strlen($userName) < 6 || strlen($userName) > 10) {
			$errors[] = "User name must be between 6 and 10 chars";
		}
	}
	
	if (!$password) {
		$errors[] = 'Password is required';
	} else {
		$password = test_input($_POST['password']);
	
		if (strlen($password) < 6 || strlen($password) > 10) {
			$errors[] = "Password must be between 6 and 10 chars";
		}
		$hashPass = md5($password);
	}
	
	if (!$errors) {
		$player = [$firstName, $lastName, $email, $userName, $hashPass];
		
		$statement = $pdo->prepare($insertPersonSql);
		
		$statement->execute($player);
		
		echo json_encode('Done');
	}
}