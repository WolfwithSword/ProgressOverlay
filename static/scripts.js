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
           	for (var x in data.ProgressBars) {
				obj = data.ProgressBars[x];
				if (obj.enabled) {
					var barDiv = "<p class=\"formP\" id=\""+obj.name.replace(/ /g,"_")+"_P"+"\" style=\"width:130px; float:middle;\">"+obj.name+"</p>"
					barDiv += "<div class=\"formBar\" id=\""+(obj.name.replace(/ /g,"_"))+"\" style=\"margin-left:12px; float:left; height: 104px;\"> </div>";
					progBars += barDiv;
				}
			}
			$('#page-wrap').html(progBars);
			for (var x in data.ProgressBars) {
				obj = data.ProgressBars[x];
				if (obj.enabled) {
					$('#'+obj.name.replace(/ /g,"_")).circularloader({  
						backgroundColor: "transparent",
						fontColor: "#cdcdcd",//"#000000",
						fontSize: "30px",//font size of progress text
						radius: 38,//radius of circle
						progressBarBackground: "#cdcdcd",//background colour of circular progress Bar
						progressBarColor: obj.colour,//colour of circular progress bar
						progressBarWidth: 14,//progress bar width
						progressPercent: Math.floor((obj.value/obj.maxval)*100),//progress percentage out of 100
						progressValue:obj.value,//diplay this value instead of percentage
						showText: true,//show progress text or not
						title: "",//show header title for the progress bar				
					});
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
					$('#'+obj.name.replace(/ /g,"_")).circularloader({  
						progressBarColor: obj.colour,
						progressPercent: Math.floor((obj.value/obj.maxval)*100),
						progressValue:obj.value,
					});
				}
				else 
				{
					if (obj.enabled) {
					var barDiv = "<p class=\"formP\" id=\""+obj.name.replace(/ /g,"_")+"_P"+"\" style=\"width:130px; float:middle;\">"+obj.name+"</p>"
					barDiv += "<div class=\"formBar\" id=\""+(obj.name.replace(/ /g,"_"))+"\" style=\"margin-left:12px; float:left; height: 104px;\"> </div>";
					$('#page-wrap').append(barDiv);
					$('#'+obj.name.replace(/ /g,"_")).circularloader({  
						backgroundColor: "transparent",
						fontColor: "#cdcdcd",//"#000000",
						fontSize: "30px",//font size of progress text
						radius: 38,//radius of circle
						progressBarBackground: "#cdcdcd",//background colour of circular progress Bar
						progressBarColor: obj.colour,//colour of circular progress bar
						progressBarWidth: 14,//progress bar width
						progressPercent: Math.floor((obj.value/obj.maxval)*100),//progress percentage out of 100
						progressValue:obj.value,//diplay this value instead of percentage
						showText: true,//show progress text or not
						title: "",//show header title for the progress bar				
					});
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