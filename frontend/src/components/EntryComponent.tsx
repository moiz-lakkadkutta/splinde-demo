import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Entry } from '../types';
import { formatCurrency } from '../utils';

interface EntryComponentProps {
    entry: Entry;
    onSumChange: (newSum: number) => void;
    onNoteChange: (newNote: string) => void;
    onNameChange?: (newName: string) => void;
}

export const EntryComponent: React.FC<EntryComponentProps> = ({ 
    entry, 
    onSumChange, 
    onNoteChange,
    onNameChange 
}) => {
    const [tempSum, setTempSum] = useState(entry.sum.toString());
    const [tempNote, setTempNote] = useState(entry.note);
    const [tempName, setTempName] = useState(entry.name);
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingNote, setIsEditingNote] = useState(false);
    const nameInputRef = useRef<HTMLInputElement>(null);

    // Update internal state when entry changes
    useEffect(() => {
        setTempSum(entry.sum.toString());
        setTempNote(entry.note);
        setTempName(entry.name);
    }, [entry.sum, entry.note, entry.name]);

    const handleSumChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setTempSum(e.target.value);
    }, []);

    const handleSumBlur = useCallback(() => {
        const newSum = parseFloat(tempSum);
        if (!isNaN(newSum) && newSum !== entry.sum) {
            onSumChange(newSum);
        } else {
            setTempSum(entry.sum.toString());
        }
    }, [tempSum, onSumChange, entry.sum]);

    const handleNoteChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTempNote(e.target.value);
    }, []);

    const handleNoteBlur = useCallback(() => {
        if (tempNote !== entry.note) {
            onNoteChange(tempNote);
        }
        setIsEditingNote(false);
    }, [tempNote, onNoteChange, entry.note]);

    const handleNameClick = useCallback(() => {
        if (onNameChange) {
            setIsEditingName(true);
        }
    }, [onNameChange]);

    const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setTempName(e.target.value);
    }, []);

    const handleNameBlur = useCallback(() => {
        const trimmedName = tempName.trim();
        if (trimmedName && trimmedName !== entry.name && onNameChange) {
            onNameChange(trimmedName);
        } else {
            setTempName(entry.name);
        }
        setIsEditingName(false);
    }, [tempName, onNameChange, entry.name]);

    const handleSumKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSumBlur();
            (e.target as HTMLInputElement).blur();
        }
        if (e.key === 'Escape') {
            setTempSum(entry.sum.toString());
            (e.target as HTMLInputElement).blur();
        }
    }, [handleSumBlur, entry.sum]);

    const handleNameKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleNameBlur();
        }
        if (e.key === 'Escape') {
            setTempName(entry.name);
            setIsEditingName(false);
        }
    }, [handleNameBlur, entry.name]);

    const handleNoteKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
            setTempNote(entry.note);
            setIsEditingNote(false);
            (e.target as HTMLTextAreaElement).blur();
        }
    }, [entry.note]);

    const handleNoteFocus = useCallback(() => {
        setIsEditingNote(true);
    }, []);

    // Focus name input when editing starts
    useEffect(() => {
        if (isEditingName && nameInputRef.current) {
            nameInputRef.current.focus();
            nameInputRef.current.select();
        }
    }, [isEditingName]);

    return (
        <div className="entry">
            <div className="entry-header">
                <div className="entry-name-container">
                    {isEditingName ? (
                        <input
                            ref={nameInputRef}
                            type="text"
                            className="name-input"
                            value={tempName}
                            onChange={handleNameChange}
                            onBlur={handleNameBlur}
                            onKeyDown={handleNameKeyDown}
                            placeholder="Entry name"
                        />
                    ) : (
                        <h4 
                            className={`entry-name ${onNameChange ? 'editable' : ''}`}
                            onClick={handleNameClick}
                            title={onNameChange ? 'Click to edit name' : undefined}
                        >
                            {entry.name}
                        </h4>
                    )}
                </div>
                <div className="entry-sum">
                    <span className="currency-symbol">$</span>
                    <input
                        type="number"
                        className="sum-input"
                        value={tempSum}
                        onChange={handleSumChange}
                        onBlur={handleSumBlur}
                        onKeyDown={handleSumKeyDown}
                        step="0.01"
                        min="0"
                        placeholder="0.00"
                    />
                </div>
            </div>
            <div className="entry-note">
                <textarea
                    className={`note-input ${isEditingNote ? 'editing' : ''}`}
                    value={tempNote}
                    onChange={handleNoteChange}
                    onBlur={handleNoteBlur}
                    onFocus={handleNoteFocus}
                    onKeyDown={handleNoteKeyDown}
                    placeholder="Add notes about this entry..."
                    rows={isEditingNote ? 4 : 2}
                />
                {!isEditingNote && !tempNote && (
                    <div className="note-placeholder">
                        Tap to add notes...
                    </div>
                )}
            </div>
        </div>
    );
}; 