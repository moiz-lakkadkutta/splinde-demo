import React, { useState, useCallback, useEffect } from 'react';
import { ChevronLeft, Home, ChevronRight, Plus, X } from 'lucide-react';
import { Entry, ComputedSection, Section } from '../types';
import { isEntry, formatCurrency, createNewEntry, createNewSection } from '../utils';
import { EntryComponent } from './EntryComponent';

interface MobileNavigationWrapperProps {
    rootSection: ComputedSection;
    onEntryChange: (path: number[], entry: Entry) => void;
    onEntryNameChange?: (path: number[], newName: string) => void;
    onAddEntry?: (path: number[], index?: number) => void;
    onAddSection?: (path: number[], index?: number) => void;
    onRemoveItem?: (path: number[]) => void;
}

interface NavigationLevel {
    section: ComputedSection;
    path: number[];
    title: string;
}

export const MobileNavigationWrapper: React.FC<MobileNavigationWrapperProps> = ({
    rootSection,
    onEntryChange,
    onEntryNameChange,
    onAddEntry,
    onAddSection,
    onRemoveItem
}) => {
    const [navigationStack, setNavigationStack] = useState<NavigationLevel[]>([
        { section: rootSection, path: [], title: rootSection.name }
    ]);

    const currentLevel = navigationStack[navigationStack.length - 1];

    // Update root section when data changes
    useEffect(() => {
        setNavigationStack(prev => [
            { section: rootSection, path: [], title: rootSection.name },
            ...prev.slice(1).map(level => ({
                ...level,
                section: getNestedSection(rootSection, level.path) || level.section
            }))
        ]);
    }, [rootSection]);

    const getNestedSection = useCallback((section: ComputedSection, path: number[]): ComputedSection | null => {
        let current = section;
        for (const index of path) {
            const child = current.children[index];
            if (!child || isEntry(child)) return null;
            current = child as ComputedSection;
        }
        return current;
    }, []);

    const handleDrillIn = useCallback((section: ComputedSection, childIndex: number) => {
        const newPath = [...currentLevel.path, childIndex];
        setNavigationStack(prev => [...prev, {
            section,
            path: newPath,
            title: section.name
        }]);
    }, [currentLevel.path]);

    const handleBackNavigation = useCallback(() => {
        setNavigationStack(prev => prev.slice(0, -1));
    }, []);

    const handleHomeNavigation = useCallback(() => {
        setNavigationStack([{ section: rootSection, path: [], title: rootSection.name }]);
    }, [rootSection]);

    const handleEntryChangeAtCurrentLevel = useCallback((localPath: number[], updatedEntry: Entry) => {
        const fullPath = [...currentLevel.path, ...localPath];
        onEntryChange(fullPath, updatedEntry);
    }, [currentLevel.path, onEntryChange]);

    const handleEntryNameChangeAtCurrentLevel = useCallback((localPath: number[], newName: string) => {
        const fullPath = [...currentLevel.path, ...localPath];
        onEntryNameChange?.(fullPath, newName);
    }, [currentLevel.path, onEntryNameChange]);

    const handleAddEntryAtCurrentLevel = useCallback(() => {
        onAddEntry?.(currentLevel.path);
    }, [currentLevel.path, onAddEntry]);

    const handleAddSectionAtCurrentLevel = useCallback(() => {
        onAddSection?.(currentLevel.path);
    }, [currentLevel.path, onAddSection]);

    const handleRemoveItemAtCurrentLevel = useCallback((index: number) => {
        const fullPath = [...currentLevel.path, index];
        onRemoveItem?.(fullPath);
    }, [currentLevel.path, onRemoveItem]);

    const canGoBack = navigationStack.length > 1;
    const canGoHome = navigationStack.length > 2;

    return (
        <div className="mobile-navigation">
            {/* Navigation Header */}
            <div className="mobile-nav-header">
                <div className="mobile-nav-controls">
                    {canGoBack && (
                        <button 
                            className="mobile-nav-button mobile-nav-back"
                            onClick={handleBackNavigation}
                            aria-label="Go back"
                        >
                            <ChevronLeft className="mobile-nav-icon" />
                            <span>Back</span>
                        </button>
                    )}
                    {canGoHome && (
                        <button 
                            className="mobile-nav-button mobile-nav-home"
                            onClick={handleHomeNavigation}
                            aria-label="Go to root"
                        >
                            <Home className="mobile-nav-icon" />
                        </button>
                    )}
                </div>
                <h2 className="mobile-nav-title">{currentLevel.title}</h2>
                <div className="mobile-nav-sum">
                    {formatCurrency(currentLevel.section.computedSum)}
                </div>
            </div>

            {/* Add Buttons */}
            {(onAddEntry || onAddSection) && (
                <div className="mobile-add-buttons">
                    {onAddEntry && (
                        <button 
                            className="mobile-add-button add-entry"
                            onClick={handleAddEntryAtCurrentLevel}
                        >
                            <Plus size={16} />
                            Add Entry
                        </button>
                    )}
                    {onAddSection && (
                        <button 
                            className="mobile-add-button add-section"
                            onClick={handleAddSectionAtCurrentLevel}
                        >
                            <Plus size={16} />
                            Add Section
                        </button>
                    )}
                </div>
            )}

            {/* Current Level Content */}
            <div className="mobile-nav-content">
                {currentLevel.section.children.map((child, index) => {
                    if (isEntry(child)) {
                        return (
                            <div key={`entry-${index}`} className="mobile-entry-container">
                                <EntryComponent
                                    entry={child}
                                    onSumChange={(newSum) => handleEntryChangeAtCurrentLevel([index], { ...child, sum: newSum })}
                                    onNoteChange={(newNote) => handleEntryChangeAtCurrentLevel([index], { ...child, note: newNote })}
                                    onNameChange={onEntryNameChange ? (newName) => handleEntryNameChangeAtCurrentLevel([index], newName) : undefined}
                                />
                                {onRemoveItem && (
                                    <button 
                                        className="mobile-remove-button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleRemoveItemAtCurrentLevel(index);
                                        }}
                                    >
                                        <X size={16} />
                                    </button>
                                )}
                            </div>
                        );
                    } else {
                        const section = child as ComputedSection;
                        return (
                            <div key={`section-${index}`} className="mobile-section-container">
                                <div 
                                    className="mobile-section-item"
                                    onClick={() => handleDrillIn(section, index)}
                                >
                                    <div className="mobile-section-content">
                                        <div className="mobile-section-info">
                                            <h3 className="mobile-section-name">{section.name}</h3>
                                            <div className="mobile-section-meta">
                                                {section.children.length} item{section.children.length !== 1 ? 's' : ''}
                                            </div>
                                        </div>
                                        <div className="mobile-section-right">
                                            <div className="mobile-section-sum">
                                                {formatCurrency(section.computedSum)}
                                            </div>
                                            <ChevronRight className="mobile-section-chevron" />
                                        </div>
                                    </div>
                                </div>
                                {onRemoveItem && (
                                    <button 
                                        className="mobile-remove-button mobile-section-remove"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleRemoveItemAtCurrentLevel(index);
                                        }}
                                    >
                                        <X size={16} />
                                    </button>
                                )}
                            </div>
                        );
                    }
                })}
            </div>
        </div>
    );
}; 