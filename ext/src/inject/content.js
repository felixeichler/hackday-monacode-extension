'use strict';

angular.module('monacode', [])
.config(function($sceDelegateProvider, $compileProvider) {

$compileProvider.imgSrcSanitizationWhitelist(/^\s*((https?|ftp|file|blob|chrome-extension):|data:image\/)/);

  $sceDelegateProvider.resourceUrlWhitelist([
    // Allow same origin resource loads.
    'self',
    // Allow loading from our assets domain.  Notice the difference between * and **.
    'chrome-extension://**'
  ]);

})
.factory('API', function($q, $http) {
  var APIService = {};


  var apiConfig = {
    serverurl: "https://monacode.servebeer.com/"
  }

  // ;)
  APIService['shinyness'] = 100;

  //load a profile from server
  //by email
  APIService.getProfile = function(email) {
    //return promise ($q) for asynchronous
    return $q(function(resolve, reject) {
      //build request url
      var requestUrl = apiConfig.serverurl + 'info/' + encodeURIComponent(email);
      console.log('GET '+requestUrl);

      //fire request
      $http.get(requestUrl).then(

        function successCallback(response) {
          console.log('request response',response);
          
          //resolve promise
          resolve(response.data.content);
        },

        function errorCallback(response) {
          console.log('request response',response);
          //reject promise
          console.error('error while loading profile',response);
          reject(response);
        });

    });

  }

  APIService.addToCRM = function(email) {
    //return promise ($q) for asynchronous
    return $q(function(resolve, reject) {
      //build request url
      var requestUrl = apiConfig.serverurl + 'addToCRM/' + encodeURIComponent(email);
      console.log('POST '+requestUrl);

      //fire request
      $http.post(requestUrl).then(

        function successCallback(response) {
          //resolve promise
          resolve(response.data.content);
        },

        function errorCallback(response) {
          //reject promise
          console.error('error while loading profile',response);
          reject(response);
        });
    });
  }

  return APIService;
})
.component('monacode', {
  templateUrl: chrome.extension.getURL('templates/monacode.html'),
  controller: function(API) {
    console.log('monacode API',API);

    var ctrl = this;

    //parse email from gmail DOM
    ctrl.x = document.querySelectorAll('span.gD');
    //last of array
    ctrl.email = ctrl.x[ctrl.x.length-1].getAttribute('email');
    //send request via service
    API.getProfile(ctrl.email).then(

      function successCallback(response) {
        if(response.name != null) {

        ctrl.user = response;
        ctrl.user.active_email = ctrl.email;
        if(ctrl.user.wants)
          ctrl.user.wants = ctrl.user.wants.split(",");

          if(ctrl.user.haves)
            ctrl.user.haves = ctrl.user.haves.split(",");
      }
      },

      function errorCallback(response) {
        console.error('using fake data because of rejected promise');
        ctrl.user = {
          name: "Felix ERROR",
          active_email: ctrl.email,
          imageurl: "https://www.xing.com/image/9_d_7_75e92aaae_22366807_2/felix-eichler-foto.256x256.jpg",
          networks: [{
            name: "Xing",
            color: "xing",
            counter: "!"
          },{
            name: "@felix",
            color: "twitter",
            counter: "4"
          },{
            name: "Google+",
            color: "gplus",
            counter: "6"
          }]
        }
      });
  }
})
.component('monacodeUser', {
  templateUrl: chrome.extension.getURL('templates/monacode-user.html'),
  controller: function(API) {
    var ctrl = this;

    ctrl.mail_username = ctrl.user.active_email.split("@")[0];
    ctrl.mail_domain = ctrl.user.active_email.split("@")[1];

    ctrl.addToCRM = function() {
      API.addToCRM(ctrl.user.active_email).then(function(){

        console.log("sucessfull");
        ctrl.user.inCRM = true;
      }
      )
    }
  },
  bindings: {
    user: '<'
  }
})
.component('monacodeNetworks', {
  templateUrl: chrome.extension.getURL('templates/monacode-networks.html'),
  controller: function() {
    var ctrl = this;
  },
  bindings: {
    networks: '<'
  }
})
.component('monacodeNetwork', {
  templateUrl: chrome.extension.getURL('templates/monacode-network.html'),
  controller: function() {
    var ctrl = this;
  },
  bindings: {
    network: '<'
  }
})
.component('monacodeNotes', {
  templateUrl: chrome.extension.getURL('templates/monacode-notes.html'),
  controller: function() {
    var ctrl = this;

    ctrl.saved = false;
    ctrl.oldNotes = ctrl.notes;

    ctrl.save = function() {
      console.log(ctrl.notes + " // " + ctrl.oldNotes);
      if(ctrl.notes != ctrl.oldNotes){
        ctrl.oldNotes = ctrl.notes;
        ctrl.saved = true;
        window.setTimeout(function () {
          ctrl.saved = false;
        }, 1500);
      }
    }
  },
  bindings: {
    notes: '<'
  }
})
.component('monacodeKununu', {
  templateUrl: chrome.extension.getURL('templates/monacode-kununu.html'),
  controller: function() {
    var ctrl = this;
    ctrl.kununuLogoUrl = chrome.extension.getURL('icons/kununu-logo-black.png')
  },
  bindings: {
    company: '<'
  }
})
.component('monacodeLocation', {
  templateUrl: chrome.extension.getURL('templates/monacode-location.html'),
  controller: function() {
    var ctrl = this;
  },
  bindings: {
    location: '<'
  }
})
.component('monacodeConnections', {
  templateUrl: chrome.extension.getURL('templates/monacode-connections.html'),
  controller: function() {
    var ctrl = this;
  },
  bindings: {
    connections: '<'
  }
})
.component('monacodeSkills', {
  templateUrl: chrome.extension.getURL('templates/monacode-skills.html'),
  controller: function() {
    var ctrl = this;
  },
  bindings: {
    skills: '<'
  }
})
.component('monacodeWants', {
  templateUrl: chrome.extension.getURL('templates/monacode-wants.html'),
  controller: function() {
    var ctrl = this;
  },
  bindings: {
    wants: '<'
  }
})
.component('monacodeHaves', {
  templateUrl: chrome.extension.getURL('templates/monacode-haves.html'),
  controller: function() {
    var ctrl = this;
  },
  bindings: {
    haves: '<'
  }
})
.component('monacodeLanguages', {
  templateUrl: chrome.extension.getURL('templates/monacode-languages.html'),
  controller: function() {
    var ctrl = this;
  },
  bindings: {
    languages: '<'
  }
})
.component('monacodeLanguage', {
  templateUrl: chrome.extension.getURL('templates/monacode-language.html'),
  controller: function() {
    var ctrl = this;
  },
  bindings: {
    language: '<'
  }
})
.component('monacodeLogin', {
  templateUrl: chrome.extension.getURL('templates/monacode-login.html'),
  controller: function() {
    var ctrl = this;
  },
  bindings: {
    language: '<'
  }
});
