$(document).ready(function() {
	 showOptions();
});

function addBar() {
	var hostUrl = location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '');
	if ($('#barVal').val() > $('#barMax').val()) {
		$('#barVal').val($('#barMax').val());
	}
    $.ajax({
       url : hostUrl +"/addBar",
       async: true,
	   data: JSON.stringify({  
		name : $('#barName').val(),
		value : $('#barVal').val(),
		maxval : $('#barMax').val(),
		colour : $('#barColour').val(),
		enabled : true,
		completed:[]
	   }),
       type: 'POST',
	   contentType: 'application/json',
       dataType : "json"
       })
	   
		var barDiv ="<div id=\""+$('#barName').val().replace(/ /g,"_")+"_OPT"+"\" class=\"checkbox-table\">"+"<h2>"+$('#barName').val()+"</h2><br>";
		barDiv += "<div class=\"buttons\"><input class=\"green\" type=\"button\" value=\"Update\" onclick=\"updateBar(\'"+$('#barName').val()+"\',"+$('#barMax').val()+")\">";
		barDiv += "<input class=\"red\" type=\"button\" value=\"Remove\" onclick=\"removeSettingsBar(\'"+$('#barName').val()+"\')\"></div><div class=\"clear\"/><br/>";
		barDiv += "<ul class=\"checkbox-grid\" id=\""+$('#barName').val().replace(/ /g,"_")+"_GRID\">";
		var i = 1;
		while (i<=parseInt($('#barMax').val(),10)) {
			barDiv += "<li><label class=\"container\">#"+i+"<input type=\"checkbox\" id=\""+$('#barName').val().replace(/ /g,"_")+"_CHK"+i+"\" value=\""+i+"\" "
				+" /> <span class=\"checkmark\"></span></label></li>";
				i+=1;
		}
		barDiv +="</ul></br></div><div class=\"clear\"></div>";
		$('#achievements').append(barDiv);
}

function removeBar() {
	removeSettingsBar($('#barName').val());
}

function removeSettingsBar(barName) {
	var hostUrl = location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '');
    $.ajax({
       url : hostUrl +"/removeBar",
       async: true,
	   contentType: 'application/json',
	   	   data: JSON.stringify({  
				name : barName,
	   }),
       type: 'POST',
       dataType : "json",
       success : function(data) {
           }
       })
	   $('#'+barName.replace(/ /g,"_")+"_OPT").remove();
}

function editBar() {
	if ($('#barVal').val() > $('#barMax').val()) {
		$('#barVal').val($('#barMax').val());
	}
	var hostUrl = location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '');
    $.ajax({
       url : hostUrl +"/editBar",
       async: true,
	   	   data: JSON.stringify({  
		name : $('#barName').val(),
		value : $('#barVal').val(),
		maxval : $('#barMax').val(),
		colour : $('#barColour').val(),
		enabled : $('#enabled-'+$('#barName').val().replace(/ /g,"_")).val()
	   }),
	   contentType: 'application/json',
       type: 'POST',
       dataType : "json",
       success : function(data) {
           }
       });
}

function updateBar(barName, numBoxes)
{	
	var chkIdTemplate = barName.replace(/ /g, "_")+"_CHK";
	var checked = [];
	var val= 0;
	for (i=1; i<=numBoxes; i++)
	{
		if ($('#'+chkIdTemplate+i).is(":checked"))
		{
			val += 1;
			checked.push(i);
		}
	}
	
	var hostUrl = location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '');
    $.ajax({
       url : hostUrl +"/editBar",
       async: true,
	   	   data: JSON.stringify({  
		name : barName,
		value : val,
		completed : checked
		}),
	   contentType: 'application/json',
       type: 'POST',
       dataType : "json",
       success : function(data) {

           }
       });	
}

function showOptions() {
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
				// add in a UPDATE (update selected values and the value var with it), ENABLE/DISABLE (show it or not), DELETE (remove entirely)
				var barDiv ="<div id=\""+obj.name.replace(/ /g,"_")+"_OPT"+"\" class=\"checkbox-table\">"+"<h2>"+obj.name+"</h2><br>";
				barDiv += "<div class=\"buttons\" ><input class=\"green\" type=\"button\" value=\"Update\" onclick=\"updateBar(\'"+obj.name+"\',"+obj.maxval+")\">";
				barDiv += "<input class=\"red\" type=\"button\" value=\"Remove\" onclick=\"removeSettingsBar(\'"+obj.name+"\')\"></div><div class=\"clear\"/><br/>";
				barDiv += "<ul class=\"checkbox-grid\" id=\""+obj.name.replace(/ /g,"_")+"_GRID\">";
				var i = 1;
				while (i<=parseInt(obj.maxval,10)) {
					barDiv += "<li><label class=\"container\">#"+i+"<input type=\"checkbox\" id=\""+obj.name.replace(/ /g,"_")+"_CHK"+i+"\" value=\""+i+"\" "
						+(obj.completed.includes(i) ? "checked" : "")+" /> <span class=\"checkmark\"></span></label></li>";
						i+=1;
				}
				barDiv +="</ul></br></div><div class=\"clear\"></div>";
				progBars += barDiv;
			}
			$('#achievements').html(progBars);
           }
       })
}
