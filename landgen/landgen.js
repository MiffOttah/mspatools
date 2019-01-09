LANDGEN_VER = "2.1.3";

RANDOM = -1;
MALE = 0;
FEMALE = 1;

Timer = 40;
Interval = null;
LastLand1 = null;
Gender = RANDOM;
LongTitles = false;

Spiro1 = 255;
Spiro2 = 255;
Spiro3 = 255;

Interest1 = 0;
Interest2 = 0;
Specibus = 0;

ForceTitle1 = '';
ForceTitle2 = '';
ForceLand1 = '';
ForceLand2 = '';
ForceChum1 = '';
ForceChum2 = '';
LockColor = false;

OptionsWindowVisible = false;
FacebookVisible = true;
TwitterVisible = true;

window.onload = function(){
	document.getElementById("req_js").style.display = "block";
	
	if (window.location.search){
		var params = window.location.search.split(/[?&]/g);
		
		for (i in params){
			var paramValues = params[i].split(/=/);
			if (paramValues.length >= 2){
				var k = unescape(paramValues[0]);
				var v = unescape(paramValues[1]);
				
				switch(k){
					case 'title1': ForceTitle1 = v; break;
					case 'title2': ForceTitle2 = v; break;
					case 'land1': ForceLand1 = v; break;
					case 'land2': ForceLand2 = v; break;
					case 'chum1': ForceChum1 = v; break;
					case 'chum2': ForceChum2 = v; break;
					case 'color': forceColor(v); break;
				}
			}
		}
	}
	
	document.getElementById("spirograph").onclick = start;
	document.getElementById("gender_male").onclick = function(){ setGender(MALE); return false; };
	document.getElementById("gender_female").onclick = function(){ setGender(FEMALE); return false; };
	document.getElementById("gender_random").onclick = function(){ setGender(RANDOM); return false; };
	
	document.getElementById("show_bbcode").onclick = function(){
		var bbcode_textarea = document.getElementById("bbcode");
		if (bbcode_textarea.style.display == "inline"){
			bbcode_textarea.style.display = "none";
		} else if (Timer <= 0) {
			var colorTag = "[color=#";
			colorTag += ((Spiro1 < 0x10) ? "0" : "") + Spiro1.toString(16);
			colorTag += ((Spiro2 < 0x10) ? "0" : "") + Spiro2.toString(16);
			colorTag += ((Spiro3 < 0x10) ? "0" : "") + Spiro3.toString(16);
			colorTag += "]";
			
			var bbcode = "You are the " + colorTag
			bbcode += document.getElementById("title_1").innerHTML +" of " + document.getElementById("title_2").innerHTML;
			bbcode += "[/color] in the " + colorTag + "Land of " + document.getElementById("land_1").innerHTML;
			bbcode += " and " + document.getElementById("land_2").innerHTML;
			bbcode += "[/color].\r\n";
			bbcode += "Your chumHandle is " + colorTag
			bbcode += document.getElementById("chum_1").innerHTML + document.getElementById("chum_2").innerHTML;
			bbcode += "[/color]" + "\r\n\r\n";
			
			bbcode += "Your interests include " + document.getElementById("interest_1").innerHTML.toUpperCase();
			bbcode += " and " + document.getElementById("interest_2").innerHTML.toUpperCase() + ".\r\n";
			bbcode += "Your wield the " + document.getElementById("specibus").innerHTML;
			bbcode += " specibus and have combined your " + document.getElementById("weapon").innerHTML.toUpperCase();
			bbcode += " with your " + document.getElementById("item_1").innerHTML.toUpperCase();
			bbcode += " and " + document.getElementById("item_2").innerHTML.toUpperCase();
			bbcode += " to create your awesome weapon.\r\n\r\n";
			
			bbcode += "The consorts of your land are " + document.getElementById("consort_quirk").innerHTML;
			bbcode += " " + document.getElementById("consort_color").innerHTML;
			bbcode += " " + document.getElementById("consort_type").innerHTML;
			bbcode += " who like " + document.getElementById("consort_like").innerHTML;
			bbcode += ".";
			
			bbcode_textarea.value = bbcode;
			bbcode_textarea.style.color = "rgb(" + Spiro1 + "," + Spiro2 + "," + Spiro3 + ")";
			bbcode_textarea.style.display = "inline";
			bbcode_textarea.focus();
			bbcode_textarea.select();
		}
		return false;
	};
	document.getElementById("tweet").onclick = function(){
		if (Timer <= 0) {
			var msg = "I am the the ";
			msg += document.getElementById("title_1").innerHTML +" of " + document.getElementById("title_2").innerHTML;
			msg += " in the Land of " + document.getElementById("land_1").innerHTML;
			msg += " and " + document.getElementById("land_2").innerHTML;
			msg += ". #mspalandgen | Join a session at";
			
			var twitter_url = "https://twitter.com/share/?url=https//miffthefox.info/mspa/landgen/&text=" + encodeURIComponent(msg);
			var left = (screen.width/2)-(275);
			var top = (screen.height/2)-(120);
			window.open(twitter_url, "tweet-window", "resizable=1,width=550,height=420,top=" + top + ",left=" + left);
			
			//alert(msg + "\r\n" + msg.length);
		}
		return false;
	};

	document.getElementById("options_header").onclick = function(){
		OptionsWindowVisible = !OptionsWindowVisible;
		if (OptionsWindowVisible){
			document.getElementById("options").className = "options_shown";
		} else {
			document.getElementById("options").className = "";
		}
		return false;
	};
	
	setGender(parseInt(getOpt("gender", RANDOM), 10));
	LongTitles = str2bool(getOpt("multisyllable", bool2str(false)));

	document.getElementById("opt_multisyllable").checked = LongTitles;
	document.getElementById("opt_multisyllable").onclick = function(){
		LongTitles = this.checked;
		setOpt("multisyllable", bool2str(LongTitles));
	};


	ShowFacebook = str2bool(getOpt("facebook", bool2str(true)));
	document.getElementById("opt_no_facebook").checked = !ShowFacebook;
	document.getElementById("facebook").style.display = ShowFacebook ? "block" : "none";
	document.getElementById("opt_no_facebook").onclick = function(){
		ShowFacebook = !this.checked;
		document.getElementById("facebook").style.display = ShowFacebook ? "block" : "none";
		setOpt("facebook", bool2str(ShowFacebook));
	};
	
	ShowTwitter = str2bool(getOpt("twitter", bool2str(true)));
	document.getElementById("opt_no_twitter").checked = !ShowTwitter;
	document.getElementById("twitter").style.display = ShowTwitter ? "block" : "none";
	document.getElementById("opt_no_twitter").onclick = function(){
		ShowTwitter = !this.checked;
		document.getElementById("twitter").style.display = ShowTwitter ? "block" : "none";
		setOpt("twitter", bool2str(ShowTwitter));
	};

	LongTitleName1 = LongTitleName1.concat(TitleName1);
	LongTitleName2 = LongTitleName2.concat(TitleName2);

	settext("landgen_version", LANDGEN_VER);
	start();
}

