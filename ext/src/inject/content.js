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
    ctrl.user = {
      email: document.querySelector('span.gD').getAttribute('email'),
      name: "Felix Eichler ",
      imageurl: "https://www.xing.com/image/9_d_7_75e92aaae_22366807_2/felix-eichler-foto.256x256.jpg"
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
.component('monacodeNetwors', {
  templateUrl: chrome.extension.getURL('templates/monocode-networks.html'),
  controller: function() {
    var ctrl = this;
  },
  bindings: {
  }
});
