
//var scroll = new iScroll('wrapper', { vScrollbar: false, hScrollbar:false, hScroll: false });
var employees;
var COUNTER_KEY = "COUNTER_KEY";
var CATEGORY_KEY = "CATEGORY_KEY";
var CHALLENGE_OBJECT_KEY = "challengeKey";

$(window).load(function() {
	//setTimeout(getEmployeeList, 100);
	init();
	//addCategory("Mountain")
	//addCategory("City")
	//addCategory("Other")
	//location.reload();
});

function init(){
	if(typeof(Storage) !== "undefined") {
		var counter = localStorage.getItem(COUNTER_KEY);
		if(counter == null){
			counter = 0;
			localStorage.setItem(COUNTER_KEY, 0);
		}
	} else {
		alert("Sorry! No Web Storage support... App cannot work properly");
	}
}

function loadBucketList() {
	$('#list').empty();
	$('#list').removeData("li");
	//$('#emptyList').hide();

	counter = localStorage.getItem(COUNTER_KEY);
	var itemList = new Array();
	for(i = 0; i < counter; i++){
		itemList[i] = JSON.parse(localStorage.getItem(CHALLENGE_OBJECT_KEY + (i + 1)));
	}
	
	var listContent = new Array();
	var categories = ["Mountain", "Other", "City"];

	//categories...
	for (var j = 0; j < itemList.length; j++) {
		for (var k = 0; k < categories.length; k++) {
			if(new String(categories[k]).valueOf() === new String(itemList[j].bucketCategory).valueOf()){
				if(listContent[k] == null || listContent == undefined){
					listContent[k] = '<li data-role="list-divider">' +
					'<h2>' + categories[k] + '</h2>' +
					'</li>';
				}
				listContent[k] += '<li><a href="index.html#pageDetails?id=' + '' + '">' +
				//'<img src= ' + "img/Matterhorn.jpg" + '>' + 
				'<h2>' + itemList[j].name + '</h2>' +
				'</a></li>';
			}
		}				
	}
	
	for (var k = 0; k < categories.length; k++) {
		if(listContent != null && listContent != undefined && listContent[k] != null && listContent[k] != undefined){
			$('#list').append(listContent[k]);
		}
	}
	if(itemList.length > 0 ){
		$('#list').listview('refresh');	
	} else {
		//$('#emptyList').show();
	}
}

function processAddForm(form) {
	if(validateForm() == true){
		var item = {
			name:form.fname.value,
			localization:form.flocation.value,
			img:form.fpath.value,
			bucketCategory:form.fcategory.value
			//longitude:form.flongitude.value,
			//lattitude:form.flattitude.value,
			
			//description:form.fdescription.value
		};

		store(item);
	}

    return false;
}

function validateForm() {
    var x = document.forms["addForm"]["fname"].value;
    if (x == null || x == "") {
        alert("Name must be filled out");
        return false;
    }
	
	return true;
}

function store(object) {
	if(typeof(Storage) !== "undefined") {
		counter = localStorage.getItem(COUNTER_KEY);
		stringified = JSON.stringify(object);
		
		localStorage.setItem(CHALLENGE_OBJECT_KEY + String(++counter), stringified);
		localStorage.setItem(COUNTER_KEY, counter);

		alert("Successfully stored new Bucket Challenge");
		return true;
	
	} else {
		alert("Sorry! No Web Storage support..");
	}
	return false;
}

function clearLocalStorage() {
	localStorage.clear();
	init();
	alert("Successfully cleared the list");
}

function handleImage(source){
	if(source === "SAVEDPHOTOALBUM"){
		getPhoto(pictureSource.PHOTOLIBRARY);
	} else if (source === "CAMERA"){
		capturePhoto();
	}
	$.mobile.navigate('#pageAdd');
	//$.mobile.navigate('#pageAdd');
	
	var largeImage = document.getElementById('largeImage');	
	var path = document.getElementById('fpath');
	path.value = largeImage.src;
}
















// Not used. Yet?  ============================================
function getCategories(){
	jsonCategories = localStorage.getItem(CATEGORY_KEY);
	if(jsonCategories == null){
		return null;
	}
	
	return JSON.parse(jsonCategories);
}

function addCategory(category){
	categories = getCategories();

	var arrayLength = categories.length;
	for (var i = 0; i < arrayLength; i++) {
		if(categories[i] === category){
			alert(category + " is already defined.");
			return false;
		}
	}
	categories[arrayLength] = category;
	storeCategory(categories);
	return true;
}

function storeCategory(categories){
	jsonCategories = localStorage.setItem(CATEGORY_KEY, JSON.stringify(categories));
}