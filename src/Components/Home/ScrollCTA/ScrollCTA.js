import { useEffect, useState, useRef } from 'react';
import './ScrollCTA.css';
import gsap from 'gsap';

const ScrollCTA = () => {
    const [opacity, setOpacity] = useState(0.5); // Initialize opacity state
    const scrollCTA = useRef(null); // Ref for GSAP animation

    // Handle scroll events
    const handleScroll = () => {
        // Update opacity based on scroll position
        const newOpacity = window.scrollY > 100 ? 0 : 0.5;
        setOpacity(newOpacity);
    };

    // Add and remove scroll event listener
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // GSAP animation on mount
    useEffect(() => {
        gsap.fromTo(
            scrollCTA.current,
            { opacity: 0 },
            { opacity: 0.5, duration: 1, delay: 2.6 }
        );
    }, []);

    return (
        <p id="scroll-cta" style={{ opacity }} ref={scrollCTA}>
            Scroll to explore
        </p>
    );
};

export default ScrollCTA;
