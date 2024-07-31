// CursorIcon.js
import React, { useRef, useEffect, useState } from 'react';
import './CursorIcon.css';

const CursorIcon = () => {
    const cursorRef = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleMouseMove = (event) => {
            if (cursorRef.current) {
                const { clientX: mouseX, clientY: mouseY } = event;
                cursorRef.current.style.left = `${mouseX}px`;
                cursorRef.current.style.top = `${mouseY}px`;
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    const show = (text) => {
        if (cursorRef.current) {
            cursorRef.current.innerHTML = text;
            if (!visible) {
                setVisible(true);
                cursorRef.current.style.display = 'flex';
                cursorRef.current.style.transform = 'scale(1)';
            }
        }
    };

    const hide = () => {
        if (visible) {
            setVisible(false);
            if (cursorRef.current) {
                cursorRef.current.style.transform = 'scale(0)';
                setTimeout(() => {
                    cursorRef.current.style.display = 'none';
                }, 300); // Duration of the scale transition
            }
        }
    };

    return (
        <div
            id="cursor-icon"
            ref={cursorRef}
            className="cursor-icon"
            style={{ display: visible ? 'flex' : 'none' }}
        />
    );
};

export default CursorIcon;
