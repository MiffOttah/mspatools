// ~ATH (THIS) {

window.OnlyProcess = null;

$(function(){
	
	$('form').submit(function(){ return false; }).css('display', 'block');
	
	var input = $('#l4m3_hum4n_1nput').focus();
	
	mktroll('aA', '#A10000', 1, 3);
	mktroll('aT', '#A15000', 0, 0);
	mktroll('tA', '#A1A100', 0, 2);
	mktroll('cG', '#626262', 0, 1);
	mktroll('aC', '#416600', 1, 2);
	mktroll('gA', '#008141', 0, 3);
	mktroll('gC', '#008282', 1, 0);
	mktroll('aG', '#005682', 2, 0);
	mktroll('cT', '#000056', 2, 1);
	mktroll('tC', '#2B0057', 1, 1);
	mktroll('cA', '#6A006A', 2, 2);
	mktroll('cC', '#77003C', 2, 3);
	
	var allTrollList = new Array();
	for (var t in Trolls) allTrollList.push(t);
	var forceTroll = null;
	
	input.change(update).keyup(update);
	var s = window.location.search;
	if (s){
		s = unescape(s.substring(1, s.length));
		input.val(s);
		if (/^:/.test(s)){
			// For debugging.
			forceTroll = s.substring(1);
			showOnly(forceTroll);
		}
	}
	
	var rTroll1 = forceTroll || randomOf(allTrollList);
	document.title = Trolls[rTroll1](document.title);
	$('#heading').text(document.title).css('color', TrollColors[rTroll1]);
	
	var rTroll2 = forceTroll || randomOf(allTrollList);
	$('#desc').text(Trolls[rTroll2]($('#desc').text())).css('color', TrollColors[rTroll2]);
	
	var rTroll3 = forceTroll || randomOf(allTrollList);
	//$('#footer').text(Trolls[rTroll2]($('#footer').text())).css('color', TrollColors[rTroll2]);
	$('#footer span, #footer a').each(function(i, el){
		var jel = $(el);
		jel.text(Trolls[rTroll3](jel.text()));
		jel.css('color', TrollColors[rTroll3]);
		var ht = jel.html();
		ht = ht.replace(/(m[i1]i?ff+t(h|\)\()[e3]f[o0][x%])/i, '<a href="http://miff.furopolis.org/">$1</a>');
		ht = ht.replace(/([4a]ndr[e3]ww? (h|\)\()uss+[1i]i?[e3])/i, '<a href="http://mspaintadventures.com/">$1</a>');
		jel.html(ht);
	});
	
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
	
	if (OnlyProcess){
		var outval = "";
		for (var i in lines){
			outval += (outval ? "\n" : "") + Trolls[OnlyProcess](lines[i].trim());
		}
		$('#text_' + OnlyProcess).val(outval);
	} else {
		for (var t in Trolls){
			var outval = "";
			for (var i in lines){
				outval += (outval ? "\n" : "") + Trolls[t](lines[i].trim());
			}
			$('#text_' + t).val(outval);
		}
	}
	
	/*
	if (TextLineCount != lines.length){
		TextLineCount = lines.length;
		$('textarea').animate({ height: (TextLineCount * 1.2) + "em" }, 'fast');
	}
	*/
}

function mktroll(n, c, imgrow, imgcol){
	var showOnlyThis = function(){ showOnly(n); };
	
	var p = $('<span class="trollname troll_' + n + '">' + n + ': </span>').click(showOnlyThis).appendTo('#outputs');
	$('<span class="trollimage troll_' + n + '"></span>').css('background-position', '-' + (imgcol * 48) + 'px -' + (imgrow * 48) + 'px').click(showOnlyThis).appendTo('#outputs');
	var t = $('<textarea readonly="readonly" class="troll_' + n + '" id="text_' + n + '"></textarea>').appendTo('#outputs');
	$('<br class="troll_' + n + '">').appendTo('#outputs');
	
	if (c){
		p.css('color', c);
		t.css('color', c);
		TrollColors[n] = c;
	}
}

function showOnly(n){
	if (window.OnlyProcess){
		var sc = ".troll_" + OnlyProcess;
		$("#outputs *").not(sc).show();
		window.OnlyProcess = null;
		update();
	} else {
		window.OnlyProcess = n;
		var sc = ".troll_" + n;
		$("#outputs *").not(sc).hide();
	}
}
String.prototype.trim = function(){
	return this.replace(/^\s+/, "").replace(/\s+$/, "");
}

REGEX_PUNCTUATION = /[',\.!\?"]/g;

TrollColors = { }
Trolls = {
	"aA": function(s){ return s.toLowerCase().replace(REGEX_PUNCTUATION, '').replace(/o/g, '0'); },
	"aT": function(s){ return s.toUpperCase().replace(/[\.\?!]/g, ',').replace(/^.|(,\s+.)/g, function($1) { return $1.toLowerCase(); }); },
	"cG": function(s){ return s.toUpperCase(); },
	"gC": function(s){ return s.toUpperCase().replace(/[',"]/g, '').replace(/(\.\.+)/g, '.$1').replace(/\.(?!\.)/g, '').replace(/A/g, '4').replace(/I/g, '1').replace(/E/g, '3'); },
	"gA": function(s){ return s.toLowerCase().replace(REGEX_PUNCTUATION, '').replace(/^.|(\s.)/g, function($1) { return $1.toUpperCase(); }); },
	"tC": function(s){
		var ns = "";
		var flip = true;
		for (var i = 0; i < s.length; i++){
			var ch = s.substr(i, 1);
			ns += flip ? ch.toUpperCase() : ch.toLowerCase();
			flip = !flip;
		}
		return ns;
	},
	"tA": function(s){ return s.toLowerCase().replace(/s/g, '2').replace(/i/g, 'ii').replace(/too?\b/g, 'two'); },
	"aC": function(s){ return ":33 < " + s.toLowerCase().replace(/per/g, "purr").replace(/pau/g, "paw").replace(/pon/g, "pawn").replace(/ee/g, '33').replace(/:([!-~])/gi, ':$1$1'); },
	"aG": function(s){ return s.replace(/([a-z])\1{2,}/gi, function($1){
		var ch = $1.substr(0, 1);
		return ch + ch + ch + ch + ch + ch + ch + ch;
	}).replace(/B/gi, '8').replace(/ate/gi, '8').replace(/([:;]-?[\(\[\)\]])/g, function($1){
		return ":::" + $1;
	}); },
	"cT": function(s){ return "D --> " + s.replace(/x/gi, '%').replace(/cross/gi, '%').replace(/\b[.!\?]/g, '').replace(/(loo|ool)/gi, function($1){
		return $1.replace(/l/gi, '1').replace(/o/gi, '0');
	}); },
	"cC": function(s){ return s.replace(/h/gi, ')(').replace(/E/g, '-E'); },
	"cA": function(s){ return s.toLowerCase().replace(REGEX_PUNCTUATION, '').replace(/v/g, 'vv').replace(/w/g, 'ww'); }
}
OutputsShown = false;
TextLineCount = 1;

// } EXECUTE(NULL);
// THIS.DIE();
