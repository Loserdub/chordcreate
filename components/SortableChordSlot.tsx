import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ChordSlot } from './ChordSlot';

interface SortableChordSlotProps {
  slotId: string;
  globalIndex: number;
  selectedChord: string;
  isActive: boolean;
  onSelect: (chord: string) => void;
  onPlay: () => void;
  isPlaying: boolean;
  bpm: number;
}

export const SortableChordSlot: React.FC<SortableChordSlotProps> = (props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: props.slotId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <ChordSlot
      id={props.globalIndex}
      selectedChord={props.selectedChord}
      isActive={props.isActive}
      onSelect={props.onSelect}
      onPlay={props.onPlay}
      isPlaying={props.isPlaying}
      bpm={props.bpm}
      attributes={attributes}
      listeners={listeners}
      setNodeRef={setNodeRef}
      style={style}
      isDragging={isDragging}
    />
  );
};
