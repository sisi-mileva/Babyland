/**
 * 
 */
function Baby(parent, name, gender, food, drink, happiness, isLive) {
	var _parent = parent;
	var _name= name;
	var _gender = gender;
	var _food = food;
	var _drink = drink;
	var _happiness = happiness;
	var _isLive = isLive;
	var _lastVisit;
	
	this.getParent = function() {
		return _parent;
	}
	
	this.setParent = function(value) {
		_parent = value;
	}
	
	this.getName = function() {
		return _name;
	}
	
	this.setName = function(value) {
		_name = value;
	}
	
	this.getGender = function() {
		return _gender;
	}
	
	this.setGender = function(value) {
		_gender = value;
	}
	
	this.getFood = function() {
		return _food;
	}
	
	this.setFood = function(value) {
		_food = value;
	}
	
	this.getDrink = function() {
		return _drink;
	}
	
	this.setDrink = function(value) {
		_drink = value;
	}
	
	this.getHappiness = function() {
		return _happiness;
	}
	
	this.setHappiness = function(value) {
		_happiness = value;
	}
	
	this.getIsLive = function() {
		return _isLive;
	}
	
	this.setIsLive = function(value) {
		_isLive = value;
	}
	
	this.getLastVisit = function() {
		return _lastVisit;
	}
	
	this.setLastVisit = function(value) {
		_lastVisit = value;
	}
}

Baby.prototype.saveBaby = function() {
	var baby = {
			parent: this.getParent(),
			name: this.getName(),
			gender: this.getGender(),
			food: this.getFood(),
			drink: this.getDrink(),
			happiness: this.getHappiness(),
			is_live: this.getIsLive(),
			last_visit: ''
	}
	
	$.ajax({
		url: 'assets/server/save.php',
		method: 'POST',
		dataType: 'json',
		data: baby
	}).then(function(data) {
		console.log(data);
	}, function() {
		console.log('Request save fail');
	})
}

Baby.prototype.updateBaby = function() {
	var baby = {
			parent: this.getParent(),
			name: this.getName(),
			gender: this.getGender(),
			food: this.getFood(),
			drink: this.getDrink(),
			happiness: this.getHappiness(),
			is_live: this.getIsLive(),
			last_visit: this.getLastVisit()
	}
	
	$.ajax({
		url: 'assets/server/update.php',
		method: 'POST',
		dataType: 'json',
		data: baby
	}).then(function(data) {
		console.log(data);
	}, function() {
		console.log('Request update fail');
	})
}

Baby.prototype.changeBabyData = function() {
	var lastVisitMiliSec = $.now() - parseInt(this.getLastVisit());
	var hour = 60 * 60 * 1000;
	var lastVisitHoursAll = Math.floor(lastVisitMiliSec / hour);
	var lastVisitDays = Math.floor(lastVisitHoursAll / 24);
	
	if (lastVisitDays >= 5) {
		this.setIsLive(0);
	}
	
	var take = lastVisitHoursAll * 5;
	if (take >= parseInt(this.getFood())) {
		this.setFood(0);
	} else {
		this.setFood(parseInt(this.getFood()) - take);
	}
	
	if (take >= parseInt(this.getDrink())) {
		this.setDrink(0);
	} else {
		this.setDrink(parseInt(this.getDrink()) - take);
	}
	
	if (take >= parseInt(this.getHappiness())) {
		this.setHappiness(0);
	} else {
		this.setHappiness(parseInt(this.getHappiness()) - take);
	}
}