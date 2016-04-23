'use strict';

angular.module('monacode', [])
.component('monacode', {
  templateUrl: chrome.extension.getURL('templates/monocode.html'),
  controller: function() {
    var ctrl = this;
    ctrl.user = {
      name: "Felix Eichler",
      imageurl: "https://www.xing.com/image/9_d_7_75e92aaae_22366807_2/felix-eichler-foto.256x256.jpg"
    }
  }
})
.component('monacodeUser', {
  templateUrl: chrome.extension.getURL('templates/monocode-user.html'),
  controller: function() {
    var ctrl = this;
  },
  bindings: {
    user: '<'
  }
});
