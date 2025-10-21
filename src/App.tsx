import { useState, useCallback } from 'react';
import { TimelineCanvas } from '@/components/TimelineCanvas';
import { CivilizationDetail } from '@/components/CivilizationDetail';
import { ZoomControls } from '@/components/ZoomControls';
import { civilizations, type Civilization } from '@/lib/timelineData';
import { Toaster } from '@/components/ui/sonner';
import { AnimatePresence } from 'framer-motion';

function App() {
  const [selectedCivilization, setSelectedCivilization] = useState<Civilization | null>(null);
  const [zoom, setZoom] = useState(1);
  const [resetTrigger, setResetTrigger] = useState(0);

  const handleCivilizationClick = useCallback((civ: Civilization) => {
    setSelectedCivilization(civ);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedCivilization(null);
  }, []);

  const handleZoomIn = useCallback(() => {
    setZoom(prev => Math.min(prev * 1.3, 3));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom(prev => Math.max(prev / 1.3, 0.3));
  }, []);

  const handleReset = useCallback(() => {
    setZoom(1);
    setResetTrigger(prev => prev + 1);
  }, []);

  return (
    <div className="w-screen h-screen overflow-hidden bg-background">
      <header className="absolute top-0 left-0 right-0 z-10 p-6 bg-gradient-to-b from-background to-transparent pointer-events-none">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Cultural Timeline
          </h1>
          <p className="text-muted-foreground">
            Journey through the evolution and branching of civilizations across history
          </p>
        </div>
      </header>

      <div className="w-full h-full pt-32">
        <TimelineCanvas
          civilizations={civilizations}
          onCivilizationClick={handleCivilizationClick}
          selectedId={selectedCivilization?.id}
          externalZoom={zoom}
          key={resetTrigger}
        />
      </div>

      <ZoomControls
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onReset={handleReset}
      />

      <AnimatePresence>
        {selectedCivilization && (
          <CivilizationDetail
            civilization={selectedCivilization}
            onClose={handleClose}
          />
        )}
      </AnimatePresence>

      <Toaster />
    </div>
  );
}

export default App;