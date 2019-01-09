// ~ATH(THIS) {

var OutputsShown = false;

$(function(){
	
	$('form').submit(function(){ return false; }).css('display', 'block');
	
	var input = $('#l4m3_hum4n_1nput').focus();
	
	input.change(update).keyup(miniupdate);
	
	var s = window.location.search;
	if (s){
		s = unescape(s.substring(1, s.length));
		input.val(s);
	}
	
	// http://james.padolsey.com/javascript/jquery-plugin-autoresize/
	$('#l4m3_hum4n_1nput').autoResize({
		'extraSpace': 0
	});
	
	if (input.val().length > 0) update();
});

function miniupdate(e){
	if (!OutputsShown){
		OutputsShown = true;
		$('#outputs').fadeIn('slow');
	}

	var num = e.keyCode;
	if (num == 32){
		$('#outputs').prepend($("<span class='space'></span> "));
	} else if (num >= 65 && num <= 90){
		var ix = (num - 65) * 24;
		$('#outputs').prepend($("<span class='char'></span>").css("background-position", "-" + ix + "px 0px"));
	} else {
		// $("#heading").text(e.keyCode);
		update();
	}
}

function update(){
	if (!OutputsShown){
		OutputsShown = true;
		$('#outputs').fadeIn('slow');
	}

	var s = $('#l4m3_hum4n_1nput').val().toUpperCase();
	var lines = s.split('\n');
	var output = $('#outputs').empty();
	var first = true;
	
	for (var line in lines){
		if (first)
			first = false;
		else
			output.prepend("<br>");
	
		for (var i = 0; i < lines[line].length; i++){
			var num = lines[line].charCodeAt(i);
			if (num == 32){
				output.prepend($("<span class='space'></span>"));
			} else if (num >= 65 && num <= 90){
				var ix = (num - 65) * 24;
				output.prepend($("<span class='char'></span>").css("background-position", "-" + ix + "px 0px"));
			}
		}
	}
}

// } EXECUTE(NULL)
// THIS.DIE()
