const { useRef, useEffect } = React;

/**
 * LetterGlitch Component
 * Creates an animated matrix-style background with randomly changing letters
 * Supports smooth color transitions and customizable glitch speed
 * 
 * This is a visual effect component used behind the main content
 */
const LetterGlitch = ({
  // Array of hex colors to randomly pick from for letters
  glitchColors = ['#2b4539', '#61dca3', '#61b3dc'],
  className = '',
  // Speed of glitch effect in milliseconds (lower = faster changes)
  glitchSpeed = 50,
  // Optional darkening effect at center of screen
  centerVignette = false,
  // Optional darkening effect at edges of screen
  outerVignette = true,
  // Whether colors fade smoothly or change instantly
  smooth = true,
  // Pool of characters to randomly display
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!#$&*()-_+=/[]{};:<>.,0123456789'
}) => {
  // ===== REFS FOR CANVAS AND ANIMATION =====
  // Reference to the HTML canvas element
  const canvasRef = useRef(null);
  // ID of the animation frame request
  const animationRef = useRef(null);
  // Array of letter objects currently displayed
  const letters = useRef([]);
  // Grid dimensions (columns and rows)
  const grid = useRef({ columns: 0, rows: 0 });
  // Canvas 2D drawing context
  const context = useRef(null);
  // Tracks last time a glitch occurred (for speed control)
  const lastGlitchTime = useRef(Date.now());

  // ===== SETUP AND CONSTANTS =====
  // Convert string of characters into array for easy access
  const lettersAndSymbols = Array.from(characters);

  // Size of each character
  const fontSize = 16;
  const charWidth = 10;   // Width of each character cell
  const charHeight = 20;  // Height of each character cell

  // ===== UTILITY FUNCTIONS =====
  /**
   * Returns a random character from the available pool
   */
  const getRandomChar = () => {
    return lettersAndSymbols[Math.floor(Math.random() * lettersAndSymbols.length)];
  };

  /**
   * Returns a random color from the available glitch colors
   */
  const getRandomColor = () => {
    return glitchColors[Math.floor(Math.random() * glitchColors.length)];
  };

  /**
   * Converts hex color codes (#RRGGBB) to RGB object
   * Needed for smooth color interpolation
   * @param {string} hex - Hex color code
   * @returns {object} - { r, g, b } values 0-255
   */
  const hexToRgb = hex => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => {
      return r + r + g + g + b + b;
    });

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        }
      : null;
  };

  /**
   * Smoothly blends between two RGB colors
   * Used for the smooth transition effect
   * @param {object} start - Starting RGB color
   * @param {object} end - Ending RGB color
   * @param {number} factor - Progress 0-1 (0=start, 1=end)
   * @returns {string} - CSS rgb() string
   */
  const interpolateColor = (start, end, factor) => {
    const result = {
      r: Math.round(start.r + (end.r - start.r) * factor),
      g: Math.round(start.g + (end.g - start.g) * factor),
      b: Math.round(start.b + (end.b - start.b) * factor)
    };
    return `rgb(${result.r}, ${result.g}, ${result.b})`;
  };

  /**
   * Calculates how many letters fit in the available space
   * @param {number} width - Canvas width
   * @param {number} height - Canvas height
   * @returns {object} - { columns, rows }
   */
  const calculateGrid = (width, height) => {
    const columns = Math.ceil(width / charWidth);
    const rows = Math.ceil(height / charHeight);
    return { columns, rows };
  };

  /**
   * Creates initial letter data for the entire grid
   * Each letter has a character, current color, and target color
   */
  const initializeLetters = (columns, rows) => {
    grid.current = { columns, rows };
    const totalLetters = columns * rows;
    letters.current = Array.from({ length: totalLetters }, () => ({
      char: getRandomChar(),
      color: getRandomColor(),
      targetColor: getRandomColor(),
      colorProgress: 1  // How far along the color transition we are
    }));
  };

  /**
   * Handles window resize events
   * Adjusts canvas size and reinitializes grid of letters
   */
  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    // Account for high-DPI displays
    const dpr = window.devicePixelRatio || 1;
    const rect = parent.getBoundingClientRect();

    // Set internal resolution
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    // Set display size
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    // Apply DPI scaling to context
    if (context.current) {
      context.current.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    // Recalculate grid and reinitialize letters
    const { columns, rows } = calculateGrid(rect.width, rect.height);
    initializeLetters(columns, rows);

    drawLetters();
  };

  /**
   * Renders all letters to the canvas
   */
  const drawLetters = () => {
    if (!context.current || letters.current.length === 0) return;
    const ctx = context.current;
    const { width, height } = canvasRef.current.getBoundingClientRect();
    
    // Clear previous frame
    ctx.clearRect(0, 0, width, height);
    
    // Set font (Matrix Code NFI must be loaded in CSS)
    ctx.font = `${fontSize}px Matrix Code NFI`;
    ctx.textBaseline = 'top';

    // Draw each letter at its grid position
    letters.current.forEach((letter, index) => {
      const x = (index % grid.current.columns) * charWidth;
      const y = Math.floor(index / grid.current.columns) * charHeight;
      ctx.fillStyle = letter.color;
      ctx.fillText(letter.char, x, y);
    });
  };

  /**
   * Randomly updates some letters and their target colors
   * Called on each glitch event (controlled by glitchSpeed)
   */
  const updateLetters = () => {
    if (!letters.current || letters.current.length === 0) return;

    // Update about 5% of letters at random
    const updateCount = Math.max(1, Math.floor(letters.current.length * 0.05));

    for (let i = 0; i < updateCount; i++) {
      const index = Math.floor(Math.random() * letters.current.length);
      if (!letters.current[index]) continue;

      // Pick a new random character and color
      letters.current[index].char = getRandomChar();
      letters.current[index].targetColor = getRandomColor();

      // If not using smooth transitions, apply color immediately
      if (!smooth) {
        letters.current[index].color = letters.current[index].targetColor;
        letters.current[index].colorProgress = 1;
      } else {
        // Otherwise start a new color transition
        letters.current[index].colorProgress = 0;
      }
    }
  };

  /**
   * Handles smooth color transitions between current and target colors
   * Called every frame when smooth mode is enabled
   */
  const handleSmoothTransitions = () => {
    let needsRedraw = false;
    
    letters.current.forEach(letter => {
      // If still transitioning to target color
      if (letter.colorProgress < 1) {
        letter.colorProgress += 0.05;  // Progress 5% each frame
        if (letter.colorProgress > 1) letter.colorProgress = 1;

        // Interpolate between current and target colors
        const startRgb = hexToRgb(letter.color);
        const endRgb = hexToRgb(letter.targetColor);
        if (startRgb && endRgb) {
          letter.color = interpolateColor(startRgb, endRgb, letter.colorProgress);
          needsRedraw = true;
        }
      }
    });

    // Only redraw if colors actually changed
    if (needsRedraw) {
      drawLetters();
    }
  };

  /**
   * Main animation loop
   * Called every frame by requestAnimationFrame
   * Updates glitch effects and smooth color transitions
   */
  const animate = () => {
    const now = Date.now();
    
    // Check if it's time for a glitch update (based on glitchSpeed)
    if (now - lastGlitchTime.current >= glitchSpeed) {
      updateLetters();
      drawLetters();
      lastGlitchTime.current = now;
    }

    // Handle smooth color transitions if enabled
    if (smooth) {
      handleSmoothTransitions();
    }

    // Schedule next frame
    animationRef.current = requestAnimationFrame(animate);
  };

  // ===== REACT EFFECTS =====
  // Set up canvas animation on mount and cleanup on unmount
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Get 2D drawing context
    context.current = canvas.getContext('2d');
    
    // Initial setup
    resizeCanvas();
    animate();

    // Handle window resizing with debounce
    let resizeTimeout;

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        // Stop current animation
        cancelAnimationFrame(animationRef.current);
        
        // Reinitialize for new size
        resizeCanvas();
        animate();
      }, 100);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup function - stop animation and remove listener
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [glitchSpeed, smooth]);

  // ===== STYLING =====
  // Container holds the canvas and optional vignette effects
  const containerStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#000000',
    overflow: 'hidden',
    zIndex: 0,
    pointerEvents: 'none'  // Don't block clicks on content above
  };

  // Canvas fills the container
  const canvasStyle = {
    display: 'block',
    width: '100%',
    height: '100%'
  };

  // Outer vignette darkens the edges (if enabled)
  const outerVignetteStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    background: 'radial-gradient(circle, rgba(0,0,0,0) 60%, rgba(0,0,0,1) 100%)'
  };

  // Center vignette darkens the center (if enabled)
  const centerVignetteStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    background: 'radial-gradient(circle, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 60%)'
  };

  // ===== RENDER =====
  // Returns container with canvas and optional vignette overlays
  return React.createElement('div', { style: containerStyle, className: className },
    React.createElement('canvas', { ref: canvasRef, style: canvasStyle }),
    outerVignette && React.createElement('div', { style: outerVignetteStyle }),
    centerVignette && React.createElement('div', { style: centerVignetteStyle })
  );
};
