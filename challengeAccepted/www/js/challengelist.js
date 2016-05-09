
//var scroll = new iScroll('wrapper', { vScrollbar: false, hScrollbar:false, hScroll: false });
var employees;
var COUNTER_KEY = "COUNTER_KEY";
var CATEGORY_KEY = "CATEGORY_KEY";
var CHALLENGE_OBJECT_KEY = "challengeKey";

var bucketList;

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
	
	bucketList = new Array();
}

function loadBucketList() {
	$('#list').empty();
	$('#list').removeData("li");
	//$('#emptyList').hide();

	counter = localStorage.getItem(COUNTER_KEY);
	var itemList = new Array();
	for(i = 0; i < counter; i++){
		bucketList[i] = JSON.parse(localStorage.getItem(CHALLENGE_OBJECT_KEY + (i + 1)));
	}
	
	var listContent = new Array();
	var categories = ["Mountain", "Other", "City"];

	//categories...
	for (var j = 0; j < bucketList.length; j++) {
		for (var k = 0; k < categories.length; k++) {
			if(new String(categories[k]).valueOf() === new String(bucketList[j].bucketCategory).valueOf()){
				if(listContent[k] == null || listContent == undefined){
					listContent[k] = '<li data-role="list-divider">' +
					'<h2>' + categories[k] + '</h2>' +
					'</li>';
				}
				listContent[k] += '<li><a href="index.html#pageDetails?=" onclick="handleDetailPage(' + j + ')">' +
				//'<img src= ' + "img/Matterhorn.jpg" + '>' + 
				'<h2>' + bucketList[j].name + '</h2>' +
				'</a></li>';
			}
		}				
	}
	
	for (var k = 0; k < categories.length; k++) {
		if(listContent != null && listContent != undefined && listContent[k] != null && listContent[k] != undefined){
			$('#list').append(listContent[k]);
		}
	}
	if(bucketList.length > 0 ){
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
			bucketCategory:form.fcategory.value,
			done:false
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
}

function handleDetailPage(noItem){
	var content = "";
	var bucket = bucketList[noItem];
	if(bucket.img != null){
		content += '<img src= ' + "img/Matterhorn.jpg" + '>';
	} else {
		//to do default image
	}
	 
	
	content +=  '<h2>' + bucket.name + '</h2>';
	
	if(bucket.localization != null){
		content +=  '<label for="">Localization</label>';
		content +=  '<p>' + bucket.localization + '</p>';
	}	
	
	content += '<div data-role="fieldcontain"> <label for="flip-2">Done</label>'
	            '<select name="flip-2" id="flip-2" data-role="slider" onclick="markDone(' + noItem + ')">'
				'<option value="nope">Nope</option>'
				'<option value="yep">Yep</option>'
				'</select> '
			'</div>'
	
	$('#detailsDiv1').append(content);
}



function markDone(noItem){
	alert(noItem);
	
}







// Not used. Yet? Jakbysmy chcieli w przyszlosci dynamicznie kategorie dodatawac. Narazie sa 3===================================
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

//=============Nizej js odpowiedzialny za kamerke - odczyt z galerii===============================================
//=============Czemu w 1 pliku? Bo inaczje cholerstwo nie dzialalo ======================================
    var pictureSource;   // picture source
    var destinationType; // sets the format of returned value
	//$(window).load(function() {
	//});
    // Wait for device API libraries to load
    //
    document.addEventListener("deviceready",onDeviceReady,false);

    // device APIs are available
    //
    function onDeviceReady() {
        pictureSource=navigator.camera.PictureSourceType;
        destinationType=navigator.camera.DestinationType;
    }

    // Called when a photo is successfully retrieved
    //
    function onPhotoDataSuccess(imageData) {
      // Uncomment to view the base64-encoded image data
      // console.log(imageData);
	
      // Get image handle
      //
      var smallImage = document.getElementById('smallImage');

      // Unhide image elements
      //
      smallImage.style.display = 'block';

      // Show the captured photo
      // The inline CSS rules are used to resize the image
      //
      smallImage.src = "data:image/jpeg;base64," + imageData;
    }

    // Called when a photo is successfully retrieved
    //

    function onPhotoURISuccess(imageURI) {
      // Uncomment to view the image file URI
      // console.log(imageURI);
      // Get image handle
	  var path = document.getElementById('fpath');
	  path.value = imageURI;
      //
      var largeImage = document.getElementById('largeImage');

      // Unhide image elements
      //
      largeImage.style.display = 'block';

      // Show the captured photo
      // The inline CSS rules are used to resize the image
      //
	  
      largeImage.src = imageURI;
	  var path = document.getElementById('fpath');
	  
	  alert(largeImage.src);
	  localStorage.setItem("fPATH", largeImage.src);
    }

    // A button will call this function
    //
    function capturePhoto() {
      // Take picture using device camera and retrieve image as base64-encoded string
      navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
        destinationType: destinationType.DATA_URL });
    }

    // A button will call this function
    //
    function capturePhotoEdit() {
      // Take picture using device camera, allow edit, and retrieve image as base64-encoded string
      navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 20, allowEdit: true,
        destinationType: destinationType.DATA_URL });
    }

    // A button will call this function
    //
    function getPhoto(source) {
      // Retrieve image file location from specified source
		navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
        destinationType: destinationType.FILE_URI,
        sourceType: source });
    }

    // Called if something bad happens.
    //
    function onFail(message) {
      alert('Failed because: ' + message);
    }
	
	//================ koniec js od kamery ===================================