function forceColor(c){
	c = c.toLowerCase().replace(/[^0-9a-f]/g, '');
	if (c.length >= 6){
		var Rs = c.substring(0, 2);
		var Gs = c.substring(2, 4);
		var Bs = c.substring(4, 6);
		
		Spiro1 = parseInt(Rs, 16);
		Spiro2 = parseInt(Gs, 16);
		Spiro3 = parseInt(Bs, 16);
		LockColor = true;
	}
}

function setGender(g){
	Gender = g;
	document.getElementById("gender_male").className = (g == MALE) ? "active" : "";
	document.getElementById("gender_female").className = (g == FEMALE) ? "active" : "";
	document.getElementById("gender_random").className = (g == RANDOM) ? "active" : "";
	setOpt("gender", g);

	startAt(40);
}

function start(){
	startAt(40);
}
function startAt(n){
	Timer = n;

	if (!Interval)
		Interval = window.setInterval(mkrandom, 100);
	
	document.getElementById("bbcode").style.display = "none";
	
	return false;
}

function mkrandom(){
	Timer--;
	
	if (Timer > 30){
	
		var land1 = randomOf(LandName), land2 = randomOf(LandName);
		while (land2 == land1) land2 = randomOf(LandName);
		
		LastLand1 = land1;
		settext("land_1", ForceLand1 || land1);
		settext("land_2", ForceLand2 || land2);
		
		setclass("land_1", "working");
		setclass("land_2", "working");
		
	} else if (Timer > 20){
	
		var land2 = randomOf(LandName);
		while (land2 == LastLand1) land2 = randomOf(LandName);
		
		settext("land_2", ForceLand2 || land2);
		
		setclass("land_1", "");
		setclass("land_2", "working");
	} else {
		setclass("land_1", "");
		setclass("land_2", "");
	}
	
	if (Timer > 35){
		Interest1 = Math.floor(Math.random() * Interests.length);
		settext("interest_1", Interests[Interest1][0]);
		setclass("interest_1", "working");
	} else {
		setclass("interest_1", "");
	}
	
	if (Timer > 25){
		Interest2 = Math.floor(Math.random() * Interests.length);
		settext("interest_2", Interests[Interest2][0]);
		setclass("interest_2", "working");
	} else {
		setclass("interest_2", "");
	}
	while (Interest2 == Interest1){
		Interest2 = Math.floor(Math.random() * Interests.length);
		settext("interest_2", Interests[Interest2][0]);
	}
	
	if (Timer > 25){
		Specibus = Math.floor(Math.random() * Specibi.length);
		settext("specibus", Specibi[Specibus][0]);
		settext("weapon", randomOf(Specibi[Specibus][1]));
		setclass("specibus", "working");
		setclass("weapon", "working");
	} else {
		setclass("specibus", "");
		setclass("weapon", "");
	}
	
	if (Timer > 22){
		settext("item_1", randomOf(Interests[Interest1][1]));
		setclass("item_1", "working");
	} else {
		setclass("item_1", "");
	}
	
	if (Timer > 12){
		settext("item_2", randomOf(Interests[Interest2][1]));
		setclass("item_2", "working");
	} else {
		setclass("item_2", "");
	}
	
	
	if (Timer > 15){
		var chum1 = randomOf(Chum1);
		settext("chum_1", ForceChum1 || chum1);
		setclass("chum_1", "working");
	} else {
		setclass("chum_1", "");
	}
	if (Timer > 5){
		var chum2 = randomOf(Chum2);
		settext("chum_2", ForceChum2 || chum2);
		setclass("chum_2", "working");
	} else {
		setclass("chum_2", "");
	}
	
	if (Timer > 10){
		settext("title_1", ForceTitle1 || randomOf(LongTitles ? LongTitleName1 : TitleName1));
		setclass("title_1", "working");
	} else {
		setclass("title_1", "");
	}
	
	if (Timer > 0){
		settext("title_2", ForceTitle2 || randomOf(LongTitles ? LongTitleName2 : TitleName2));
		setclass("title_2", "working");
		setclass("show_bbcode", "working");
		setclass("tweet", "working");
	} else {
		setclass("title_2", "");
		setclass("show_bbcode", "");
		setclass("tweet", "");
		
		if (document.getElementById("title_2").innerHTML == "Space") settext("land_2", "Frogs");
	}
	
	quickRandomizer(33, "consort_type", ConsortTypes);
	quickRandomizer(23, "consort_color", ConsortColors);
	quickRandomizer(13, "consort_quirk", ConsortQuirks);
	quickRandomizer(3, "consort_like", ConsortLikes);
	
	if (Timer > 0){
		if (!window.LockColor){
			Spiro1 = (Spiro1 + rand(-32, 32) + 256) % 256;
			Spiro2 = (Spiro2 + rand(-32, 32) + 256) % 256;
			Spiro3 = (Spiro3 + rand(-32, 32) + 256) % 256;
		}
		
		document.getElementById("spirograph").style.backgroundColor = "rgb(" + Spiro1 + "," + Spiro2 + "," + Spiro3 + ")";
		setcolor('chum_1', Spiro1, Spiro2, Spiro3);
		setcolor('chum_2', Spiro1, Spiro2, Spiro3);
	}
	
	if (Timer <= 0){
		clearInterval(Interval);
		Interval = null;
		return;
	}
}

