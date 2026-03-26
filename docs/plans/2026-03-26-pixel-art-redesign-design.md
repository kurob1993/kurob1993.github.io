# Portfolio Pixel Art Redesign - Design Document

**Date:** 2026-03-26  
**Status:** Approved

## Overview

Redesign portfolio dengan Retro Gaming aesthetic - pixel art style dengan animated elements yang memberikan nostalgic gaming feel tanpa sacrificing readability.

## Visual Design

### Color Palette
- **Background:** `#1a1c2c` (dark blue-black)
- **Card Background:** `#2a2d3a`
- **Primary Accent:** `#f4b41b` (golden yellow - like coins/points)
- **Secondary Accent:** `#41e89a` (retro green - health/power)
- **Error/Alert:** `#e84c5d` (retro red - danger)
- **Text Primary:** `#f0f0e8` (off-white)
- **Text Muted:** `#6b7280` (gray-500)

### Typography
- **Headings:** Press Start 2P (Google Font - authentic 8-bit pixel font)
- **Body:** VT323 (Google Font - readable monospace pixel font)
- **Scale:** 16px base, headings in multiples

### Pixel Art Elements
- 4px solid borders with pixelated shadow effect
- Cards dengan chunky pixel corners (via clip-path)
- 8-bit style icons
- Pixelated avatar/profile image

## Animations

### Hover Effects
- Cards lift up dengan slight bounce (transform: translateY(-4px))
- Button press effect (scale down on click, like game button)
- Scale up slightly on interactive elements

### Page Transitions
- Bounce-in animation untuk page content
- Staggered reveal untuk lists

### Loading States
- Simple 8-bit style spinner

## Component Styles

### Cards
```css
.pixel-card {
  background: #2a2d3a;
  border: 4px solid #f0f0e8;
  box-shadow: 4px 4px 0 rgba(0,0,0,0.5);
  transition: transform 0.2s ease;
}

.pixel-card:hover {
  transform: translateY(-4px);
}
```

### Buttons
```css
.pixel-button {
  background: #f4b41b;
  color: #1a1c2c;
  border: 4px solid #f0f0e8;
  box-shadow: 4px 4px 0 rgba(0,0,0,0.5);
  font-family: 'Press Start 2P';
  transition: transform 0.1s;
}

.pixel-button:active {
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0 rgba(0,0,0,0.5);
}
```

### Borders & Corners
```css
.pixel-border {
  border: 4px solid;
  border-color: #f0f0e8;
  image-rendering: pixelated;
}
```

## Implementation Notes

### Tailwind Config Updates
- Add custom colors matching palette
- Add Press Start 2P and VT323 fonts
- Add custom animation classes

### Key Changes Needed
1. Update `tailwind.config.ts` dengan pixel colors dan fonts
2. Update `globals.css` dengan pixel art styles dan animations
3. Add Google Fonts link di layout
4. Update components dengan pixel styling

## Approval

Desain disetujui pada 2026-03-26.
