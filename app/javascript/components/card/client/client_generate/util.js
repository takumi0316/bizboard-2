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
export function validProperty(value, property) {

  if(value) return true;
  window.alertable({ icon: 'error', message: `${property}を入力してください。`});
};