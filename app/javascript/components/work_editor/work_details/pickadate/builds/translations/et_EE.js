/* pickadate v5.0.0-alpha.3, @license MIT */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, (global.pickadate = global.pickadate || {}, global.pickadate.translations = global.pickadate.translations || {}, global.pickadate.translations.et_EE = factory()));
}(this, function () { 'use strict';

  // Estonian
  var translation = {
    firstDayOfWeek: 1,
    template: 'D. MMMM YYYY. a',
    templateHookWords: {
      MMM: ['jaan', 'veebr', 'märts', 'apr', 'mai', 'juuni', 'juuli', 'aug', 'sept', 'okt', 'nov', 'dets'],
      MMMM: ['jaanuar', 'veebruar', 'märts', 'aprill', 'mai', 'juuni', 'juuli', 'august', 'september', 'oktoober', 'november', 'detsember'],
      DDD: ['püh', 'esm', 'tei', 'kol', 'nel', 'ree', 'lau'],
      DDDD: ['pühapäev', 'esmaspäev', 'teisipäev', 'kolmapäev', 'neljapäev', 'reede', 'laupäev']
    }
  };

  return translation;

}));