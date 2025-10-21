import { Button } from '@/components/ui/button';
import { MagnifyingGlassPlus, MagnifyingGlassMinus, ArrowsOut } from '@phosphor-icons/react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ZoomControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
}

export function ZoomControls({ onZoomIn, onZoomOut, onReset }: ZoomControlsProps) {
  return (
    <TooltipProvider>
      <div className="absolute bottom-6 right-6 z-10 flex flex-col gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={onZoomIn}
              className="bg-card shadow-lg"
            >
              <MagnifyingGlassPlus />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Zoom In</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={onZoomOut}
              className="bg-card shadow-lg"
            >
              <MagnifyingGlassMinus />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Zoom Out</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={onReset}
              className="bg-card shadow-lg"
            >
              <ArrowsOut />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Reset View</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
