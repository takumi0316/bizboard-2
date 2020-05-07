const UAParser = require('ua-parser-js');

/**
 * generate unique key 
 * @version 2020/04/04
 **/
export function generateKey(pre) {

  return `${ pre }_${ new Date().getTime() }`;
};

/**
 * valid property 
 * @version 2020/04/04
 */
export function validProperty(value, message) {

  if(value) return true;
  window.alertable({ icon: 'error', message: message});
};

// ptをmmに変換
export function ptTomm(pt) {

  return pt * 0.3527777778;
};

// OS毎にpx変換を変更
export function mmTopx(mm) {

  // ブラウザ取得
  const parser = new UAParser();
  const os = parser.getOS().name;

  if(os == 'Windows') return 72 / 25.4 * mm;
  if(os == 'Mac OS') return 72 / 25.4 * mm;
};