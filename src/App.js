// Import necessary styles and libraries
import './shared.css';
import './fonts.css';
import { useState, useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

import Home from './Components/Home/Home';
import LoadingScreen from './Components/LoadingScreen/LoadingScreen';
import CursorIcon from './Components/CursorIcon/CursorIcon';
import gsap from 'gsap';

const App = () => {
  const [loadingVisible, setLoadingVisible] = useState(true);

  // Smooth scroll setup
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smooth: true,
    });

    const scrollFn = () => {
      lenis.raf();
      requestAnimationFrame(scrollFn);
    };
    requestAnimationFrame(scrollFn);

    // Cleanup function to stop Lenis animation on component unmount
    return () => {
      cancelAnimationFrame(scrollFn);
    };
  }, []);

  // Cursor icon state management
  const handleCursorVisibility = (visible, text) => {
    const cursorIcon = document.getElementById('cursor-icon');
    if (cursorIcon) {
      if (visible) {
        cursorIcon.style.display = 'flex';
        cursorIcon.innerHTML = text;
        gsap.to(cursorIcon, { scale: 1, duration: 0.3 });
      } else {
        gsap.to(cursorIcon, {
          scale: 0,
          duration: 0.3,
          onComplete: () => {
            cursorIcon.style.display = 'none';
          },
        });
      }
    }
  };

  useEffect(() => {
    window.cursorIcon = { show: (text) => handleCursorVisibility(true, text), hide: () => handleCursorVisibility(false) };

    // Cleanup function to remove cursorIcon reference on component unmount
    return () => {
      window.cursorIcon = null;
    };
  }, []);

  return (
    <div className="center column">
      {loadingVisible ? <LoadingScreen setLoadingVisible={setLoadingVisible} /> : null}
      <Home />
      <CursorIcon />
    </div>
  );
};

export default App;
