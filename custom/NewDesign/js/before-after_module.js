define(() => {

  return {

    init(element) {
      let isActive = false;

      const before = element.querySelector('.slider-before-after_before');
      const beforeImage = before.querySelector('img');
      const change = element.querySelector('.slider-before-after_change');

      let width = element.offsetWidth;
      beforeImage.style.width = `${width}px`;

      change.addEventListener('mousedown', () => {
        isActive = true;
      });

      element.addEventListener('mouseup', () => {
        isActive = false;
      });

      element.addEventListener('mouseleave', () => {
        isActive = false;
      });

      const beforeAfterSlider = (x) => {
        let shift = Math.max(0, Math.min(x, element.offsetWidth));
        before.style.width = `${shift}px`;
        change.style.left = `${shift}px`;
      };

      const pauseEvents = (e) => {
        e.stopPropagation();
        e.preventDefault();
        return false;
      };

      element.addEventListener('mousemove', (e) => {
        if (!isActive) {
          return;
        }

        let x = e.pageX;
        x -= element.getBoundingClientRect().left;
        beforeAfterSlider(x);
        pauseEvents(e);
      });

      change.addEventListener('touchstart', () => {
        isActive = true;
      });

      element.addEventListener('touchend', () => {
        isActive = false;
      });

      element.addEventListener('touchcancel', () => {
        isActive = false;
      });

      element.addEventListener('touchmove', (e) => {
        if (!isActive) {
          return;
        }

        let x;

        let i;
        for (i = 0; i < e.changedTouches.length; i++) {
          x = e.changedTouches[i].pageX;
        }

        x -= element.getBoundingClientRect().left;

        beforeAfterSlider(x);
        pauseEvents(e);
      });
    }
  }
})