function quickRandomizer(threshhold, id, source){
	if (Timer > threshhold){
		settext(id, randomOf(source));
		setclass(id, "working");
	} else {
		setclass(id, "");
	}
}

function randomOf(a, noarray){
	var result = a[Math.floor(Math.random() * a.length)];
	
	if (!noarray && (result instanceof Array)){ // "Hack" for male/female variations
		var gendered_result;
		if (Gender == RANDOM){
			gendered_result = result[Math.floor(Math.random() * 2)];
		} else {
			gendered_result = result[Gender == MALE ? 0 : 1];
		}
		if (gendered_result) return gendered_result; else return randomOf(a);
	}
	
	return result;
}
function rand(low, high){
	return Math.floor(Math.random() * (high - low)) + low;
}
function setclass(id, className){
	var e = document.getElementById(id);
	if (e.className != className) e.className = className;
}
function setcolor(id, r, g, b){
	var e = document.getElementById(id);
	e.style.color = "rgb(" + r + "," + g + "," + b + ")";
}
function settext(id, content){
	var e = document.getElementById(id);
	while (e.firstChild) e.removeChild(e.firstChild);
	e.appendChild(document.createTextNode(content));
}

function setOpt(name, value) {
	var date = new Date();
	date.setTime(date.getTime()+5184000000);
	var expires = "; expires=" + date.toGMTString();
	document.cookie = "mspa_landgen_option_" + name + "=" + value + expires + "; path=/";
	//alert("Set " + name + " to " + value);
}
function getOpt(name, defaultValue) {
	var search = "mspa_landgen_option_" + name + "=";
	var cookies = document.cookie.split(';');
	for(var i = 0; i < cookies.length; i++) {
		var c = cookies[i];
		while (c.charAt(0) == ' ') c = c.substring(1, c.length);
		if (c.indexOf(search) == 0) return c.substring(search.length, c.length);
	}
	return defaultValue;
}
function str2bool(v){ return v === "1"; }
function bool2str(v){ return v ? "1" : "0"; }

