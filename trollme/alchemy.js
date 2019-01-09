CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijlkmnopqrstuvwxyz?!";
Mode = 1;

$(function(){
	$("#codeinput input").change(update).keyup(update);
	$("#mode1").click(function(){ Mode = 1; $("#mode1").addClass("active"); $("#mode2").removeClass("active");; update(); });
	$("#mode2").click(function(){ Mode = 2; $("#mode2").addClass("active"); $("#mode1").removeClass("active");; update(); });

	$(".set").click(set);	
	
	$("#controls").show();
	update();
});

function update(){
	var a = decodeCaptcha($("#code1").val());
	var b = decodeCaptcha($("#code2").val());
	
	for (var i = 0; i < 8; i++) {
		if (Mode == 1)
			a[i] &= b[i];
		else
			a[i] |= b[i];
	}
	
	$("#result").val(encodeCaptcha(a));
}

function encodeCaptcha(n){
	var rv = "";
	for (var i = 0; i < 8; i++) {
		if (n[i] < CHARS.length) rv += CHARS.charAt(n[i]);
		else rv += "!";
	}
	return rv;
}

function decodeCaptcha(s){
	var rv = new Array();
	for (var i = 0; i < 8; i++) {
		var c = (i < s.length) ? s.charAt(i) : "0";
		var index = CHARS.indexOf(c);
		if (index >= 0) rv[i] = index;
		else rv[i] = 0;
	}
	return rv;
}

function set(e){
	update();
	var v = $("#result").val();
	
	if ($(this).attr("href") == "#1"){
		$("#code1").val(v);
		$("#code2").focus();
	} else {
		$("#code2").val(v);
		$("#code1").focus();
	}
	
	e.preventDefault();
	return false;
}
