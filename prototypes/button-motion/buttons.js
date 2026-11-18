/* Framework-free button factory. All labels are inserted as text. */
(function (global) {
  'use strict';
  const variants = ['escape','underline','line-morph','orbit','split','border','wipe','elastic','corner','rails'];
  const arrow = (diagonal = false) => `<svg class="mb-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="${diagonal ? 'M5 19L19 5M8 5h11v11' : 'M4 12h15M13 6l6 6-6 6'}"/></svg>`;
  function createMotionButton(options = {}) {
    const {label = 'Explore more', variant = 'escape', size = 'medium', disabled = false, className = '', onClick, attributes = {}} = options;
    if (!variants.includes(variant)) throw new TypeError(`Unknown button variant: ${variant}`);
    if (!['small','medium','large'].includes(size)) throw new TypeError(`Unknown button size: ${size}`);
    const button = document.createElement('button');
    for (const [name, value] of Object.entries(attributes)) {
      if (!/^(aria-[\w-]+|data-[\w-]+|id|title|name|value|form|formaction|formmethod|formnovalidate|formtarget|autofocus)$/.test(name)) throw new TypeError(`Unsupported button attribute: ${name}`);
      if (value === false || value == null) continue;
      button.setAttribute(name, value === true ? '' : String(value));
    }
    button.type = options.type || 'button';
    button.className = `motion-button${className ? ` ${className}` : ''}`;
    button.dataset.variant = variant;
    button.dataset.size = size;
    button.disabled = disabled;
    const labelNode = document.createElement('span');
    labelNode.className = variant === 'split' ? 'mb-split-label' : 'mb-label';
    labelNode.textContent = label;
    button.append(labelNode);
    let graphic = '';
    if (variant === 'escape' || variant === 'wipe') graphic = `<span class="mb-clip" aria-hidden="true">${arrow(variant === 'escape').replace('mb-icon','mb-icon mb-first')}${arrow(variant === 'escape').replace('mb-icon','mb-icon mb-second')}</span>`;
    if (variant === 'underline') graphic = arrow();
    if (variant === 'line-morph') graphic = '<svg class="mb-line-icon" viewBox="0 0 42 20" aria-hidden="true"><path class="shaft" d="M2 10h17"/><path class="head" d="M28 5l5 5-5 5"/></svg>';
    if (variant === 'orbit') graphic = `<span class="mb-orbit" aria-hidden="true"><svg viewBox="0 0 36 36"><circle cx="18" cy="18" r="16"/><circle class="ring-accent" cx="18" cy="18" r="16" pathLength="100" transform="rotate(-90 18 18)"/></svg>${arrow()}</span>`;
    if (variant === 'split') graphic = `<span class="mb-split-icon" aria-hidden="true">${arrow(true)}</span>`;
    if (variant === 'border') graphic = `<svg class="mb-border" preserveAspectRatio="none" aria-hidden="true"><rect x=".75" y=".75" width="calc(100% - 1.5px)" height="calc(100% - 1.5px)" rx="24" pathLength="100"/></svg>${arrow(true)}`;
    if (variant === 'elastic') graphic = '<span class="mb-elastic" aria-hidden="true"></span>';
    if (variant === 'corner') graphic = `<span class="mb-corners" aria-hidden="true"><i></i><i></i><i></i><i></i></span>${arrow()}`;
    if (variant === 'rails') graphic = `<span class="mb-rail" aria-hidden="true">${arrow()}</span>`;
    button.insertAdjacentHTML('beforeend', graphic);
    if (typeof onClick === 'function') button.addEventListener('click', onClick);
    return button;
  }
  global.MotionButtons = Object.freeze({create: createMotionButton, variants: Object.freeze(variants.slice())});
})(window);
