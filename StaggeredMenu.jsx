const { useCallback, useLayoutEffect, useRef, useState, useEffect } = React;

const StaggeredMenu = ({
  position = 'right',
  colors = ['#B19EEF', '#5227FF'],
  items = [],
  socialItems = [],
  displaySocials = true,
  displayItemNumbering = true,
  className,
  logoUrl,
  menuButtonColor = '#fff',
  openMenuButtonColor = '#fff',
  accentColor = '#5227FF',
  changeMenuColorOnOpen = true,
  isFixed = false,
  closeOnClickAway = true,
  onMenuOpen,
  onMenuClose
}) => {
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);
  const panelRef = useRef(null);
  const preLayersRef = useRef(null);
  const preLayerElsRef = useRef([]);
  const plusHRef = useRef(null);
  const plusVRef = useRef(null);
  const iconRef = useRef(null);
  const textInnerRef = useRef(null);
  const textWrapRef = useRef(null);
  const [textLines, setTextLines] = useState(['Menu', 'Close']);

  const openTlRef = useRef(null);
  const closeTweenRef = useRef(null);
  const spinTweenRef = useRef(null);
  const textCycleAnimRef = useRef(null);
  const colorTweenRef = useRef(null);
  const toggleBtnRef = useRef(null);
  const busyRef = useRef(false);
  const itemEntranceTweenRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const preContainer = preLayersRef.current;
      const plusH = plusHRef.current;
      const plusV = plusVRef.current;
      const icon = iconRef.current;
      const textInner = textInnerRef.current;
      if (!panel || !plusH || !plusV || !icon || !textInner) return;

      let preLayers = [];
      if (preContainer) {
        preLayers = Array.from(preContainer.querySelectorAll('.sm-prelayer'));
      }
      preLayerElsRef.current = preLayers;

      const offscreen = position === 'left' ? -100 : 100;
      gsap.set([panel, ...preLayers], { xPercent: offscreen });
      gsap.set(plusH, { transformOrigin: '50% 50%', rotate: 0 });
      gsap.set(plusV, { transformOrigin: '50% 50%', rotate: 90 });
      gsap.set(icon, { rotate: 0, transformOrigin: '50% 50%' });
      gsap.set(textInner, { yPercent: 0 });
      if (toggleBtnRef.current) gsap.set(toggleBtnRef.current, { color: menuButtonColor });
    });
    return () => ctx.revert();
  }, [menuButtonColor, position]);

  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return null;

    openTlRef.current?.kill();
    if (closeTweenRef.current) {
      closeTweenRef.current.kill();
      closeTweenRef.current = null;
    }
    itemEntranceTweenRef.current?.kill();

    const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel'));
    const numberEls = Array.from(panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item'));
    const socialTitle = panel.querySelector('.sm-socials-title');
    const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link'));

    const layerStates = layers.map(el => ({ el, start: Number(gsap.getProperty(el, 'xPercent')) }));
    const panelStart = Number(gsap.getProperty(panel, 'xPercent'));

    if (itemEls.length) {
      gsap.set(itemEls, { yPercent: 140, rotate: 10 });
    }
    if (numberEls.length) {
      gsap.set(numberEls, { '--sm-num-opacity': 0 });
    }
    if (socialTitle) {
      gsap.set(socialTitle, { opacity: 0 });
    }
    if (socialLinks.length) {
      gsap.set(socialLinks, { y: 25, opacity: 0 });
    }

    const tl = gsap.timeline({ paused: true });

    layerStates.forEach(({ el, start }, i) => {
      tl.fromTo(el, { xPercent: start }, {
        xPercent: 0,
        duration: 0.7,
        ease: 'expo.inOut'
      }, i * 0.04);
    });

    tl.fromTo(panel, { xPercent: panelStart }, {
      xPercent: 0,
      duration: 0.7,
      ease: 'expo.inOut'
    }, layerStates.length * 0.04);

    if (itemEls.length) {
      itemEls.forEach((el, i) => {
        tl.to(el, { yPercent: 0, rotate: 0, duration: 0.6, ease: 'back.out(1.5)' }, 0.15 + i * 0.05);
      });
    }

    if (numberEls.length) {
      numberEls.forEach((el, i) => {
        tl.to(el, { '--sm-num-opacity': 1, duration: 0.5, ease: 'power2.out' }, 0.2 + i * 0.05);
      });
    }

    if (socialTitle) {
      tl.to(socialTitle, { opacity: 1, duration: 0.4, ease: 'power2.inOut' }, 0.3);
    }

    if (socialLinks.length) {
      socialLinks.forEach((el, i) => {
        tl.to(el, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }, 0.35 + i * 0.05);
      });
    }

    return tl;
  }, []);

  const playOpen = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;

    const tl = buildOpenTimeline();
    if (!tl) {
      busyRef.current = false;
      return;
    }

    tl.play();
    tl.eventCallback('onComplete', () => {
      busyRef.current = false;
      openTlRef.current = null;
    });
    openTlRef.current = tl;
  }, [buildOpenTimeline]);

  const playClose = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;

    openTlRef.current?.kill();
    openTlRef.current = null;
    itemEntranceTweenRef.current?.kill();

    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) {
      busyRef.current = false;
      return;
    }

    const offscreen = position === 'left' ? -100 : 100;
    const layersToAnimate = [...layers];
    layersToAnimate.reverse();

    const tl = gsap.timeline({
      onComplete: () => {
        busyRef.current = false;
        closeTweenRef.current = null;
      }
    });

    tl.to(panel, { xPercent: offscreen, duration: 0.6, ease: 'expo.inOut' }, 0);
    layersToAnimate.forEach((el, i) => {
      tl.to(el, { xPercent: offscreen, duration: 0.6, ease: 'expo.inOut' }, i * 0.04);
    });

    closeTweenRef.current = tl;
  }, [position]);

  const animateIcon = useCallback((toOpen) => {
    spinTweenRef.current?.kill();
    const plusH = plusHRef.current;
    const plusV = plusVRef.current;
    const icon = iconRef.current;
    if (!plusH || !plusV || !icon) return;

    const tl = gsap.timeline();
    if (toOpen) {
      tl.to(icon, { rotate: 180, duration: 0.4, ease: 'power2.inOut' }, 0);
      tl.to(plusV, { rotate: 0, duration: 0.4, ease: 'power2.inOut' }, 0);
    } else {
      tl.to(icon, { rotate: 0, duration: 0.4, ease: 'power2.inOut' }, 0);
      tl.to(plusV, { rotate: 90, duration: 0.4, ease: 'power2.inOut' }, 0);
    }
    spinTweenRef.current = tl;
  }, []);

  const animateText = useCallback((toOpen) => {
    textCycleAnimRef.current?.kill();
    const textInner = textInnerRef.current;
    if (!textInner) return;

    const targetY = toOpen ? -50 : 0;
    const tw = gsap.to(textInner, { yPercent: targetY, duration: 0.3, ease: 'power2.inOut' });
    textCycleAnimRef.current = tw;
  }, []);

  const animateColor = useCallback((toOpen) => {
    if (!changeMenuColorOnOpen) return;
    colorTweenRef.current?.kill();
    const btn = toggleBtnRef.current;
    if (!btn) return;

    const targetColor = toOpen ? openMenuButtonColor : menuButtonColor;
    const tw = gsap.to(btn, { color: targetColor, duration: 0.3, ease: 'power2.inOut' });
    colorTweenRef.current = tw;
  }, [changeMenuColorOnOpen, menuButtonColor, openMenuButtonColor]);

  const toggleMenu = useCallback(() => {
    if (busyRef.current) return;
    const willOpen = !openRef.current;
    openRef.current = willOpen;
    setOpen(willOpen);

    animateIcon(willOpen);
    animateText(willOpen);
    animateColor(willOpen);

    if (willOpen) {
      playOpen();
      if (onMenuOpen) onMenuOpen();
    } else {
      playClose();
      if (onMenuClose) onMenuClose();
    }
  }, [animateIcon, animateText, animateColor, playOpen, playClose, onMenuOpen, onMenuClose]);

  const closeMenu = useCallback(() => {
    if (busyRef.current) return;
    if (!openRef.current) return;
    toggleMenu();
  }, [toggleMenu]);

  useEffect(() => {
    if (!closeOnClickAway) return;
    const handleClickOutside = (e) => {
      if (!open) return;
      const panel = panelRef.current;
      const toggleBtn = toggleBtnRef.current;
      if (!panel || !toggleBtn) return;
      if (panel.contains(e.target) || toggleBtn.contains(e.target)) return;
      closeMenu();
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [closeOnClickAway, open, closeMenu]);

  const containerProps = {
    className: (className ? className + ' ' : '') + 'staggered-menu-wrapper' + (isFixed ? ' fixed-wrapper' : ''),
    style: accentColor ? { '--sm-accent': accentColor } : undefined,
    'data-position': position,
    'data-open': open || undefined
  };

  const prelayerColors = (() => {
    const raw = colors && colors.length ? colors.slice(0, 4) : ['#1e1e22', '#35353c'];
    let arr = [...raw];
    if (arr.length >= 3) {
      const mid = Math.floor(arr.length / 2);
      arr.splice(mid, 1);
    }
    return arr;
  })();

  return (
    <div {...containerProps}>
      <div ref={preLayersRef} className="sm-prelayers" aria-hidden="true">
        {prelayerColors.map((c, i) => (
          <div key={i} className="sm-prelayer" style={{ background: c }} />
        ))}
      </div>
      
      <header className="staggered-menu-header" aria-label="Main navigation header">
        {logoUrl && (
          <div className="sm-logo" aria-label="Logo">
            <img
              src={logoUrl}
              alt="SecureEnough Logo"
              className="sm-logo-img"
              draggable={false}
              width={110}
              height={24}
            />
          </div>
        )}
        
        <button
          ref={toggleBtnRef}
          className="sm-toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="staggered-menu-panel"
          onClick={toggleMenu}
          type="button"
        >
          <span ref={textWrapRef} className="sm-toggle-textWrap" aria-hidden="true">
            <span ref={textInnerRef} className="sm-toggle-textInner">
              {textLines.map((l, i) => (
                <span className="sm-toggle-line" key={i}>{l}</span>
              ))}
            </span>
          </span>
          <span ref={iconRef} className="sm-icon" aria-hidden="true">
            <span ref={plusHRef} className="sm-icon-line" />
            <span ref={plusVRef} className="sm-icon-line sm-icon-line-v" />
          </span>
        </button>
      </header>
      
      <aside id="staggered-menu-panel" ref={panelRef} className="staggered-menu-panel" aria-hidden={!open}>
        <div className="sm-panel-inner">
          <ul className="sm-panel-list" role="list" data-numbering={displayItemNumbering || undefined}>
            {items && items.length ? (
              items.map((it, idx) => (
                <li className="sm-panel-itemWrap" key={it.label + idx}>
                  <a className="sm-panel-item" href={it.link} aria-label={it.ariaLabel} data-index={idx + 1}>
                    <span className="sm-panel-itemLabel">{it.label}</span>
                  </a>
                </li>
              ))
            ) : (
              <li className="sm-panel-itemWrap" aria-hidden="true">
                <span className="sm-panel-item">
                  <span className="sm-panel-itemLabel">No items</span>
                </span>
              </li>
            )}
          </ul>
          
          {displaySocials && socialItems && socialItems.length > 0 && (
            <div className="sm-socials" aria-label="Social links">
              <h3 className="sm-socials-title">Socials</h3>
              <ul className="sm-socials-list" role="list">
                {socialItems.map((s, i) => (
                  <li key={s.label + i} className="sm-socials-item">
                    <a href={s.link} target="_blank" rel="noopener noreferrer" className="sm-socials-link">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
};
