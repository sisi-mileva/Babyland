/**
 * 
 */
$(function() {
	var babyInfo;
	var newBaby;
	var audio = new Audio();
	var play = false
	var out;
	function loadPage() {
		if (sessionStorage.logged == 0) {
			window.open('index.html', '_self');
		} else if(sessionStorage.logged == 1){
			if (sessionStorage.hasBaby == -1) {
				$('#start').css('display', 'block');
				$('#baby-info').css('display', 'none');
				$('#game').css('display', 'none');
			} else {
				getInfo();
				$('#start').css('display', 'none');
				$('#baby-info').css('display', 'block');
				$('#game').css('display', 'none');
			}
		} else {
			getInfo();
			$('#start').css('display', 'none');
			$('#baby-info').css('display', 'none');
			$('#game').css('display', 'block');
		}
		sessionOut();
	}
	loadPage();
	
	$('#boy').on('click', function() {
		logOut();
		if ($('#baby-name').val() != '') {
			newBaby = new Baby(sessionStorage.user, $('#baby-name').val(), 'm', 0, 0, 0, 1);
			newBaby.setLastVisit($.now());
			setBaby(newBaby);
			setLastVisit();
			loadBabyData(newBaby);
		} else {
			$('#enter-name').html('  * Enter name');
		}
		sessionOut();
	})
	
	$('#girl').on('click', function() {
		if ($('#baby-name').val() != '') {
			logOut();
			newBaby = new Baby(sessionStorage.user, $('#baby-name').val(), 'f', 0, 0, 0, 1);
			newBaby.setLastVisit($.now());
			setBaby(newBaby);
			setLastVisit();
			loadBabyData(newBaby);
		} else {
			$('#enter-name').html('  * Enter name');
		}
		sessionOut();
	})
	
	$('#log-out').on('click', function() {
		setLastVisit();
		sessionStorage.logged = 0;
		window.open('index.html', '_self');
	})
	
	$('#go-game').on('click', function() {
		logOut();
		if (newBaby.getIsLive() == 0) {
			$('#start').css('display', 'block');
			$('#baby-info').css('display', 'none');
			$('#game').css('display', 'none');
		} else {
			sessionStorage.logged = 2;
			setLastVisit();
			$('#start').css('display', 'none');
			$('#baby-info').css('display', 'none');
			$('#game').css('display', 'block');
		}
		sessionOut();
	})
	
	$('#back').on('click', function() {
		logOut();
		sessionStorage.logged = 1;
		setLastVisit();
		$('#start').css('display', 'none');
		$('#baby-info').css('display', 'block');
		$('#game').css('display', 'none');
		sessionOut();
	})
	
	$('#jar').on('click', function() {
		logOut();
		
		if (play == false) {
			play = true;
			if (parseInt(newBaby.getFood()) < 100) {
				newBaby.setFood(parseInt(newBaby.getFood()) + 5);
				newBaby.updateBaby();
				loadBabyData(newBaby);
			}
			if (newBaby.getGender() == 'm') {
				changeImage('url("assets/images/boy1.png") no-repeat center center', 'url("assets/images/boy_eat.png") no-repeat center center');
				setTimeout(function() {
					setLastVisit();
					sessionOut();
					play = false;
				}, 3000);
			} else {
				changeImage('url("assets/images/girl1.png") no-repeat center center', 'url("assets/images/girl_eat.png") no-repeat center center');
				setTimeout(function() {
					setLastVisit();
					sessionOut();
					play = false;
				}, 3000);
			}
			playAudio('assets/sounds/eat.mp3');
		}
	})
	
	$('#bottle').on('click', function() {
		logOut();
		
		if (play == false) {
			play = true;
			if (parseInt(newBaby.getDrink()) < 100) {
				newBaby.setDrink(parseInt(newBaby.getDrink()) + 5);
				newBaby.updateBaby();
				loadBabyData(newBaby);
			}
			if (newBaby.getGender() == 'm') {
				changeImage('url("assets/images/boy1.png") no-repeat center center', 'url("assets/images/boy_drink.png") no-repeat center center');
				setTimeout(function() {
					setLastVisit();
					sessionOut();
					play = false;
				}, 3000);
			} else {
				changeImage('url("assets/images/girl1.png") no-repeat center center', 'url("assets/images/girl_drink.png") no-repeat center center');
				$('#drink').css('display', 'block');
				setTimeout(function() {
					$('#drink').css('display', 'none');
					setLastVisit();
					sessionOut();
					play = false;
				}, 3000);
			}
			playAudio('assets/sounds/eat.mp3');
		}
	})
	
	$('#bear').on('click', function() {
		logOut();
		
		if (play == false) {
			play = true;
			if (parseInt(newBaby.getHappiness()) < 100) {
				newBaby.setHappiness(parseInt(newBaby.getHappiness()) + 5);
				newBaby.updateBaby();
				loadBabyData(newBaby);
			}
			if (newBaby.getGender() == 'm') {
				changeImage('url("assets/images/boy1.png") no-repeat center center', 'url("assets/images/boy_play.png") no-repeat center center');
				setTimeout(function() {
					setLastVisit();
					sessionOut();
					play = false;
				}, 3000);
			} else {
				changeImage('url("assets/images/girl1.png") no-repeat center center', 'url("assets/images/girl_play.png") no-repeat center center');
				setTimeout(function() {
					setLastVisit();
					sessionOut();
					play = false;
				}, 3000);
			}
			playAudio('assets/sounds/laugh.mp3');
		}
	})
	
	$('#pacifier').on('click', function() {
		logOut();
		
		if (play == false) {
			play = true;
			
			if (newBaby.getGender() == 'm') {
				changeImage('url("assets/images/boy1.png") no-repeat center center', 'url("assets/images/boy_sleep.png") no-repeat center center');
				setTimeout(function() {
					setLastVisit();
					sessionOut();
					play = false;
				}, 14000);
			} else {
				changeImage('url("assets/images/girl1.png") no-repeat center center', 'url("assets/images/girl_sleep.png") no-repeat center center');
				setTimeout(function() {
					setLastVisit();
					sessionOut();
					play = false;
				}, 14000);
			}
			playAudio('assets/sounds/sleep1.mp3');
		}
	})
	
	$('#sound').on('click', function() {
		if (audio.muted) {
			audio.muted = false;
			$('#sound').css({
				'background': 'url("assets/images/sound_on.png") no-repeat center center',
				'background-size': '100% 100%'
			})
		} else {
			audio.muted = true;
			$('#sound').css({
				'background': 'url("assets/images/sound_off.png") no-repeat center center',
				'background-size': '100% 100%'
			})
		}
	})
	
	function sessionOut() {
		clearTimeout(out);
		out = setTimeout(function() {
			sessionStorage.logged = 0
			}, 3600000)
	}
	
	function logOut() {
		if (sessionStorage.logged == 0) {
			window.open('index.html', '_self');
		}
	}
	
	function setLastVisit() {
		if (newBaby != undefined) {
			newBaby.setLastVisit($.now());
			newBaby.updateBaby();
			loadBabyData(newBaby);
		}
	}
	
	function setBaby(newBaby){
		if (sessionStorage.hasBaby == -1) {
			newBaby.saveBaby();
		} else {
			newBaby.updateBaby();
		}
		sessionStorage.hasBaby = 1;
		$('#start').css('display', 'none');
		$('#baby-info').css('display', 'block');
		$('#game').css('display', 'none');
	}
	
	function getInfo() {
		var user = {
			 user_name: sessionStorage.user
		}
		 
		$.ajax({
				url: 'assets/server/get-info.php',
				method: 'POST',
				dataType: 'json',
				data: user
			}).then(function(data) {
				babyInfo = data;
				newBaby = new Baby(babyInfo[0].parent, babyInfo[0].name, babyInfo[0].gender, babyInfo[0].food,
						babyInfo[0].drink, babyInfo[0].happiness, babyInfo[0].is_live);
				newBaby.setLastVisit(babyInfo[0].last_visit);
				sessionOut();
				newBaby.changeBabyData();
				newBaby.updateBaby();
				loadBabyData(newBaby);
			}, function() {
				console.log('Request get-info fail');
		})
	}
	
	function loadBabyData(baby) {
		
		var lastVisitMiliSec = $.now() - parseInt(baby.getLastVisit());
		var hour = 60 * 60 * 1000;
		var lastVisitHoursAll = Math.floor(lastVisitMiliSec / hour);
		var lastVisitDays = Math.floor(lastVisitHoursAll / 24);
		var lastVisitHours = Math.floor(lastVisitHoursAll % 24);
		$('#last-visit').html(lastVisitDays + ' days ' + lastVisitHours + ' hours');

		$('#newBaby').html(baby.getName());
		$('.food').css('width', baby.getFood() + '%');
		$('.drink').css('width', baby.getDrink() + '%');
		$('.happy').css('width', baby.getHappiness() + '%');
		
		if (baby.getIsLive() == 0) {
			changeImage('url("assets/images/gost.png") no-repeat center center', 'url("assets/images/gost.png") no-repeat center center');
		} else {
			if (baby.getGender() == 'm') {
				changeImage('url("assets/images/boy1.png") no-repeat center center', 'url("assets/images/boy1.png") no-repeat center center');
			} else {
				changeImage('url("assets/images/girl1.png") no-repeat center center', 'url("assets/images/girl1.png") no-repeat center center');
			}
		}
	}
	
	function changeImage(u1, u2) {
		$('#img').css({
			'background': u1,
			'background-size': '100% 100%'
		})
		
		$('#baby').css({
			'background': u2,
			'background-size': '100% 100%'
		})
	}
	
	function playAudio(u) {
		audio.src = u;
		audio.play();
	}
})