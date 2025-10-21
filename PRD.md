# Planning Guide

A visual journey through the cultural evolution of nations, showcasing how civilizations emerge, branch, influence, and transform across time through an intuitive left-to-right timeline.

**Experience Qualities**:
1. **Exploratory** - Users should feel drawn to discover connections between cultures, with the interface inviting curiosity about historical relationships
2. **Klarheit (Clarity)** - Complex historical information presented through clean visual hierarchies that make branching and evolution immediately understandable
3. **Reverent** - Design honors the weight and significance of cultural history while remaining approachable and engaging

**Complexity Level**: Light Application (multiple features with basic state)
The app focuses on interactive visualization with zooming, panning, and details-on-demand without requiring complex state management or user accounts.

## Essential Features

### Interactive Timeline Visualization
- **Functionality**: Displays civilizations/countries as flowing branches on a horizontal timeline from ancient to modern periods
- **Purpose**: Makes cultural evolution and relationships visually intuitive through spatial positioning
- **Trigger**: Page loads with full timeline visible, auto-fit to viewport
- **Progression**: Page loads → Timeline renders with all civilizations → User views overview → Can pan/zoom to explore periods
- **Success criteria**: All civilizations visible in initial view, smooth 60fps pan/zoom, clear visual hierarchy

### Civilization Branches
- **Functionality**: Shows how countries emerge from parent civilizations, split, merge, or influence each other through visual branching
- **Purpose**: Illustrates historical relationships and cultural inheritance between nations
- **Trigger**: Rendered as part of timeline structure
- **Progression**: Timeline displays → Branches show parent-child relationships → Visual flow indicates cultural continuity → Color coding groups related cultures
- **Success criteria**: Branch relationships are immediately clear, splitting points are visually distinct, flow direction is obvious

### Detail Cards
- **Functionality**: Click any civilization node to reveal cultural highlights, key periods, and significant influences
- **Purpose**: Provides context and depth without cluttering the main visualization
- **Trigger**: User clicks on a civilization node or timeline segment
- **Progression**: User clicks node → Card appears with smooth animation → Displays key cultural information → User can close or click another node
- **Success criteria**: Cards appear within 100ms, don't obscure important timeline elements, contain relevant cultural information

### Time Period Navigation
- **Functionality**: Visual markers and labels for major historical periods (Ancient, Classical, Medieval, Renaissance, Modern, Contemporary)
- **Purpose**: Provides temporal context and helps users orient within the timeline
- **Trigger**: Always visible as part of timeline structure
- **Progression**: Timeline renders → Period markers appear at top → Labels help identify when civilizations flourished → Users can click periods to focus
- **Success criteria**: Periods are clearly labeled, markers don't interfere with civilization branches, periods align correctly with dates

## Edge Case Handling

- **Empty or minimal data**: Graceful display with placeholder civilizations and educational messaging about adding more data
- **Overlapping branches**: Intelligent vertical spacing algorithm prevents visual collision while maintaining chronological accuracy
- **Mobile/small screens**: Simplified view with touch gestures (pinch-zoom, swipe) and collapsible detail cards
- **Long civilization names**: Truncation with tooltips on hover to prevent label overflow
- **Deep branching**: Vertical scrolling enabled when branches exceed viewport height

## Design Direction

The design should evoke a sense of flowing time and organic growth - like watching rivers branch and merge across a landscape. It should feel contemplative and scholarly yet modern and accessible, blending the gravitas of museum exhibits with the interactivity of modern data visualization. A minimal, content-focused interface where the timeline itself is the hero element.

## Color Selection

Analogous color scheme spanning warm earth tones to cool blues, representing the journey from ancient to modern times with warmth fading to cooler contemporary tones.

