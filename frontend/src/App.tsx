import React, { useState, useEffect, useCallback } from 'react';
import { fetchData, ApiError } from './api';
import { ComputedSection, Entry, Section } from './types';
import { computeSum, formatCurrency, addItemToSection, removeItemFromSection, createNewEntry, createNewSection } from './utils';
import { SectionComponent } from './components/SectionComponent';
import { MobileNavigationWrapper } from './components/MobileNavigationWrapper';
import ThemeToggle from './components/ThemeToggle';
import './index.css';

export default function App() {
    const [data, setData] = useState<ComputedSection | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isMobile, setIsMobile] = useState(false);
    const [isDarkTheme, setIsDarkTheme] = useState(() => {
        // Check localStorage first, then system preference
        const savedTheme = localStorage.getItem('theme-preference');
        if (savedTheme) {
            return savedTheme === 'dark';
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    const loadData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetchData();
            setData(response.data);
        } catch (err) {
            if (err instanceof ApiError) {
                setError(err.message);
            } else {
                setError('An unexpected error occurred');
            }
            console.error('Error loading data:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadData();
    }, [loadData]);

    // Theme management - set theme attribute and save to localStorage
    useEffect(() => {
        const html = document.documentElement;
        if (isDarkTheme) {
            html.setAttribute('data-theme', 'dark');
        } else {
            html.setAttribute('data-theme', 'light');
        }
        localStorage.setItem('theme-preference', isDarkTheme ? 'dark' : 'light');
    }, [isDarkTheme]);

    const toggleTheme = useCallback(() => {
        setIsDarkTheme(prev => !prev);
    }, []);

    // Mobile detection
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const updateEntryAtPath = useCallback((
        section: ComputedSection, 
        path: number[], 
        updatedEntry: Entry
    ): ComputedSection => {
        if (path.length === 0) {
            return section;
        }

        const [currentIndex, ...remainingPath] = path;
        const newChildren = [...section.children];
        
        if (remainingPath.length === 0) {
            // Direct child update
            newChildren[currentIndex] = updatedEntry;
        } else {
            // Recursive update
            const child = newChildren[currentIndex] as ComputedSection;
            newChildren[currentIndex] = updateEntryAtPath(child, remainingPath, updatedEntry);
        }

        // Recompute the section with new children
        return computeSum({
            name: section.name,
            children: newChildren
        });
    }, []);

    const handleEntryChange = useCallback((path: number[], updatedEntry: Entry) => {
        if (!data) return;

        const updatedData = updateEntryAtPath(data, path, updatedEntry);
        setData(updatedData);
    }, [data, updateEntryAtPath]);

    const handleEntryNameChange = useCallback((path: number[], newName: string) => {
        if (!data) return;

        // Get the current entry at this path
        let current: any = data;
        for (let i = 0; i < path.length - 1; i++) {
            current = current.children[path[i]];
        }
        const entry = current.children[path[path.length - 1]] as Entry;
        
        const updatedEntry = { ...entry, name: newName };
        const updatedData = updateEntryAtPath(data, path, updatedEntry);
        setData(updatedData);
    }, [data, updateEntryAtPath]);

    const addItemAtPath = useCallback((
        section: ComputedSection,
        path: number[],
        item: Entry | Section,
        index?: number
    ): ComputedSection => {
        if (path.length === 0) {
            // Add to this section
            return addItemToSection(section, item, index);
        }

        const [currentIndex, ...remainingPath] = path;
        const newChildren = [...section.children];
        const child = newChildren[currentIndex] as ComputedSection;
        newChildren[currentIndex] = addItemAtPath(child, remainingPath, item, index);

        return computeSum({
            name: section.name,
            children: newChildren
        });
    }, []);

    const removeItemAtPath = useCallback((
        section: ComputedSection,
        path: number[]
    ): ComputedSection => {
        if (path.length === 1) {
            // Remove from this section
            return removeItemFromSection(section, path[0]);
        }

        const [currentIndex, ...remainingPath] = path;
        const newChildren = [...section.children];
        const child = newChildren[currentIndex] as ComputedSection;
        newChildren[currentIndex] = removeItemAtPath(child, remainingPath);

        return computeSum({
            name: section.name,
            children: newChildren
        });
    }, []);

    const handleAddEntry = useCallback((path: number[], index?: number) => {
        if (!data) return;
        
        const newEntry = createNewEntry();
        const updatedData = addItemAtPath(data, path, newEntry, index);
        setData(updatedData);
    }, [data, addItemAtPath]);

    const handleAddSection = useCallback((path: number[], index?: number) => {
        if (!data) return;
        
        const newSection = createNewSection();
        const updatedData = addItemAtPath(data, path, newSection, index);
        setData(updatedData);
    }, [data, addItemAtPath]);

    const handleRemoveItem = useCallback((path: number[]) => {
        if (!data) return;
        
        const updatedData = removeItemAtPath(data, path);
        setData(updatedData);
    }, [data, removeItemAtPath]);

    if (loading) {
        return (
            <div className="app">
                <div className="container">
                    <div className="loading">Loading financial data...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="app">
                <div className="container">
                    <div className="error">
                        <strong>Error:</strong> {error}
                        <br />
                        <button 
                            onClick={loadData}
                            style={{ marginTop: '1rem', padding: '0.5rem 1rem', cursor: 'pointer' }}
                        >
                            Retry
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="app">
                <div className="container">
                    <div className="loading">No data available</div>
                </div>
            </div>
        );
    }

    return (
        <div className="app">
            <div className="container">
                <header className="header">
                    <div className="header-content">
                        <div className="header-text">
                            <h1>Financial Report Dashboard</h1>
                            <p>Interactive financial reporting with real-time calculations</p>
                        </div>
                        <ThemeToggle isDark={isDarkTheme} onToggle={toggleTheme} />
                    </div>
                </header>

                <div className="total-sum">
                    Total Sum: {formatCurrency(data.computedSum)}
                </div>

                {isMobile ? (
                    <MobileNavigationWrapper
                        rootSection={data}
                        onEntryChange={handleEntryChange}
                        onEntryNameChange={handleEntryNameChange}
                        onAddEntry={handleAddEntry}
                        onAddSection={handleAddSection}
                        onRemoveItem={handleRemoveItem}
                    />
                ) : (
                    <div className="tree">
                        <SectionComponent
                            section={data}
                            onEntryChange={handleEntryChange}
                            onEntryNameChange={handleEntryNameChange}
                            onAddEntry={handleAddEntry}
                            onAddSection={handleAddSection}
                            onRemoveItem={handleRemoveItem}
                        />
                    </div>
                )}
            </div>
        </div>
    );
} 