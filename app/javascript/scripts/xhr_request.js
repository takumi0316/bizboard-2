//##############################################################################
// Xhr Request
//##############################################################################

window.xhrRequest = window.xhrRequest || require('axios');

window.xhrRequest.defaults.headers['X-Requested-With'] = 'XMLHttpRequest';
var csrf = null;
if (csrf = document.getElementsByName('csrf-token').item(0)) window.xhrRequest.defaults.headers['X-CSRF-TOKEN'] = csrf.content;
window.xhrRequest.defaults.withCredentials = true;
window.xhrRequest.defaults.headers.get.timeout = 5000;