- **Primary Color**: Deep archaeological terracotta oklch(0.45 0.12 35) - represents ancient civilizations and serves as the foundation color for major culture groups
- **Secondary Colors**: Aged papyrus oklch(0.88 0.03 75) for backgrounds and Mediterranean blue oklch(0.55 0.10 240) for secondary branches - supporting the temporal progression narrative
- **Accent Color**: Warm gold oklch(0.70 0.15 70) for interactive elements, selected nodes, and highlighting cultural golden ages
- **Foreground/Background Pairings**:
  - Background (Soft cream oklch(0.98 0.01 85)): Dark gray text oklch(0.25 0 0) - Ratio 14.2:1 ✓
  - Card (White oklch(1 0 0)): Dark gray text oklch(0.25 0 0) - Ratio 16.4:1 ✓
  - Primary (Terracotta oklch(0.45 0.12 35)): White text oklch(1 0 0) - Ratio 7.8:1 ✓
  - Secondary (Papyrus oklch(0.88 0.03 75)): Dark text oklch(0.25 0 0) - Ratio 13.5:1 ✓
  - Accent (Gold oklch(0.70 0.15 70)): Dark text oklch(0.25 0 0) - Ratio 8.9:1 ✓
  - Muted (Light beige oklch(0.94 0.02 80)): Medium gray oklch(0.50 0 0) - Ratio 6.2:1 ✓

## Font Selection

Typography should balance historical gravitas with modern readability - a classic serif for headings that echoes historical documents, paired with a clean sans-serif for body text ensuring excellent legibility at all scales.

- **Typographic Hierarchy**:
  - H1 (Page Title): Playfair Display Bold/36px/tight tracking for elegant historical feel
  - H2 (Civilization Names): Playfair Display Semibold/20px/normal tracking for node labels
  - H3 (Period Labels): Inter Semibold/14px/wide tracking (uppercase) for temporal markers
  - Body (Detail Cards): Inter Regular/15px/1.6 line-height for optimal reading
  - Caption (Dates/Metadata): Inter Medium/12px/1.4 line-height in muted color

## Animations

Animations should feel like gentle, purposeful movements through historical space - smooth and considered rather than snappy or playful, evoking the patient unfolding of time.

- **Purposeful Meaning**: Motion communicates temporal flow and cultural connection; branches should appear to grow organically, cards should emerge gracefully
- **Hierarchy of Movement**: 
  - Primary: Pan/zoom transitions (300ms ease-out) for spatial navigation
  - Secondary: Node selection highlighting (200ms ease-in-out) with subtle glow
  - Tertiary: Detail card entrance (250ms ease with slight scale) from the selected node
  - Ambient: Subtle hover states (150ms) on interactive elements

## Component Selection

- **Components**: 
  - Card (for detail overlays with shadow and rounded corners)
  - Button (for zoom controls and period navigation with ghost variant)
  - ScrollArea (for detail card content overflow)
  - Badge (for time period indicators and cultural tags with outline variant)
  - Separator (for dividing sections within detail cards)
  - Tooltip (for truncated labels and quick info on hover)
  
- **Customizations**: 
  - Custom SVG-based timeline canvas component for the branching visualization
  - Custom node component with animated selection states
  - Custom connection lines with gradient fills indicating cultural flow
  
- **States**: 
  - Nodes: default (muted), hover (accent border glow), selected (accent fill with scale 1.1)
  - Buttons: ghost variant with minimal borders, hover lifts slightly
  - Cards: enter with scale from 0.95 to 1.0, exit with fade
  
- **Icon Selection**: 
  - MagnifyingGlassPlus/Minus (zoom controls)
  - ArrowsOut (reset zoom)
  - X (close detail cards)
  - Info (help/about trigger)
  - Clock (time period indicator)
  
- **Spacing**: 
  - Container padding: p-6 (24px) on desktop, p-4 (16px) mobile
  - Card padding: p-6 with gap-4 between sections
  - Node spacing: minimum 60px vertical gap, 100px horizontal per era
  - Section gaps: gap-8 for major sections, gap-4 for related content
  
- **Mobile**: 
  - Timeline canvas fills viewport with touch pan/pinch-zoom
  - Detail cards slide up from bottom (drawer style) instead of popover
  - Zoom controls positioned bottom-right as floating action buttons
  - Period navigation becomes horizontal scroll chips at top
  - Single column layout with stacked controls, mobile-first gesture support
