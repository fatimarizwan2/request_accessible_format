//START - Google Analytics
//END - Google Analytics
// Begin GOOGLE ANALYTICS - UA to be deprecated
// End GOOGLE ANALYTICS 
/** Altmetrics **/
//move the altmetrics widget into the new Altmetrics service section
//You'd also need to look at removing the various css/js scripts loaded by this.
//refer to: https://github.com/Det-Kongelige-Bibliotek/primo-explore-rex 
/** Altmetrics **/
/************************************* BEGIN libchat widget *************************************/
// Adds the chat button
/************************************* END libchat widget *************************************/
// Begin BrowZine - Primo Integration...
// ... End BrowZine - Primo Integration
/* *******************************************************************
*   LIBRARY ALERT MESSAGE FOR PRIMO FUNCTION
*/
// 856 links to display


/* ---------- Begin: "Request an Accessible Format" link code based off of the University of Manitoba's code ----------*/

// Define the prmAuthenticationAfter component
app.component('prmAuthenticationAfter', {
  bindings: {parentCtrl: '<'},
  controller: 'prmAuthenticationAfterController'
});

// Controller for prmAuthenticationAfter component
app.controller('prmAuthenticationAfterController', function($scope, $rootScope) {
  this.$onInit = function() {
    var isLoggedIn = this.parentCtrl.isLoggedIn; // Check if the user is logged in
    $rootScope.isLoggedIn = isLoggedIn;
    if (isLoggedIn == true) {
      var selector = '.user-name'; // Selector for the user's name element
      var user_name = '';
      get_element(selector, function(callback) {
        user_name = callback; // Retrieve the user's name
        $rootScope.user_name = user_name;
      });
    }
  };
});

// Define the prmBriefResultAfter component to add the "Request an Accessible Format" link
app.component('prmBriefResultAfter', {
  bindings: { parentCtrl: '<' },
  controller: 'accessReqFormController',
  template: `<div>
               <a tabindex="0" ng-if="$ctrl.ShowAccessibleLink()" class="displayAccessibleLink accessible_copy">
                 <span tabindex="0" ng-click="$ctrl.showAccessibleCopyFormOnClick($event)" ng-keypress="$ctrl.showAccessibleCopyFormOnEnter($event)">
                  Request an Alternate Format <span class="sr-only"></span>&nbsp;
                   <prm-icon icon-type="svg" svg-icon-set="primo-ui" icon-definition="open-in-new"></prm-icon>
                 </span>
               </a>
             </div>`
});

