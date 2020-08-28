class ExploreCustomElement extends HTMLElement {
  static get observedAttributes() {
    return ['disabled', 'open'];
  }
  get open() {
    return this.hasAttribute('open');
  }

  set open(val) {
    if (val) {
      this.setAttribute('open', '');
    } else {
      this.removeAttribute('open');
    }

    this.getLog();
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }

  set disabled(val) {
    if (val) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }

    this.getLog();
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (this.disabled) {
      this.setAttribute('tabindex', '-1');
      this.setAttribute('aria-disabled', 'true');
    } else {
      this.setAttribute('tabindex', '0');
      this.setAttribute('aria-disabled', 'false');
    }
  }

  constructor() {
    super();
    this.addEventListener('click', () => {
      // if (this.disabled) return;
      this.disabled = !this.disabled;
    });
  }

  getLog() {
    console.log('logging...');
  }
}

window.customElements.define('ex-custom', ExploreCustomElement);

(function () {
  class FancyButton extends HTMLButtonElement {
    constructor() {
      super();
      this.addEventListener('click', (e) => {
        this.drawRipple(e.offsetX, e.offsetY);
      });
    }

    // Material design ripple animation.
    drawRipple(x, y) {
      let div = document.createElement('div');
      div.classList.add('ripple');
      this.appendChild(div);
      div.style.top = `${y - div.clientHeight / 2}px`;
      div.style.left = `${x - div.clientWidth / 2}px`;
      div.style.backgroundColor = 'currentColor';
      div.classList.add('run');
      div.addEventListener('transitionend', (e) => div.remove());
    }
  }

  window.customElements.define('f-button', FancyButton, {
    extends: 'button',
  });
})();
