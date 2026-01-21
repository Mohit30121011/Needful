"use client";

import { useEffect } from "react";

export const CustomCursor = () => {
    useEffect(() => {
        // Create an orange cursor SVG (default arrow shape)
        const cursorSvg = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path fill="%23FF5200" stroke="%23000" stroke-width="1" d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87c.48 0 .72-.58.38-.92L6.35 2.79a.5.5 0 0 0-.85.42Z"/>
            </svg>
        `;

        // Convert to base64 for CSS
        const cursorUrl = `data:image/svg+xml,${cursorSvg.replace(/\n/g, '').replace(/\s+/g, ' ').trim()}`;

        // Apply custom cursor to body
        document.body.style.cursor = `url("${cursorUrl}") 5 3, auto`;

        // Apply to all elements
        const style = document.createElement('style');
        style.id = 'custom-cursor-style';
        style.textContent = `
            *, *::before, *::after {
                cursor: url("${cursorUrl}") 5 3, auto !important;
            }
            a, button, [role="button"], input[type="submit"], input[type="button"], .cursor-pointer {
                cursor: url("${cursorUrl}") 5 3, pointer !important;
            }
        `;
        document.head.appendChild(style);

        return () => {
            document.body.style.cursor = '';
            const existingStyle = document.getElementById('custom-cursor-style');
            if (existingStyle) existingStyle.remove();
        };
    }, []);

    return null; // No visual element needed - using CSS cursor
};
