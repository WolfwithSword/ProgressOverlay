$(document).ready(function() {
	createBarsFromJson();
	setInterval(function(){updateBarsFromJson() }, 5000);//10000);
});

function createBarsFromJson() {
	var hostUrl = location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '');
    $.ajax({
       url : hostUrl +"/getData",
       async: true,
       type: 'GET',
       dataType : "json",
       success : function(data) {
		   progBars = "";
		   
			$('#page-wrap').html(progBars);
			for (var x in data.ProgressBars) {
				obj = data.ProgressBars[x];
				if (obj.enabled) {
					var barDiv = "<p class=\"formP\" id=\""+obj.name.replace(/ /g,"_")+"_P"+"\" style=\"width:130px; float:middle;\">"+obj.name+"</p>"
						barDiv += "<div class=\"formBar\" id=\""+(obj.name.replace(/ /g,"_"))+"\" style=\"float:left; height: 104px;\"> </div>";
						$('#page-wrap').append(barDiv);

						var lbar = new ldBar("#"+obj.name.replace(/ /g,"_"),
							{
								"stroke": obj.colour,
								"stroke-width":15,
								"preset":"circle",
								"stroke-trail-width":15,
								"stroke-trail":"#cdcdcd",
								"max":obj.maxval
							});
						lbar.set(obj.value);
				}
			}
           }
       })
}

function updateBarsFromJson() {
	var hostUrl = location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '');
	var existingBars = [];
	$('#page-wrap').find('p').each(function(){existingBars.push(this.innerHTML)});
    $.ajax({
       url : hostUrl +"/getData",
       async: true,
       type: 'GET',
       dataType : "json",
       success : function(data) {
			for (var x in data.ProgressBars) {
				obj = data.ProgressBars[x];
				existingBars = existingBars.filter(name => name != obj.name);
				if($('#'+obj.name.replace(/ /g,"_")).length) 
				{
					var lbar = document.getElementById(obj.name.replace(/ /g,"_")).ldBar;
					lbar.set(obj.value);
					// Colours still cannot be changed in real time. May implement function in loading-bar.js to do this. 
					//lbar.stroke = obj.colour;
				}
				else 
				{
					if (obj.enabled) {
						var barDiv = "<p class=\"formP\" id=\""+obj.name.replace(/ /g,"_")+"_P"+"\" style=\"width:130px; float:middle;\">"+obj.name+"</p>"
						barDiv += "<div class=\"formBar\" id=\""+(obj.name.replace(/ /g,"_"))+"\" style=\"float:left; height: 104px;\"> </div>";
						$('#page-wrap').append(barDiv);

						var lbar = new ldBar("#"+obj.name.replace(/ /g,"_"),
							{
								"stroke": obj.colour,
								"stroke-width":13,
								"preset":"circle",
								"stroke-trail-width":13,
								"stroke-trail":"#cdcdcd",
								"max":obj.maxval
							});
						lbar.set(obj.value);
					}
				}
			}
			for (var i in existingBars)
			{		
				var name = existingBars[i];
				$('#'+name.replace(/ /g,"_")).remove();
				$('#'+name.replace(/ /g,"_")+"_P").remove();
			}
           }
       })
}