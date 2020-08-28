(function () {
  const KEYCODE = {
    VK_LEFT: 37,
    VK_UP: 38,
    VK_RIGHT: 39,
    VK_DOWN: 40,
  };

  class RadioBtn extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      this.setAttribute('role', 'radio');
      this.setAttribute('tabindex', '-1');
      this.setAttribute('aria-checked', false);
    }

    get value() {
      return this.getAttribute('value');
    }
  }

  class RadioGroup extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      this.setAttribute('role', 'radiogroup');
      this.radios = Array.from(this.querySelectorAll('radio-btn'));

      if (this.hasAttribute('selected')) {
        let selected = this.getAttribute('selected');
        this._selected = selected;
        this.radios[selected].setAttribute('tabindex', 0);
        this.radios[selected].setAttribute('aria-checked', true);
      } else {
        this._selected = 0;
        this.radios[0].setAttribute('tabindex', 0);
      }

      this.addEventListener('keydown', this.handleKeyDown.bind(this));
      this.addEventListener('click', this.handleClick.bind(this));
    }

    handleClick(e) {
      this.radios.forEach((radio, i) => {
        if (e.target === radio) {
          this.selected = i;
        }
      });
    }

    handleKeyDown(e) {
      switch (e.keyCode) {
        case KEYCODE.VK_UP:
        case KEYCODE.VK_LEFT: {
          e.preventDefault();

          if (this.selected === 0) {
            this.selected = this.radios.length - 1;
          } else {
            this.selected--;
          }
          break;
        }

        case KEYCODE.VK_DOWN:
        case KEYCODE.VK_RIGHT: {
          e.preventDefault();

          if (this.selected === this.radios.length - 1) {
            this.selected = 0;
          } else {
            this.selected++;
          }

          break;
        }
      }
    }

    set selected(idx) {
      if (isFinite(this.selected)) {
        let previousSelected = this.radios[this.selected];
        previousSelected.tabIndex = -1;
        previousSelected.removeAttribute('aria-checked', true);
      }

      let newSelected = this.radios[idx];
      newSelected.tabIndex = 0;
      newSelected.focus();
      newSelected.setAttribute('aria-checked', true);

      this.setAttribute('selected', idx);
      this._selected = idx;
    }

    get selected() {
      return this._selected;
    }
  }

  window.customElements.define('radio-btn', RadioBtn);
  window.customElements.define('radio-group', RadioGroup);
})();
