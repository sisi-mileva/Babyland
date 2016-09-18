/**
 * 
 */
$(function() {
	(function blink() { 
		  $('#electricity').fadeOut(800).fadeIn(800, blink); 
		})();
	
	$('#sign-btn').on('click', function() {
		$('#enter').css('display', 'none');
		$('#new').css('display', 'block');
		$('#clothes').css('display', 'block');
	})
	
	$('a').on('click', function() {
		$('#enter').css('display', 'block');
		$('#new').css('display', 'none');
		$('#clothes').css('display', 'none');
	})
	
	function validName(name) {
		if (name == '') {
			return false;
		}
		
		return true;
	}
	
	function validEmail(email) {
		return email.match(/^[a-z][a-z\.\-\_0-9]+@[a-z0-9\-\_]+\.[a-z]{2,4}$/i) ? 
				true : false;
	}
	
	function userPass(user) {
		if (user.length < 6 || user.length > 10) {
			return false;
		}
		return true;
	}
	
	function passMatch(pass1, pass2) {
		if (pass1 != pass2) {
			return false;
		}
		return true;
	}
	
	function applyValidationToField(field, validationResult, message) {
		
		var p = field.next();
		p.html('');
		
		if (!validationResult) {
			p.html(message);
		}
	}
	
	$('#new-user').on('submit', function(event) {
		
		var result = true;
		var firstName =$('#f-name');
		var lastName =$('#l-name');
		var email = $('#email');
		var userName = $('#u-name');
		var password = $('#password1');
		var rPassword = $('#r-password');
		
		var r = validName(firstName.val());
		result = result && r;
		applyValidationToField(firstName, r, 'First name is required');
		
		var r = validName(lastName.val());
		result = result && r;
		applyValidationToField(lastName, r, 'Last name is required');
		
		var r = validEmail(email.val());
		result = result && r;
		applyValidationToField(email, r, 'Enter valid email');
		
		var r = userPass(userName.val());
		result = result && r;
		applyValidationToField(userName, r, 'Username must be between 6 and 10 chars');
		
		var r = userPass(password.val());
		result = result && r;
		applyValidationToField(password, r, 'Password must be between 6 and 10 chars');
		
		var r = passMatch(password.val(), rPassword.val());
		result = result && r;
		applyValidationToField(rPassword, r, 'Password does not match');
		
		if (!result) {
			event.preventDefault();
		} else {
			event.preventDefault();
			var user = {
					'user_name': userName.val()
			};
			
			$.ajax({
				url: 'assets/server/user-check.php',
				method: 'POST',
				dataType: 'json',
				data: user
			}).then(function(data) {
				var result = data;
				if (result == 1) {
					r = false;
					applyValidationToField(userName, r, 'Choose other username');
				} else {
					createUser();
					
					window.open('index.html', '_self');
				}
			}, function() {
				console.log('Request user-check fail');
			})
		}
	});
	
	function createUser() {
		var userInfo = {
				first_name: $('#f-name').val(),
				last_name: $('#l-name').val(),
				email: $('#email').val(),
				user_name: $('#u-name').val(),
				password: $('#password1').val()
		}
		
		$.ajax({
			url: 'assets/server/sign-up.php',
			method: 'POST',
			dataType: 'json',
			data: userInfo
		}).then(function(data) {
			console.log(data);
		}, function() {
			console.log('Request sign-up fail');
		})
	}
	
	$('#log-in').on('submit', function(event) {
		event.preventDefault();
		var userInfo = {
				user_name: $('#username').val(),
				password: $('#password').val()
		}
		
		$.ajax({
			url: 'assets/server/log-in.php',
			method: 'POST',
			dataType: 'json',
			data: userInfo
		}).then(function(data) {
			var result = data;
			if (result == 0) {
				$('#log-error').css('display', 'block');
			} else {
				sessionStorage.user = $('#username').val();
				sessionStorage.logged = 1;
				babyCheck();
			}
		}, function() {
			console.log('Request log-in fail');
		})
	})
	
	function babyCheck() {
		var user = {
				user_name: $('#username').val()
		}
		
		$.ajax({
			url: 'assets/server/baby-check.php',
			method: 'POST',
			dataType: 'json',
			data: user
		}).then(function(data) {
			sessionStorage.hasBaby = data;
			window.open('game.html', '_self');
		}, function() {
			console.log('Request baby-check fail');
		})
	}
	
})