$(function(){
	
	$('form').submit(function(){ return false; }).css('display', 'block');
	
	var input = $('#l4m3_hum4n_1nput').focus();
	
	mktroll('aT', '#8000ff');
	
	var allTrollList = new Array();
	for (var t in Trolls) allTrollList.push(t);
	var forceTroll = null;
	
	input.change(update).keyup(update);
	var s = window.location.search;
	
	// http://james.padolsey.com/javascript/jquery-plugin-autoresize/
	$('#l4m3_hum4n_1nput').autoResize({
		'onResize': syncSizes,
		'animateCallback': syncSizes,
		'extraSpace': 0
	});
	
	if (input.val().length > 0) update();
});

function randomOf(a){
	return a[Math.floor(Math.random() * a.length)];
}

function syncSizes(){ $('#outputs textarea').css('height', $(this).css('height')); }

function update(){
	if (!OutputsShown){
		OutputsShown = true;
		$('#outputs').fadeIn('slow');
	}

	var s = $('#l4m3_hum4n_1nput').val();
	var lines = s.split('\n');
	
	for (var t in Trolls){
		var outval = "";
		for (var i in lines){
			outval += (outval ? "\n" : "") + Trolls[t](lines[i].trim());
		}
		$('#text_' + t).val(outval);
	}
	
	/*
	if (TextLineCount != lines.length){
		TextLineCount = lines.length;
		$('textarea').animate({ height: (TextLineCount * 1.2) + "em" }, 'fast');
	}
	*/
}

function mktroll(n, c){
	var showOnlyThis = function(){ showOnly(n); };
	
	var p = $('<span class="trollname troll_' + n + '">' + n + ': </span>').appendTo('#outputs');
	$('<span class="trollimage"></span>').appendTo('#outputs');
	var t = $('<textarea readonly="readonly" class="troll_' + n + '" id="text_' + n + '"></textarea>').appendTo('#outputs');
	$('<br class="troll_' + n + '">').appendTo('#outputs');
	
	if (c){
		p.css('color', c);
		t.css('color', c);
		TrollColors[n] = c;
	}
}

TrollColors = { }
Trolls = {
	"aT": function(s) { return s.toLowerCase().replace(/[',":;]/g, '').replace(/[\-\/]/g, ' ').replace(/[!\?]/g, '.').replace(/ing\b/g, 'in').replace(/\b([a-z]*)([aeiouy])([b-dfghj-np-tv-xz]+)e\b/g, '$1$2e$3'); }
}
OutputsShown = false;
TextLineCount = 1;
