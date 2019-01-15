//##############################################################################
// Pagy
//##############################################################################

/**
 *  Pagy Class
 *  @version 2018/06/10
 */
window.Pagy = window.Pagy||{};

(function() {

  /**
   *  コンストラクタ
   *  @version 2018/06/10
   */
  function Pagy() {};

  const p = Pagy.prototype;

  // window event listeners
  p.windowListeners = [];

  /**
   *  add event listener
   *  @version 2018/06/10
   */
  p.addInputEventListeners = function(input, handler) {
    
    // select the content on click: easier for typing a number
    input.addEventListener('click', function(){ this.select() });
    // go when the input looses focus
    input.addEventListener('focusout', handler);
    // … and when pressing enter inside the input
    input.addEventListener('keyup', function(e){ if (e.which === 13) handler() }.bind(this));
  }

  /**
   *  add compact event
   *  @version 2018/06/10
   */
  p.compact = function(id, marker, page, trim) {

    const pagyNav = document.getElementById(`pagy-nav-${id}`),
      input   = pagyNav.getElementsByTagName('input')[0],
      link    = pagyNav.getElementsByTagName('a')[0],
      linkP1  = pagyNav.getElementsByTagName('a')[1];

    this.addInputEventListeners(input, () => {

      if (page !== input.value) {

        if (trim === true && input.value === '1') {

          linkP1.click();
        } else {

          const href = link.getAttribute('href').replace(marker, input.value);
          link.setAttribute('href', href);
          link.click();
        }
      }
    });
  }

  /**
   *  initializer
   *  @version 2018/06/10
   */
  p.init = function() {
    
    // we need to explicitly remove the window listeners  because turbolinks persists the window object
    this.windowListeners.forEach(function(l){window.removeEventListener('resize', l, true)});

    this.windowListeners = [];

    const pagyJsonDoms = document.getElementsByClassName('pagy-compact-json');

    pagyJsonDoms.forEach((pagyJsonDom) => {
      
      this.compact.apply(this, JSON.parse(pagyJsonDom.innerHTML))
    });
  }

  window.Pagy = new Pagy;
})();
