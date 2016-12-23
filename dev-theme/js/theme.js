//
//use getViewPortSize() to get the viewport size
//-----------------------------------------

function getViewPortSize(){
	var viewPortSize = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	return viewPortSize;
	//console.log(viewPortSize);
}




// //
// //Menu hover dropdown for Desktop
// //----------------------------------------

function navHover() {
	$('ul.nav li.dropdown').hover(function() {
	// $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn();
	$(this).addClass("open");
	}, function() {
	// $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut();
	 $(this).removeClass("open");
	// });
	});
}



function navClick() {
	$('ul.dropdown-menu [data-toggle=dropdown]').on('click', function(event) {
    // Avoid following the href location when clicking
    event.preventDefault(); 
    // Avoid having the menu to close when clicking
    event.stopPropagation(); 
    // Re-add .open to parent sub-menu item
    $(this).parent().addClass('open');
    $(this).parent().find("ul").parent().find("li.dropdown").addClass('open');
	});
}



//
//DOCUMENT READY
//-----------------------------------------

$(document).ready(function () {
  
    var ws = getViewPortSize(),
	isTouch = Modernizr.touch;
    if ((ws <= 768) || (isTouch)) {
        //console.log("small device");
        navClick(); //Click dropdown nav menu.
    }
    else {
        //console.log("desktop");
        navHover(); //Hover dropdown nav menu.
    }

});

//
//DOCUMENT RESSIZE & ORIENTATION  CHANGE
//------------------------------------------

$(window).on('resize orientationchange', function() {
	//console.log("document ready");
	var ws = getViewPortSize(),
	isTouch = Modernizr.touch;
	if((ws<=768)|| (isTouch)){
		//console.log("small device");
		navClick(); //Click dropdown nav menu.
	}
	else {
		//console.log("desktop");
		navHover(); //Hover dropdown nav menu.
	}
});


//
//WINDOW LOAD
//------------------------------------------

$(window).on('load', function() {
	//console.log("window load");
});
