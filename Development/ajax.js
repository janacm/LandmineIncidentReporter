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
   
   
  /* * * * * * * * * * * * * * * * * * * * *
   Environment
   * * * * * * * * * * * * * * * * * * * * */
  var $ = jQuery.noConflict();
  
  
  /* * * * * * * * * * * * * * * * * * * * *
   Private Variables
   * * * * * * * * * * * * * * * * * * * * */
  var $pages = { 'home'              : {'title':undefined,'content':undefined},
                 'about-static'      : {'title':undefined,'content':undefined},
                 'contact-static'    : {'title':undefined,'content':undefined},
               //'signup'            : {'title':undefined,'content':undefined},
                 'report_volunteer'  : {'title':undefined,'content':undefined},
                 'report_medical'    : {'title':undefined,'content':undefined},
                 'report_military'   : {'title':undefined,'content':undefined}
                };
  
  
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
   * * *                      Function Definitions                       * * *
   * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
  
  
  /* * * * * * * * * * * * * * * * * * * * *
   Utility Functions
   * * * * * * * * * * * * * * * * * * * * */
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
//     if (supportsLocalStorageHTML5()) {
//       localStorage.setItem('lastViewedPage', pageName);
//       localStorage.setItem('lastActiveElem', activeID);
//       localStorage.setItem('lastViewedTime', new Date().toISOString());
//     }
  }
  
  
  /* * * * * * * * * * * * * * * * * * * * *
   Callback Function Generators
   * * * * * * * * * * * * * * * * * * * * */
  
  function make_loadContent_callback( pageName, linkedCallback, asynchronous ) {
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
  
  function make_swapActiveContent_callback( pageName, activeID ) {
    return function(eventObject) {
      
      //verify content...
      if ($pages[pageName].content === undefined)
        !make_loadContent_callback(pageName,undefined,false)();
      
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
        
//         //history & back button...
//         console.log("pushing: "+pageName);
//         history.pushState({page: pageName, activeElement: activeID},null,pageName+'.html');
        
//         //persistant storage to remember what page the user was last on...
//         storePageInLocalStorageHTML5(pageName, activeID);
      
      } else {
        console.log("AJAX Error:  Could not load HTML content for page: '"+pageName+".html'!");
      }
      
    };  //end return function() {}
  }
  
  
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
   * * *                     Install Event Handlers                      * * *
   * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
  
  
  /* * * * * * * * * * * * * * * * * * * * *
   Window Handlers
   * * * * * * * * * * * * * * * * * * * * */
//  window.addEventListener("popstate", function(event) {
//     if (event.state) {
//       console.log("poping: "+event.state.page);
//       (make_swapActiveContent_callback(event.state.page, event.state.activeElement))();
//     }
//   });
  
  
  /* * * * * * * * * * * * * * * * * * * * *
   DOM Handler  (once the DOM is ready)
   * * * * * * * * * * * * * * * * * * * * */
  $(document).ready(function() {
    
    // Save initial state...
    $pages['home'].title   = $(document).attr('title');
    $pages['home'].content = $("#AJAX-swap-parent>div");
    
    
//    /* * * * * * * * * * * * * * * * * * * * *
//     Load Last Page Visited
//      * * * * * * * * * * * * * * * * * * * * */
//     if ( supportsLocalStorageHTML5() ) {
//       // Verify local storage state...
//       var page = localStorage.getItem('lastViewedPage');
//       var time = localStorage.getItem('lastViewedTime');
//       var elem = localStorage.getItem('lastActiveElem');
//       elem = ( elem==='undefined' ? undefined : elem );
//       
//       // Load last page if they return within 20 minutes...
//       if ( page !== null && time !== null ) {
//         if (Date.now() - Date.parse(time) <= 1200000)  // i.e. elapsed time <= 20 min
//           (make_swapActiveContent_callback(page,elem))();
//       } else {
//        storePageInLocalStorageHTML5('home');
//       }
//     }
    
    
    /* * * * * * * * * * * * * * * * * * * * *
     Asynchronous Pre-Load
     * * * * * * * * * * * * * * * * * * * * */
    // Setup callback chain...
    var load_contact = make_loadContent_callback('contact-static',      undefined);
    var load_about   = make_loadContent_callback('about-static',        load_contact);
//  var load_signup  = make_loadContent_callback('signup',              load_about);
    var load_pubReport  = make_loadContent_callback('report_volunteer', load_about);
    var load_medReport  = make_loadContent_callback('report_medical',   load_pubReport);
    var load_milReport  = make_loadContent_callback('report_military',  load_medReport);
    
    
    // Initiate preloads...
    // TODO:  Only preload if not mobile
    load_milReport();
    
    
    /* * * * * * * * * * * * * * * * * * * * *
     Click Handlers
     * * * * * * * * * * * * * * * * * * * * */
    $("#HomeBtn"    ).click( make_swapActiveContent_callback('home')             );  //is touch friendly?
//  $("#LoginBtn"   ).click( make_swapActiveContent_callback('report_volunteer') );  //is touch friendly?  // TODO:  Authenticate
//  $("#RegisterBtn").click( make_swapActiveContent_callback('signup')           );  //is touch friendly?
    $("#AboutBtn"   ).click( make_swapActiveContent_callback('about-static',  '#AboutBtn')   );  //is touch friendly?
    $("#ContactBtn" ).click( make_swapActiveContent_callback('contact-static','#ContactBtn') );  //is touch friendly?
    
  });  //end $(document).ready()
  
  
}();  //end Private Environment


//EOF
