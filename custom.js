(function(){
"use strict";
'use strict';

var app = angular.module('viewCustom', ['angularLoad', 'reportProblem']);

  /****************************************************************************************************/

  /*In case of CENTRAL_PACKAGE - comment out the below line to replace the other module definition*/

  /*var app = angular.module('centralCustom', ['angularLoad']);*/

  /****************************************************************************************************/

  angular.module('reportProblem', []);

angular.module('reportProblem').component('urReportProblem', {
  bindings: {
    messageText: '@',
    buttonText: '@',
    reportUrl: '@'
  },
  template: '\n    <div ng-if="$ctrl.show" class="bar filter-bar layout-align-center-center layout-row bold" layout="row" layout-align="center center" style="color: #000;">\n      <span class="margin-right-small">{{$ctrl.messageText}}</span>\n      <a ng-href="{{$ctrl.targetUrl}}" target="_blank">\n        <button class="button-with-icon zero-margin md-button md-button-raised md-primoExplore-theme" type="button" aria-label="Report a Problem" style="color: #2B4F69; border: 1px outset;\n        background: rgba(255, 255, 255, .75); font-weight: bold;">\n          <prm-icon icon-type="svg" svg-icon-set="action" icon-definition="ic_report_problem_24px"></prm-icon>\n          <span style="text-transform: none;">{{$ctrl.buttonText}}</span>\n        </button>\n      </a>\n    </div>\n  ',
  controller: ['$location', '$httpParamSerializer', function ($location, $httpParamSerializer) {
    this.messageText = this.messageText || 'See something that doesn\'t look right?';
    this.buttonText = this.buttonText || 'Report a Problem';
    this.showLocations = ['/fulldisplay', '/openurl'];
    this.$onInit = function () {
      this.targetUrl = this.reportUrl + "fullpath= '" + $location.absUrl() + "'&" + $httpParamSerializer($location.search());
      this.show = this.showLocations.includes($location.path());
    };
  }]
});

app.component('prmActionListAfter', { template: '<ur-report-problem report-url="https://uregina.libwizard.com/id/487bb51497d5903fee7d12cd5e6f760b?rft.title=" message-text="Having trouble with online access or finding a print copy?" button-text="Report a problem" />' });

/* ----------------------------------------------------------------------------------------- */

//START - Google Analytics

var googleAnalyticsUrl = document.createElement('script');
googleAnalyticsUrl.src = "https://www.googletagmanager.com/gtag/js?id=G-8SF46B4XNT";
googleAnalyticsUrl.type = 'text/javascript';
googleAnalyticsUrl.async = true;
document.head.appendChild(googleAnalyticsUrl);

var googleAnalyticsCode = document.createElement('script');
googleAnalyticsCode.innerHTML = `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-8SF46B4XNT');`;
document.head.appendChild(googleAnalyticsCode);

//END - Google Analytics

    // Begin GOOGLE ANALYTICS - UA to be deprecated

 (function (i, s, o, g, r, a, m) {
        i['GoogleAnalyticsObject'] = r;i[r] = i[r] || function () {
            (i[r].q = i[r].q || []).push(arguments);
        }, i[r].l = 1 * new Date();a = s.createElement(o), m = s.getElementsByTagName(o)[0];a.async = 1;a.src = g;m.parentNode.insertBefore(a, m);
    })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
    ga('create', 'UA-139861067-1', 'auto'); 
    ga('send', 'pageview');

 // End GOOGLE ANALYTICS 

  /** Altmetrics **/
app.controller('FullViewAfterController', ['angularLoad', '$http', '$scope', '$element', '$timeout', '$window', function (angularLoad, $http, $scope, $element, $timeout, $window) {
    var vm = this;
    this.$http = $http;
    this.$element = $element;
    this.$scope = $scope;
    this.$window = $window;
    vm.$onInit = function () //wait for all the bindings to be initialised
    {
        vm.parentElement = this.$element.parent()[0]; //the prm-full-view container
        try {
            vm.doi = vm.parentCtrl.item.pnx.addata.doi[0] || '';
        } catch (e) {
            return;
        }
        if (vm.doi) {
            //If we've got a doi to work with check whether altmetrics has data for it.
            //If so, make our div visible and create a new Altmetrics service
            $timeout(function () {
            $http.get('https://api.altmetric.com/v1/doi/' + vm.doi).then(function () {
                try {
                    //Get the altmetrics widget
                    angularLoad.loadScript('https://d1bxh8uas1mnw7.cloudfront.net/assets/embed.js?' + Date.now()).then(function () {});
                    //Create our new Primo service
                    var altmetricsSection = {
                        scrollId: "altmetrics",
                        serviceName: "altmetrics",
                        title: "brief.results.tabs.Altmetrics"
                    };
                    vm.parentCtrl.services.splice(vm.parentCtrl.services.length, 0, altmetricsSection);
                } catch (e) {
                    console.log(e);
                }
            }).catch(function (e) {
                return;
            });
            }, 3000);
        }


        //move the altmetrics widget into the new Altmetrics service section
        var unbindWatcher = this.$scope.$watch(function () {
            return vm.parentElement.querySelector('h4[translate="brief.results.tabs.Altmetrics"]');
        }, function (newVal, oldVal) {
            if (newVal) {
                //Get the section body associated with the value we're watching
                let altContainer = newVal.parentElement.parentElement.parentElement.parentElement.children[1];
                let almt1 = vm.parentElement.children[1].children[0];
                if (altContainer && altContainer.appendChild && altm1) {
                    altContainer.appendChild(altm1);
                }
                unbindWatcher();
            }
        });
    }; // end of $onInit


    //You'd also need to look at removing the various css/js scripts loaded by this.
    //refer to: https://github.com/Det-Kongelige-Bibliotek/primo-explore-rex
      vm.$onDestroy = function ()
  {
        if (this.$window._altmetric) {
            delete this.$window._altmetric;
        }

        if (this.$window._altmetric_embed_init) {
            delete this.$window._altmetric_embed_init;
        }

        if (this.$window.AltmetricTemplates) {
            delete this.$window.AltmetricTemplates;
        }
  }

}]);
app.component('prmFullViewAfter', {
    bindings: { parentCtrl: '<' },
    controller: 'FullViewAfterController',
     template: '<div id="altm1" ng-if="$ctrl.doi" class="altmetric-embed" data-hide-no-mentions="true"  data-link-target="new" data-badge-type="medium-donut" data-badge-details="right" data-doi="{{$ctrl.doi}}"></div>'
    });
/** Altmetrics **/

  /************************************* BEGIN libchat widget *************************************/

// Adds the chat button

(function() {

var lc = document.createElement('script'); lc.type = 'text/javascript'; lc.async = 'true';

lc.src = ('https:' == document.location.protocol ? 'https://' : 'http://') +

'uregina.libanswers.com/load_chat.php?hash=abf016a3eb170ff461f0f508f54ddafb';

var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(lc, s);

})();


/************************************* END libchat widget *************************************/

// Begin BrowZine - Primo Integration...
  window.browzine = {
    api: "https://public-api.thirdiron.com/public/v1/libraries/172",
    apiKey: "66db3295-b03a-4a98-ae87-3473b6d85542",

    journalCoverImagesEnabled: true,

    journalBrowZineWebLinkTextEnabled: true,
    journalBrowZineWebLinkText: "View Most Recent Issue",

    acticleBrowZineWebLinkTextEnabled: true,
    articleBrowZineWebLinkText: "View Other Articles In This Issue",

    articlePDFDownloadLinkEnabled: true,
    articlePDFDownloadLinkText: "Download PDF",

    printRecordsIntegrationEnabled: true,
  };

  browzine.script = document.createElement("script");
  browzine.script.src = "https://s3.amazonaws.com/browzine-adapters/primo/browzine-primo-adapter.js";
  document.head.appendChild(browzine.script);

  app.controller('prmSearchResultAvailabilityLineAfterController', function($scope) {
    window.browzine.primo.searchResult($scope);
  });

  app.component('prmSearchResultAvailabilityLineAfter', {
    bindings: { parentCtrl: '<' },
    controller: 'prmSearchResultAvailabilityLineAfterController'
  });
// ... End BrowZine - Primo Integration


  app.controller('prmLogoAfterController', [function() {
    var vm = this;
    vm.getIconLink = getIconLink;

    function getIconLink() {
      return vm.parentCtrl.iconLink;
    }
  }]);


  //update template to include new URL for institution
  app.component('prmLogoAfter', {
    bindings: {
      parentCtrl: '<'
    },
    controller: 'prmLogoAfterController',
    template: '<div class="product-logo product-logo-local" layout="row" layout-align="start center" layout-fill id="banner"><a href="https://library.uregina.ca/homepage"><img class="logo-image" alt="{{::(\'nui.header.LogoAlt\' | translate)}}" ng-src="{{$ctrl.getIconLink()}}"/></a></div>'
  });


  /* *******************************************************************
   *   LIBRARY ALERT MESSAGE FOR PRIMO FUNCTION
   */

  var libraryAlertMessage = function(alertMsg) {

    if (alertMsg !== "") {
      setTimeout(function() {
        var x = document.getElementsByClassName("topbar-wrapper");

        if ( x.length > 0) {

          var level = "red-critical-error";

          if ( typeof alertMsg.includes !== "undefined" ) { // .includes is not supported in older browsers

            if (alertMsg.includes("[blue]") ) { level = "blue-help-informational"; }
            else if (alertMsg.includes("[green]") ) { level = "green-success-normal"; }
            else if (alertMsg.includes("[yellow]") ) { level = "yellow-advisory-warning"; }
            // default is critical or error which is already set
          } else {
            console.log("INIT: Alert is default critical because browser does not support .includes()");
          }

          alertMsg = alertMsg.replace(/\[[a-z]*\]/ig, "");

          var div = document.createElement("DIV");
          div.className += 'library-alert-message ';
          div.className += level;
          var innerdiv = document.createElement("DIV");
          innerdiv.innerHTML = alertMsg;
          div.appendChild(innerdiv);
          x[0].appendChild(div);
        }
      }, 8000);
    } else {
      console.log("INIT: No current alerts");
    }
  };

// 856 links to display

app.value('linksToKeep', []).component('prmServiceLinksAfter', {
  bindings: {
    parentCtrl: '<'
  },
  controller: function controller($document, linksToKeep) {
    angular.element(function () {
      if (linksToKeep.length > 0) {
        var lNodes = $document[0].querySelectorAll("prm-service-links > div > div > div");
        for (var i = 0; i < lNodes.length; i++) {
          var eNode = lNodes[i];
          var span = eNode.querySelector("a > span");
          if (span != null) {
            if (!linksToKeep.includes(span.textContent.trim())) {
              eNode.style.display = "none";
            }
          }
        }
      }
    });
  }
});

app.value('linksToKeep', [
  "Request from another library",
  "Ask Us"
]);

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

    // Function to determine whether to show the accessible link
    this.ShowAccessibleLink = function() {
      var recordType = this.parentCtrl.item.pnx.display.type ? this.parentCtrl.item.pnx.display.type[0] : ''; // Get the record type
      var mainLocation = this.parentCtrl.item.delivery && this.parentCtrl.item.delivery.bestlocation ? this.parentCtrl.item.delivery.bestlocation.mainLocation : ''; // Get the main location
      return (recordType == 'book' || recordType == 'article') && mainLocation !== 'Bertrand Russell Archives' && mainLocation !== 'Archives and Research Collections'; // Determine if the link should be shown
    };

    // Function to open the accessibility request form on click
    this.showAccessibleCopyFormOnClick = function($event) {
      var formUrl = 'https://uregina.libwizard.com/f/accessibility_request?' +
        'resource_title-=' + encodeURIComponent(resource_title) + // Add the resource title to the form URL
        '&author-=' + encodeURIComponent(resource_author) + // Add the resource author to the form URL
        '&resource_link-=' + encodeURIComponent(current_page_url); // Add the current page URL to the form URL
      console.log("Generated Form URL: ", formUrl);  // Debugging 
      window.open(formUrl, '_blank'); // Open the form in a new tab
    };

    // Function to open the accessibility request form on Enter key press
    $scope.showAccessibleCopyFormOnEnter = function($event) {
      if ($event.key == "Enter") {
        var formUrl = 'https://uregina.libwizard.com/f/accessibility_request?' +
          'resource_title-=' + encodeURIComponent(resource_title) + // Add the resource title to the form URL
          '&author-=' + encodeURIComponent(resource_author) + // Add the resource author to the form URL
          '&resource_link-=' + encodeURIComponent(current_page_url); // Add the current page URL to the form URL
        console.log("Generated Form URL: ", formUrl);  // Debugging 
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

    pre-pend alert level color in front of text. HTML ok

    libraryAlertMessage(""); // no alert to display
    libraryAlertMessage("[blue]Your help/informational message goes here");
    libraryAlertMessage("[green]Your normal/success message goes here");
    libraryAlertMessage("[yellow]Your advisory/warning message goes here <a href='somepage.html'>More info</a>");
    libraryAlertMessage("[red]Your critical/error message goes here");

    Default is red/critical so pre-pending with [red] is not necessary.
  */

  libraryAlertMessage("[blue]The subject headings used in our catalogue contain historical language that may be considered offensive. We will be working with campus and the broader library community to address these issues.");

})();
