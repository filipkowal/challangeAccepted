localStorage['serviceURL'] = "http://coenraets.org/apps/directory/services/";
var serviceURL = localStorage['serviceURL'];

//var scroll = new iScroll('wrapper', { vScrollbar: false, hScrollbar:false, hScroll: false });

var employees;

$(window).load(function() {
	setTimeout(getEmployeeList, 100);
});

function getEmployeeList() {

	$('#busy').show();
	
	//Tu tak jak wyzej trzeba ogarnac odczyt/zapis z pamieci. Tylko nie przez php tylko inaczej. JSON moze byc, ale nie musi.
			$('#list').append('<li><a href="employeedetails.html?id=' + '' + '">' +
					'<img src="pics/' + 'picture' + '" class="list-icon"/>' +
					'<p class="line1">' + 'Kuba' + ' ' + 'W' + '</p>' +
					'<p class="line2">' + 'Mister' + '</p>' +
					'<span class="bubble">' + 'lolo' + '</span></a></li>');
	
}