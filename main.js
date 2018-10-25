// listen for form submit
document.getElementById('myForm')
.addEventListener('submit', saveBookmark);

// save Bookmark
function saveBookmark(e){
	// Get form values
	var siteName = document.getElementById('siteName').value;
	var siteURL = document.getElementById('siteURL').value;


	if(!validateForm(siteName, siteURL)){
		return false;
	}


	var bookmark = {
		name: siteName,
		url: siteURL
	}
	// Local Storage Test
	// localStorage.setItem('test', 'Hello World');
	// console.log(localStorage.getItem('test'));
	// localStorage.removeItem('test');
	// console.log(localStorage.getItem('test'));



	// Test if bookmarks is null
	if(localStorage.getItem('bookmarks') === null){
		// Init array
		var bookmarks = [];
		// Add to array
		bookmarks.push(bookmark);
		// set to local storage         //JSON.stringify turns it to string
		localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
	}else{
		// get bookmarks from LocalStorage
					 //JSON.parse turn it back to JSON 
		var bookmarks= JSON.parse(localStorage.getItem('bookmarks'));
		// add bokkmark to array
		bookmarks.push(bookmark);
		// Re-set back to Local Storage
		localStorage.setItem('bookmarks',JSON.stringify(bookmarks));

	}

	// Clear form
	document.getElementById('myForm').reset();


	fetchBookmarks();

	// prevent form from submitting
	e.preventDefault();
}

// Fetch Bookmarks
function fetchBookmarks(){
	// get bookmarks from LocalStorage
	var bookmarks= JSON.parse(localStorage.getItem('bookmarks'));

	// get output id
	var bookmarksResaults = document.getElementById('bookmarksResaults');
	
	// build autput
	bookmarksResaults.innerHTML = '';
	for(var i = 0; i<bookmarks.length; i++){
		var name = bookmarks[i].name;
		var url = bookmarks[i].url;
		bookmarksResaults.innerHTML += '<div class="well">'+
										'<h3>'+name+
										' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a> ' +
										' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger"  href="#">Delete</a> ' +
										'</h3>'+
										'</div>';
	}
	}	


	// Delete bookmark

	function deleteBookmark(url){
		// get bookmarks from LocalStogage
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		// Loop throught bookmarks
		for(var i=0; i< bookmarks.length; i++){
			if(bookmarks[i].url === url){
				// remove from array
				bookmarks.splice(i, 1);
			}
		}
		// Re-set back to Local Storage
		localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
		// re-fetch bookmarks
		fetchBookmarks();
	}

	// 
	function validateForm(siteName, siteURL){
		if(!siteName || !siteURL){
		alert('Please fill in the form');
		return false;
	}

	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);

	if(!siteURL.match(regex)){
		alert('Please use a valide URL.');
		return false;
	}

	return true;
	}