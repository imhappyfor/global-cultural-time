import { useEffect, useRef, useState } from 'react';
import { Civilization, timePeriods } from '@/lib/timelineData';

interface TimelineCanvasProps {
  civilizations: Civilization[];
  onCivilizationClick: (civ: Civilization) => void;
  selectedId?: string;
  externalZoom?: number;
}

interface LayoutNode {
  civ: Civilization;
  x: number;
  y: number;
  row: number;
}

export function TimelineCanvas({ civilizations, onCivilizationClick, selectedId, externalZoom }: TimelineCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [layoutNodes, setLayoutNodes] = useState<LayoutNode[]>([]);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const minYear = -4000;
  const maxYear = 2100;
  const yearRange = maxYear - minYear;
  const baseWidth = 4000;
  const rowHeight = 120;
  const nodeWidth = 180;
  const nodeHeight = 50;

  const yearToX = (year: number) => {
    return ((year - minYear) / yearRange) * baseWidth;
  };

  useEffect(() => {
    if (externalZoom !== undefined) {
      setScale(externalZoom);
    }
  }, [externalZoom]);

  useEffect(() => {
    const nodes: LayoutNode[] = [];
    const rowAssignments = new Map<string, number>();
    const rowOccupancy: Array<Array<{ start: number; end: number }>> = [];

    const findAvailableRow = (startX: number, endX: number, parentRow?: number): number => {
      const startRow = parentRow !== undefined ? parentRow : 0;
      
      for (let row = startRow; row < 50; row++) {
        if (!rowOccupancy[row]) {
          rowOccupancy[row] = [];
        }
        
        const hasOverlap = rowOccupancy[row].some(
          occupied => !(endX < occupied.start - 40 || startX > occupied.end + 40)
        );
        
        if (!hasOverlap) {
          return row;
        }
      }
      return startRow;
    };

    const sortedCivs = [...civilizations].sort((a, b) => a.startYear - b.startYear);

    sortedCivs.forEach(civ => {
      const startX = yearToX(civ.startYear);
      const endX = yearToX(civ.endYear || maxYear);
      
      let parentRow: number | undefined;
      if (civ.parentId) {
        parentRow = rowAssignments.get(civ.parentId);
        if (parentRow !== undefined) {
          parentRow += 1;
        }
      }
      
      const row = findAvailableRow(startX, endX, parentRow);
      rowAssignments.set(civ.id, row);
      
      if (!rowOccupancy[row]) {
        rowOccupancy[row] = [];
      }
      rowOccupancy[row].push({ start: startX, end: endX });
      
      nodes.push({
        civ,
        x: startX + (endX - startX) / 2,
        y: row * rowHeight + 200,
        row
      });
    });

    setLayoutNodes(nodes);

    if (containerRef.current && nodes.length > 0) {
      const container = containerRef.current;
      const maxY = Math.max(...nodes.map(n => n.y)) + 100;
      const viewHeight = container.clientHeight;
      const initialOffsetY = -(maxY / 2 - viewHeight / 2);
      setOffset({ x: 100, y: initialOffsetY });
    }
  }, [civilizations]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = container.clientWidth * dpr;
    canvas.height = container.clientHeight * dpr;
    canvas.style.width = `${container.clientWidth}px`;
    canvas.style.height = `${container.clientHeight}px`;
    ctx.scale(dpr, dpr);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.translate(offset.x, offset.y);
      ctx.scale(scale, scale);

      timePeriods.forEach(period => {
        const x = yearToX(period.startYear);
        const width = yearToX(period.endYear) - x;
        
        ctx.fillStyle = period.color.replace(')', ' / 0.05)');
        ctx.fillRect(x, 0, width, 3000);
        
        ctx.fillStyle = 'oklch(0.50 0 0 / 0.4)';
        ctx.font = '600 11px Inter';
        ctx.letterSpacing = '0.1em';
        ctx.fillText(period.name, x + 10, 30);
      });

      layoutNodes.forEach(node => {
        if (node.civ.parentId) {
          const parent = layoutNodes.find(n => n.civ.id === node.civ.parentId);
          if (parent) {
            const parentEndX = yearToX(parent.civ.endYear || maxYear);
            const childStartX = yearToX(node.civ.startYear);
            const controlPointX = (parentEndX + childStartX) / 2;
            
            ctx.beginPath();
            ctx.moveTo(parentEndX, parent.y);
            ctx.bezierCurveTo(
              controlPointX, parent.y,
              controlPointX, node.y,
              childStartX, node.y
            );
            ctx.strokeStyle = node.civ.color.replace(')', ' / 0.3)');
            ctx.lineWidth = 2;
            ctx.stroke();
          }
        }
      });

      layoutNodes.forEach(node => {
        const startX = yearToX(node.civ.startYear);
        const endX = yearToX(node.civ.endYear || maxYear);
        const width = endX - startX;
        
        const isSelected = node.civ.id === selectedId;
        const isHovered = node.civ.id === hoveredNode;
        
        const gradient = ctx.createLinearGradient(startX, 0, endX, 0);
        gradient.addColorStop(0, node.civ.color);
        gradient.addColorStop(1, node.civ.color.replace(/oklch\(([\d.]+)/, 'oklch($1'));
        
        ctx.fillStyle = gradient;
        ctx.globalAlpha = isSelected || isHovered ? 1 : 0.85;
        
        const y = node.y - nodeHeight / 2;
        const rectWidth = Math.max(width, nodeWidth);
        
        ctx.beginPath();
        ctx.roundRect(startX, y, rectWidth, nodeHeight, 8);
        ctx.fill();
        
        if (isSelected) {
          ctx.strokeStyle = 'oklch(0.70 0.15 70)';
          ctx.lineWidth = 3;
          ctx.stroke();
        } else if (isHovered) {
          ctx.strokeStyle = 'oklch(0.70 0.15 70 / 0.5)';
          ctx.lineWidth = 2;
          ctx.stroke();
        }
        
        ctx.globalAlpha = 1;
        ctx.fillStyle = 'white';
        ctx.font = '600 14px Playfair Display';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        const textX = startX + rectWidth / 2;
        const text = node.civ.name;
        const maxWidth = rectWidth - 20;
        
        ctx.save();
        ctx.beginPath();
        ctx.rect(startX + 5, y, rectWidth - 10, nodeHeight);
        ctx.clip();
        ctx.fillText(text, textX, node.y, maxWidth);
        ctx.restore();
        
        ctx.font = '400 10px Inter';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        const startYearStr = node.civ.startYear < 0 ? `${Math.abs(node.civ.startYear)} BCE` : `${node.civ.startYear} CE`;
        const endYearStr = node.civ.endYear 
          ? (node.civ.endYear < 0 ? `${Math.abs(node.civ.endYear)} BCE` : `${node.civ.endYear} CE`)
          : 'Present';
        const dateStr = `${startYearStr} - ${endYearStr}`;
        ctx.fillText(dateStr, textX, node.y + 15, maxWidth);
      });

      ctx.restore();
    };

    draw();
  }, [layoutNodes, offset, scale, selectedId, hoveredNode]);

  const handleMouseDown = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const worldX = (x - offset.x) / scale;
    const worldY = (y - offset.y) / scale;

    const clicked = layoutNodes.find(node => {
      const startX = yearToX(node.civ.startYear);
      const endX = yearToX(node.civ.endYear || maxYear);
      const width = Math.max(endX - startX, nodeWidth);
      const nodeY = node.y - nodeHeight / 2;
      
      return worldX >= startX && worldX <= startX + width &&
             worldY >= nodeY && worldY <= nodeY + nodeHeight;
    });

    if (clicked) {
      onCivilizationClick(clicked.civ);
    } else {
      setIsDragging(true);
      setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const worldX = (x - offset.x) / scale;
    const worldY = (y - offset.y) / scale;

    const hovered = layoutNodes.find(node => {
      const startX = yearToX(node.civ.startYear);
      const endX = yearToX(node.civ.endYear || maxYear);
      const width = Math.max(endX - startX, nodeWidth);
      const nodeY = node.y - nodeHeight / 2;
      
      return worldX >= startX && worldX <= startX + width &&
             worldY >= nodeY && worldY <= nodeY + nodeHeight;
    });

    setHoveredNode(hovered?.civ.id || null);
    canvas.style.cursor = hovered ? 'pointer' : isDragging ? 'grabbing' : 'grab';

    if (isDragging) {
      setOffset({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    const newScale = Math.max(0.3, Math.min(3, scale * delta));
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const worldX = (mouseX - offset.x) / scale;
    const worldY = (mouseY - offset.y) / scale;
    
    setOffset({
      x: mouseX - worldX * newScale,
      y: mouseY - worldY * newScale
    });
    setScale(newScale);
  };

  return (
    <div 
      ref={containerRef}
      className="w-full h-full relative"
    >
      <canvas
        ref={canvasRef}
        className="timeline-canvas w-full h-full"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      />
    </div>
  );
}
