import { Civilization } from '@/lib/timelineData';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { X } from '@phosphor-icons/react';
import { motion } from 'framer-motion';

interface CivilizationDetailProps {
  civilization: Civilization;
  onClose: () => void;
}

export function CivilizationDetail({ civilization, onClose }: CivilizationDetailProps) {
  const formatYear = (year: number) => {
    if (year < 0) {
      return `${Math.abs(year)} BCE`;
    }
    return `${year} CE`;
  };

  const duration = civilization.endYear 
    ? civilization.endYear - civilization.startYear
    : new Date().getFullYear() - civilization.startYear;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="absolute top-6 right-6 z-50 w-96 max-h-[calc(100vh-3rem)]"
    >
      <Card className="shadow-2xl border-border">
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h2 className="text-2xl font-semibold mb-2">{civilization.name}</h2>
              <Badge variant="outline" className="text-xs">
                {civilization.region}
              </Badge>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="shrink-0 -mt-2 -mr-2"
            >
              <X size={20} />
            </Button>
          </div>

          <div className="flex gap-2 mb-4 text-sm text-muted-foreground">
            <span>{formatYear(civilization.startYear)}</span>
            <span>→</span>
            <span>{civilization.endYear ? formatYear(civilization.endYear) : 'Present'}</span>
            <span className="ml-auto font-medium">
              {duration.toLocaleString()} years
            </span>
          </div>

          <Separator className="my-4" />

          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2 text-sm uppercase tracking-wide text-muted-foreground">
                  Overview
                </h3>
                <p className="text-sm leading-relaxed">
                  {civilization.description}
                </p>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold mb-3 text-sm uppercase tracking-wide text-muted-foreground">
                  Cultural Highlights
                </h3>
                <ul className="space-y-2">
                  {civilization.culturalHighlights.map((highlight, index) => (
                    <li key={index} className="text-sm flex gap-2">
                      <span className="text-accent shrink-0">•</span>
                      <span className="leading-relaxed">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div 
                className="mt-6 p-4 rounded-lg"
                style={{ 
                  backgroundColor: civilization.color.replace(')', ' / 0.1)'),
                  borderLeft: `4px solid ${civilization.color}`
                }}
              >
                <p className="text-xs text-muted-foreground italic">
                  The cultural legacy of {civilization.name} continues to influence 
                  modern {civilization.region} and beyond, shaping art, philosophy, 
                  governance, and daily life across generations.
                </p>
              </div>
            </div>
          </ScrollArea>
        </div>
      </Card>
    </motion.div>
  );
}
