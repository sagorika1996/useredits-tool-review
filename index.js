$(document).ready(function() {
	$('#myForm').on('submit', function(e) {
		e.preventDefault();
		$("#output").empty();
		var searchTerm = $("#searchTerm").val();
		var url = 
		"https://en.wikipedia.org/w/api.php?action=query&format=json&list=usercontribs&ucuser=" 
		+ searchTerm + "&ucdir=older&uclimit=5&callback=?"; 
		$.ajax({
			url: url,
			type: 'GET',
			contentType: "application/json; charset=utf-8",
			async: false,
			dataType: "jsonp",
			headers: { 'Api-User-Agent': 'useredits-tool/1.0' },
			success: function(data, status, jqXHR) {
				if(data.error != null) {
					alert(data.error.info);
				}
				else {
					arr = data.query.usercontribs;
					var str = "";
					for(var i=0;i<arr.length;i++) {
						str +=
						"<div class='panel panel-default col-xs-4' > <div class='panel-body'>Title: " 
						+ arr[i].title + " (<a href='https://en.wikipedia.org/w/index.php?" + 
						arr[i].title.replace(/ /g,"_") + "&oldid=" + arr[i].revid + "&diff=prev'>diff</a>)"
						 + "<br>Timestamp: " + arr[i].timestamp + "<br>Comment: " + arr[i].comment + "</div></div>";
						}
					if(arr.length == 0) {
						str = "<div class='panel panel-default col-xs-4' > <div class='panel-body'> No edits </div></div>";
					}
					$("#output").append(str);
				}
			},
			
			error: function(jqXHR, exception) {
				if (jqXHR.status === 0) {
					alert('Not connect.\n Verify Network.');
				} else if (jqXHR.status == 404) {
					alert('Requested page not found. [404]');
				} else if (jqXHR.status == 500) {
					alert('Internal Server Error [500].');
				} else if (exception === 'parsererror') {
					alert('Requested JSON parse failed.');
				} else if (exception === 'timeout') {
					alert('Time out error.');
				} else if (exception === 'abort') {
					alert('Ajax request aborted.');
				} else {
					alert('Uncaught Error.\n' + jqXHR.responseText);
				}
			}
		})
	});
});
