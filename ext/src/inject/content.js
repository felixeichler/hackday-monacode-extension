'use strict';



angular.module('monacode', [])
.config(function($sceDelegateProvider) {
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
    var x = document.querySelectorAll('span.gD');
    //last of array
    var email = x[x.length-1].getAttribute('email')
    
    //send request via service
    API.getProfile(email).then(
      
      function successCallback(response) {
        console.log('loaded profile',response);
        ctrl.user = response;
      },
      
      function errorCallback(response) {
        console.error('using fake data because of rejected promise');
        ctrl.user = {
          name: "Felix ERROR",
          email: email,
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
  controller: function() {
    var ctrl = this;
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
.component('monacodeConnections', {
  templateUrl: chrome.extension.getURL('templates/monacode-connections.html'),
  controller: function() {
    var ctrl = this;
  },
  bindings: {
    connections: '<'
  }
});
