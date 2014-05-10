//ajax.js
//
// Team, The  08/05/14             //
// for Landmine Incident Reporter  //

// Asynchronous Content Access : ajax
// A script to load page content asynchronously (i.e. w/o refresh).



/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * *                       Private Environment                       * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
!function() {

  //NOTE:
  // #AJAX-swap-parent should contain exactly one immediate child div.
  
  
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
   * * *                 Initialize Private Environment                  * * *
   * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
  var $ = jQuery.noConflict();
  
  
  //Private Variables:
  var $pages = { 'home'    : {'title':undefined,'content':undefined},
                 'about'   : {'title':undefined,'content':undefined},
                 'contact' : {'title':undefined,'content':undefined},
                 'signup'  : {'title':undefined,'content':undefined},
                 'report'  : {'title':undefined,'content':undefined}
                };
  
  
  //Function Definitions:
  
  //utility functions
  function supportsLocalStorageHTML5() {
    try {
      return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
      return false;
    }
  }
  
  function supportsMouseover() {
    try {
      document.createEvent("TouchEvent");  //supports mouseover if and only if does not support touch
      return false;
    } catch (e) {
      return true;
    }
  }
  
  function storePageInLocalStorageHTML5( pageName, activeID ) {
    if (supportsLocalStorageHTML5()) {
      localStorage.setItem('lastViewedPage', pageName);
      localStorage.setItem('lastActiveElem', activeID);
      localStorage.setItem('lastViewedTime', new Date().toISOString());
    }
  }
  
  
  //function generators...
  function make_swap_active_content_callback( pageName, activeID ) {
    return function(eventObject) {
      
      //verify content...
      if ($pages[pageName].content === undefined)
        !make_load_content_callback(pageName,undefined,false)();
      
      //only swap if load (asynchronous or synchronous) was successful...
      if ($pages[pageName].content !== undefined) {
      
        //reset title...
        if ($pages[pageName].title !== undefined)
          $(document).attr('title', $pages[pageName].title);
      
        //reset page indicator...
        var oldActive = $(".active");
        if (oldActive)
          oldActive.removeClass("active");
        if (activeID)
          $(activeID).addClass("active");
      
        //reset content...
        $("#AJAX-swap-parent>div").detach();
        $("#AJAX-swap-parent").prepend($pages[pageName].content);
        
        //persistant storage to remember what page the user was last on...
        storePageInLocalStorageHTML5(pageName, activeID);
      
      } else {
        console.log("AJAX Error:  Could not load HTML content for page: '"+pageName+".html'!");
      }
      
    };  //end return function() {}
  }
  
  function make_load_content_callback( pageName, linkedCallback, asynchronous ) {
    asynchronous = (asynchronous ? true : false);
    return function() {
      $.ajax({
        url: (pageName+'.html'),
        dataType: "html",
        async: asynchronous,
        cache: true,
        success:
          function(data, stat, resp) {
            if (data) {
              //parse data...
              data = $.parseHTML(data);
              //get title...
              $pages[pageName].title = $(data).filter('title')[0].text;
              //get content...
              $pages[pageName].content = $(data).filter('#AJAX-swap-content');
            }  
            if (linkedCallback)
              linkedCallback();
          }
      });  //end $.ajax({})
    };  //end return function() {}
  }
    
  
  //setup once the DOM is ready...
  $(document).ready(function() {
    
    //save initial state...
    $pages['home'].title   = $(document).attr('title');
    $pages['home'].content = $("#AJAX-swap-parent>div");
    
    //load last page if they return within a specified time...
    if ( supportsLocalStorageHTML5() ) {
      var page = localStorage.getItem('lastViewedPage');
      var time = localStorage.getItem('lastViewedTime');
      var elem = localStorage.getItem('lastActiveElem');
      elem = ( elem==='undefined' ? undefined : elem );
      
      if ( page !== null && time !== null ) {
        if (Date.now() - Date.parse(time) <= 1200000)  //20 min
          (make_swap_active_content_callback(page,elem))();
      } else {
        storePageInLocalStorageHTML5('home');
      }
    }
    
    //asynchronous pre-load...
    var load_contact = make_load_content_callback('contact', undefined);
    var load_about   = make_load_content_callback('about',   load_contact);
    var load_signup  = make_load_content_callback('signup',  load_about);
    var load_report  = make_load_content_callback('report',  load_signup);
    
    // TODO:  Only preload if not mobile
    load_report();
    
    //install click handlers....
    $("#RegisterBtn").click(function(eventObject) {   //is touch friendly?
      $("#AJAX-swap-parent>div").detach();
      $("#AJAX-swap-parent").prepend($pages['signup'].content);
    });
    
    $("#LoginBtn").click(function(eventObject) {   //is touch friendly?
      // TODO:  Authenticate
      
      $("#AJAX-swap-parent>div").detach();
      $("#AJAX-swap-parent").prepend($pages['report'].content);
    });
    
    
    $("#HomeBtn"    ).click( make_swap_active_content_callback('home')   );  //is touch friendly?
    $("#LoginBtn"   ).click( make_swap_active_content_callback('report') );  //is touch friendly?
    $("#RegisterBtn").click( make_swap_active_content_callback('signup') );  //is touch friendly?
    $("#AboutBtn"   ).click( make_swap_active_content_callback('about',  '#AboutBtn')   );  //is touch friendly?
    $("#ContactBtn" ).click( make_swap_active_content_callback('contact','#ContactBtn') );  //is touch friendly?
    
  });  //end $(document).ready()
  
  
}();  //end Private Environment


//EOF
