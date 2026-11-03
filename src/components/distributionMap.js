
  export function connectDistributionMap(root) {
    'use strict';
    const REGIONS = [{"id":"san-francisco","city":"San Francisco","state":"CA","area":"West","landmark":"Golden Gate Bridge","color":"#4f5073","pin":[252,507],"origin":[410,390],"label":[0,486,225,91],"bbox":[209,4,664,783]},{"id":"chicago","city":"Chicago","state":"IL","area":"North & Midwest","landmark":"Cloud Gate","color":"#49b8e6","pin":[1298,356],"origin":[1050,240],"label":[1209,34,188,101],"bbox":[440,39,1524,575]},{"id":"dallas","city":"Dallas","state":"TX","area":"South Central","landmark":"Reunion Tower","color":"#e4e872","pin":[1047,759],"origin":[950,680],"label":[970,766,156,82],"bbox":[619,397,1316,1028]},{"id":"atlanta","city":"Atlanta","state":"GA","area":"Southeast","landmark":"Georgia State Capitol","color":"#c49a6c","pin":[1449,707],"origin":[1470,715],"label":[1580,704,172,88],"bbox":[1254,536,1707,1016]},{"id":"south-plainfield","city":"South Plainfield","state":"NJ","area":"East","landmark":"Statue of Liberty","color":"#d1dae1","pin":[1704,373],"origin":[1675,320],"label":[1724,347,295,91],"bbox":[1271,48,1871,595]}];
    const disposers = [];
    function listen(target, type, handler) {
      target.addEventListener(type, handler);
      disposers.push(() => target.removeEventListener(type, handler));
    }
    const map = root.querySelector('.map-svg');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const announcement = root.querySelector('#map-announcement');
    const buttons = [...root.querySelectorAll('.city-button')];
    const targets = [...root.querySelectorAll('[data-region]')];
    const layers = new Map(REGIONS.map(region => [region.id, {
      region,
      layer: root.querySelector('#photo-' + region.id),
      circle: root.querySelector('#sweep-' + region.id),
      annotationMask: root.querySelector('#hide-annotations-' + region.id),
      photo: root.querySelector('#image-' + region.id),
      frame: 0,
      zoom: null
    }]));
    let hovered = null, focused = null, selected = null, active = null, exitTimer = 0;
    let pointerOrigin = null;

    function getOrigin(event, region) {
      if (!event || !map.getScreenCTM?.()) return region.origin;
      const p = new DOMPoint(event.clientX, event.clientY).matrixTransform(map.getScreenCTM().inverse());
      const [left, top, right, bottom] = region.bbox;
      return [Math.max(left, Math.min(right, p.x)), Math.max(top, Math.min(bottom, p.y))];
    }

    function reveal(item, origin) {
      const [x, y] = origin || item.region.origin;
      const [l, t, r, b] = item.region.bbox;
      const radius = Math.max(Math.hypot(l-x,t-y),Math.hypot(r-x,t-y),Math.hypot(l-x,b-y),Math.hypot(r-x,b-y)) + 12;
      cancelAnimationFrame(item.frame);
      item.zoom?.cancel();
      item.circle.setAttribute('cx', x);
      item.circle.setAttribute('cy', y);
      item.circle.setAttribute('r', reducedMotion.matches ? radius : 0);
      item.layer.classList.add('is-active');
      item.annotationMask.classList.add('is-active');
      if (reducedMotion.matches) return;
      const started = performance.now();
      const tick = now => {
        const progress = Math.min(1, (now - started) / 700);
        // A gentle ease-out sweep from the pointer, always clipped to the region.
        const eased = 1 - Math.pow(1 - progress, 3);
        item.circle.setAttribute('r', radius * eased);
        if (progress < 1) item.frame = requestAnimationFrame(tick);
      };
      item.frame = requestAnimationFrame(tick);
      // Each photo has a slightly inset transform origin; a restrained settle
      // adds depth while the geographic clipping boundary remains stationary.
      item.photo.style.transformOrigin = `${(l+r)/2}px ${(t+b)/2}px`;
      item.zoom = item.photo.animate?.([{transform:'scale(1.018)'},{transform:'scale(1)'}],
        {duration:1000,easing:'cubic-bezier(.2,.7,.25,1)',fill:'none'});
    }

    function render(origin) {
      const next = focused || hovered || selected;
      if (next === active) {
        buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.region === selected)));
        return;
      }
      if (active) {
        const old = layers.get(active);
        old.layer.classList.remove('is-active');
        old.annotationMask.classList.remove('is-active');
      }
      active = next;
      root.dataset.activeRegion = active || '';
      buttons.forEach(button => {
        button.classList.toggle('is-active', button.dataset.region === active);
        button.setAttribute('aria-pressed', String(button.dataset.region === selected));
      });
      if (active) {
        const item = layers.get(active);
        reveal(item, origin);
        announcement.textContent = `${item.region.city}, ${item.region.state} coverage. Photograph: ${item.region.landmark}.`;
      } else {
        announcement.textContent = 'Distribution coverage map restored.';
      }
    }

    function reset() {
      clearTimeout(exitTimer);
      hovered = focused = selected = null;
      render();
    }

    targets.forEach(target => {
      listen(target, 'pointerenter', event => {
        if (event.pointerType === 'touch') return;
        clearTimeout(exitTimer);
        focused = null;
        hovered = target.dataset.region;
        pointerOrigin = target.classList.contains('city-button') ? null : getOrigin(event, layers.get(hovered).region);
        render(pointerOrigin);
      });
      listen(target, 'pointerleave', event => {
        if (event.pointerType === 'touch') return;
        clearTimeout(exitTimer);
        exitTimer = setTimeout(() => { hovered = null; render(); }, 75);
      });
      listen(target, 'focus', () => {
        // Pointer clicks use selected state; keyboard focus previews a region.
        if (target.matches(':focus-visible')) { focused = target.dataset.region; render(); }
      });
      listen(target, 'blur', () => {
        if (focused === target.dataset.region) { focused = null; render(); }
      });
      listen(target, 'click', event => {
        clearTimeout(exitTimer);
        const id = target.dataset.region;
        selected = selected === id ? null : id;
        if (event.pointerType === 'touch') hovered = null;
        render(target.classList.contains('city-button') ? null : getOrigin(event, layers.get(id).region));
      });
    });
    listen(document, 'keydown', event => { if (event.key === 'Escape') reset(); });
    listen(document, 'pointerdown', event => {
      if (!event.target.closest('[data-region]')) reset();
    });
    listen(reducedMotion, 'change', () => {
      for (const item of layers.values()) {
        cancelAnimationFrame(item.frame);
        item.zoom?.cancel();
        if (item.region.id === active) reveal(item);
      }
    });
      return () => {
      clearTimeout(exitTimer);
      disposers.forEach(dispose => dispose());
      for (const item of layers.values()) {
        cancelAnimationFrame(item.frame);
        item.zoom?.cancel();
        item.layer.classList.remove('is-active');
        item.annotationMask.classList.remove('is-active');
      }
      buttons.forEach(button => { button.classList.remove('is-active'); button.setAttribute('aria-pressed', 'false'); });
      root.dataset.activeRegion = '';
    };
}
