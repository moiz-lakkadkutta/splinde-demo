import React, { useState, useCallback, useMemo } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { Entry, ComputedSection } from '../types';
import { isEntry, formatCurrency } from '../utils';
import { EntryComponent } from './EntryComponent';

interface SectionComponentProps {
    section: ComputedSection;
    onEntryChange: (path: number[], entry: Entry) => void;
    onEntryNameChange?: (path: number[], newName: string) => void;
    onAddEntry?: (path: number[], index?: number) => void;
    onAddSection?: (path: number[], index?: number) => void;
    onRemoveItem?: (path: number[]) => void;
    level?: number;
    isMobile?: boolean;
    onMobileDrillIn?: (section: ComputedSection, path: number[]) => void;
    currentMobilePath?: number[];
}

export const SectionComponent: React.FC<SectionComponentProps> = ({ 
    section, 
    onEntryChange,
    onEntryNameChange,
    onAddEntry,
    onAddSection,
    onRemoveItem,
    level = 0 
}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpanded = useCallback(() => {
        setIsExpanded(prev => !prev);
    }, []);

    const handleEntryChange = useCallback((index: number, updatedEntry: Entry) => {
        onEntryChange([index], updatedEntry);
    }, [onEntryChange]);

    const handleNestedEntryChange = useCallback((childIndex: number) => {
        return (path: number[], updatedEntry: Entry) => {
            onEntryChange([childIndex, ...path], updatedEntry);
        };
    }, [onEntryChange]);

    const handleNestedEntryNameChange = useCallback((childIndex: number) => {
        return (path: number[], newName: string) => {
            onEntryNameChange?.([childIndex, ...path], newName);
        };
    }, [onEntryNameChange]);

    const handleNestedAddEntry = useCallback((childIndex: number) => {
        return (path: number[], index?: number) => {
            onAddEntry?.([childIndex, ...path], index);
        };
    }, [onAddEntry]);

    const handleNestedAddSection = useCallback((childIndex: number) => {
        return (path: number[], index?: number) => {
            onAddSection?.([childIndex, ...path], index);
        };
    }, [onAddSection]);

    const handleNestedRemoveItem = useCallback((childIndex: number) => {
        return (path: number[]) => {
            onRemoveItem?.([childIndex, ...path]);
        };
    }, [onRemoveItem]);

    const renderChild = useCallback((child: Entry | ComputedSection, index: number) => {
        if (isEntry(child)) {
            return (
                <div key={`entry-${index}`} className="entry-container">
                    <EntryComponent
                        entry={child}
                        onSumChange={(newSum) => handleEntryChange(index, { ...child, sum: newSum })}
                        onNoteChange={(newNote) => handleEntryChange(index, { ...child, note: newNote })}
                        onNameChange={onEntryNameChange ? (newName) => onEntryNameChange([index], newName) : undefined}
                    />
                    {onRemoveItem && (
                        <button 
                            className="remove-button"
                            onClick={() => onRemoveItem([index])}
                            title="Remove entry"
                        >
                            ×
                        </button>
                    )}
                </div>
            );
        } else {
            return (
                <div key={`section-${index}`} className="section-container">
                    <SectionComponent
                        section={child}
                        onEntryChange={handleNestedEntryChange(index)}
                        onEntryNameChange={handleNestedEntryNameChange(index)}
                        onAddEntry={handleNestedAddEntry(index)}
                        onAddSection={handleNestedAddSection(index)}
                        onRemoveItem={handleNestedRemoveItem(index)}
                        level={level + 1}
                    />
                    {onRemoveItem && (
                        <button 
                            className="remove-button section-remove"
                            onClick={() => onRemoveItem([index])}
                            title="Remove section"
                        >
                            ×
                        </button>
                    )}
                </div>
            );
        }
    }, [handleEntryChange, handleNestedEntryChange, handleNestedEntryNameChange, handleNestedAddEntry, handleNestedAddSection, handleNestedRemoveItem, level, onRemoveItem, onEntryNameChange]);

    return (
        <div className="section">
            <div className="section-header" onClick={toggleExpanded}>
                <div className="section-title">
                    <button className="collapse-button">
                        <ChevronRight 
                            className={`chevron ${isExpanded ? 'expanded' : ''}`} 
                        />
                    </button>
                    {section.name}
                </div>
                <div className="section-sum">
                    {formatCurrency(section.computedSum)}
                </div>
            </div>
            {isExpanded && (
                <div className="section-content">
                    {(onAddEntry || onAddSection) && (
                        <div className="add-buttons">
                            {onAddEntry && (
                                <button 
                                    className="add-button add-entry"
                                    onClick={() => onAddEntry([])}
                                    title="Add entry"
                                >
                                    + Add Entry
                                </button>
                            )}
                            {onAddSection && (
                                <button 
                                    className="add-button add-section"
                                    onClick={() => onAddSection([])}
                                    title="Add section"
                                >
                                    + Add Section
                                </button>
                            )}
                        </div>
                    )}
                    <div className="section-children">
                        {section.children.map(renderChild)}
                    </div>
                </div>
            )}
        </div>
    );
}; 