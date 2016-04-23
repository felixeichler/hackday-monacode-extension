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
.component('monacode', {
  templateUrl: chrome.extension.getURL('templates/monacode.html'),
  controller: function() {
    var ctrl = this;
    
    //parse email from gmail DOM
    var x = document.querySelectorAll('span.gD');
    //last of array
    var email = x[x.length-1].getAttribute('email')
    
    //TODO: send request to backend here, to actually load real user data
    //      only thing we know so far is email
    
    ctrl.user = {
      name: "Felix Eichler",
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