// Controller for prmBriefResultAfter component
app.controller('accessReqFormController', function($scope, $rootScope) {
  this.$onInit = function() {
    var link = [];

    /****************************************
      Get the URL of the current page
    ****************************************/
    var current_page_url = window.location.href; // Get the current page URL

    /****************************************
      Get the "Resource Title"
    ****************************************/
    var resource_title = this.parentCtrl.item.pnx.display.title[0]; // Retrieve the resource title
   
    /****************************************
      Attach the URL to the Resource Title
    ****************************************/
    var resource_title = '<a href="' + current_page_url + '" target="_blank">' + resource_title + '</a>'; // Create a hyperlink for the resource title

    /****************************************
      Get the "Resource Author"
    ****************************************/
    var resource_author = '';
    if (this.parentCtrl.item.pnx.addata.addau !== undefined) {
      resource_author = this.parentCtrl.item.pnx.addata.addau[0]; // Retrieve the resource author from addau
    } else if (this.parentCtrl.item.pnx.addata.au !== undefined) {
      resource_author = this.parentCtrl.item.pnx.addata.au[0]; // Retrieve the resource author from au
    }

    /****************************************
      Get the "Resource Type"
    ****************************************/
    var resource_type = this.parentCtrl.item.pnx.display.type ? this.parentCtrl.item.pnx.display.type[0] : '';

    /****************************************
      Get the "Publisher"
    ****************************************/
    var publisher = this.parentCtrl.item.pnx.addata.pub ? this.parentCtrl.item.pnx.addata.pub[0] : '';

    /****************************************
      Get the "Publication Date"
    ****************************************/
    var publication_dat = '';
    if (this.parentCtrl.item.pnx.addata.date !== undefined) {
      publication_dat = this.parentCtrl.item.pnx.addata.date[0]; // Retrieve the publication date from date
    } else if (this.parentCtrl.item.pnx.display.creationdate !== undefined) {
      publication_dat = this.parentCtrl.item.pnx.display.creationdate[0]; // Retrieve the publication date from creationdate
    }

    /****************************************
      Get the "ISBN or ISSN"
    ****************************************/
    var isbn_or_issn = '';
    if (this.parentCtrl.item.pnx.addata.isbn !== undefined) {
      isbn_or_issn = this.parentCtrl.item.pnx.addata.isbn[0]; // Retrieve ISBN
    } else if (this.parentCtrl.item.pnx.addata.issn !== undefined) {
      isbn_or_issn = this.parentCtrl.item.pnx.addata.issn[0]; // Retrieve ISSN
    }

    // Function to determine whether to show the accessible link
    this.ShowAccessibleLink = function() {
      var recordType = this.parentCtrl.item.pnx.display.type ? this.parentCtrl.item.pnx.display.type[0] : ''; // Get the record type
      var mainLocation = this.parentCtrl.item.delivery && this.parentCtrl.item.delivery.bestlocation ? this.parentCtrl.item.delivery.bestlocation.mainLocation : ''; // Get the main location
     // edit this if you want the link to show for all resource types (vid, news, journals) 
      return (recordType == 'book' || recordType == 'article') && mainLocation !== 'Bertrand Russell Archives' && mainLocation !== 'Archives and Research Collections'; // Determine if the link should be shown
    };
    // 

    // Function to open the accessibility request form on click
    this.showAccessibleCopyFormOnClick = function($event) {
      var formUrl = 'https://uregina.libwizard.com/f/accessibility_request?' +
        'resource_title-=' + encodeURIComponent(resource_title) + // Add the resource title to the form URL
        '&author-=' + encodeURIComponent(resource_author) + // Add the resource author to the form URL
        '&resource_type-=' + encodeURIComponent(resource_type) + // Add the resource type to the form URL
        '&publisher-=' + encodeURIComponent(publisher) + // Add the publisher to the form URL
        '&publication_dat-=' + encodeURIComponent(publication_dat) + // Add the publication date to the form URL
        '&isbn_or_issn-=' + encodeURIComponent(isbn_or_issn) + // Add the ISBN or ISSN to the form URL
        '&volume-=' + encodeURIComponent(volume) + // Add the volume to the form URL
        '&resource_link-=' + encodeURIComponent(current_page_url); // Add the current page URL to the form URL
      console.log("Generated Form URL: ", formUrl);  // Debugging line
      window.open(formUrl, '_blank'); // Open the form in a new tab
    };

    // Function to open the accessibility request form on Enter key press
    $scope.showAccessibleCopyFormOnEnter = function($event) {
      if ($event.key == "Enter") {
        var formUrl = 'https://uregina.libwizard.com/f/accessibility_request?' +
          'resource_title-=' + encodeURIComponent(resource_title) + // Add the resource title to the form URL
          '&author-=' + encodeURIComponent(resource_author) + // Add the resource author to the form URL
          '&resource_type-=' + encodeURIComponent(resource_type) + // Add the resource type to the form URL
          '&publisher-=' + encodeURIComponent(publisher) + // Add the publisher to the form URL
          '&publication_dat-=' + encodeURIComponent(publication_dat) + // Add the publication date to the form URL
          '&isbn_or_issn-=' + encodeURIComponent(isbn_or_issn) + // Add the ISBN or ISSN to the form URL
          '&volume-=' + encodeURIComponent(volume) + // Add the volume to the form URL
          '&resource_link-=' + encodeURIComponent(current_page_url); // Add the current page URL to the form URL
        console.log("Generated Form URL: ", formUrl);  // Debugging line
        window.open(formUrl, '_blank'); // Open the form in a new tab
      }
    };
  };
});

/* ---------- End: "Request Accessibility Copy" link code for top record section ----------*/


/* *******************************************************************
*  SET LIBRARY ALERT MESSAGE FOR PRIMO
*
*  INSTRUCTIONS:
*/

  
