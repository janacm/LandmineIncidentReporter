//sticky-header.js
//
// Team, The  13/05/14             //
// for Landmine Incident Reporter  //

// Sticky Shrinking Header : sticky-header
// A script to dynamically resize the header on scroll.


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * *                       Private Environment                       * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
!function() {
   
  /* * * * * * * * * * * * * * * * * * * * *
   Environment
   * * * * * * * * * * * * * * * * * * * * */
  var $ = jQuery.noConflict();
  
  
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
   * * *                      Function Definitions                       * * *
   * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
  
  
  /* * * * * * * * * * * * * * * * * * * * *
   Utility Functions
   * * * * * * * * * * * * * * * * * * * * */
  function checkStickyMenu( fuseHeight, headerHeight ) {
    if($(window).scrollTop() > headerHeight + logoSmallHeight && $(window).width() > 768) {

      if($("body").hasClass("sticky-menu-active"))
        return false;
      $("body").addClass("sticky-menu-active");
      logo
        .height(logoSmallHeight)
        .css("width", "auto");

    } else {

      $("body").removeClass("sticky-menu-active");
      logo
        .css("height", "auto")
        .css("width", "auto");

    }
  }  //end function checkStickyMenu() {}
  
  
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
   * * *                     Install Event Handlers                      * * *
   * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
  
  
  /* * * * * * * * * * * * * * * * * * * * *
   Window Handlers
   * * * * * * * * * * * * * * * * * * * * */
  $(window).on("scroll", function() { checkStickyMenu(); });

  $(window).on("resize", function() { checkStickyMenu(); });
  
  
  /* * * * * * * * * * * * * * * * * * * * *
   DOM Handler  (once the DOM is ready)
   * * * * * * * * * * * * * * * * * * * * */
  $(document).ready(function() {
    
  });  //end $(document).ready()
  
  
}();  //end Private Environment


//EOF






$(document).ready(function () {
 function stickymenu() {

		if($("body").hasClass("boxed"))
			return false;

		var headerHeight = $("body > header").height();
		var logo = $("header .logo img");
		var $this = this;
		var logoSmallHeight = 50;


		$this.checkStickyMenu();

		// Anchors Position
		$("a[data-hash]").on("click", function(e) {

			e.preventDefault();
			var target = $(this.hash);

			if(target.get(0))
				$("html,body").animate({scrollTop: target.offset().top - (150)}, 300);

			return false;

		});
		
	}
	
	stickymenu();
		
});
