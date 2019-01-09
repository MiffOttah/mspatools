window.Timer = 0;
window.Interval = null;

window.Elements = {};
window.TrollData = {};
window.LatestTraitLI = null;

$(function(){
	$("#requires_javascript").show();
	$("#noscript").hide();
	
	Elements.Name = $("#name"); 
	Elements.Blood = $("#blood"); 
	Elements.Traits = $("#traits"); 
	Elements.Logo = $("#logo"); 
	
	$("#new").click(function (){ start(); });
	
	start();
});

function start(){
	Timer = 120;
	
	TrollData.UsedTraits = [];
	Elements.Traits.empty();
	
	if (!Interval){
		Interval = window.setInterval(iterate, 100);
	}
}

function iterate(){
	if (Timer >= 100) {
		stageOne();
	} else if (Timer >= 0) {
		stageTwo();
	} else {
		window.clearInterval(Interval);
		Interval = null;
	}
	
	Timer--;
}

function stageOne(){
	if (Timer >= 110){
		TrollData.BaseTrollID = rand(12);
		Elements.Name.text(Traits.BaseTrolls[TrollData.BaseTrollID]);
		
		if (Timer == 110){
			quickClass(Elements.Name, "complete");
		} else {
			quickClass(Elements.Name, "working");
		}
	}
	
	TrollData.BloodID = rand(12, TrollData.BaseTrollID);
	Elements.Blood.text(Traits.BloodColor[TrollData.BloodID][0]).css("color", Traits.BloodColor[TrollData.BloodID][1]);
	Elements.Logo.css("background-color", Traits.BloodColor[TrollData.BloodID][1]).css("background-position", (TrollData.BaseTrollID * -100) + "px");
}

function stageTwo(){
	if (!LatestTraitLI){
		LatestTraitLI = $("<li></li>").appendTo(Elements.Traits);
	}
	
	var t = generateTrait();
	LatestTraitLI.text(Traits.MasterTraitList[t[0]]);
	
	if ((Timer % 10) == 0){
		// Commit trait
		TrollData.UsedTraits.push(t[0]);
		if (t[1]){
			for (var i in t[1]){
				TrollData.UsedTraits.push(t[1][i]);
			}
		}
		LatestTraitLI = null;
	}
}

function generateTrait(){
	var trollId, traitId, trait, incompatible;
	
	do {
		trollId = (Math.random() < 0.5) ? TrollData.BaseTrollID : TrollData.BloodID;
		traitId = rand(Traits.BaseTraits[trollId].length);
		
		trait = Traits.BaseTraits[trollId][traitId];
			
		if (trait instanceof Array){
			trait = trait[0];
			incompatible = trait[1];
		} else {
			incompatible = null;
		}
		
	} while (contains(TrollData.UsedTraits, trait));
	
	return [
		trait,
		incompatible
	];
}



function rand(high, not){
	var result;
	do {
		result = Math.floor(Math.random() * high);
	} while (not !== undefined && result === not);
	return result;
}

function contains(arr, val){
	for (var i in arr) if (arr[i] === val) return true;
	return false;
}

// Faster then jQuery's addClass
function quickClass(e, n){
	e[0].className = n;
}


