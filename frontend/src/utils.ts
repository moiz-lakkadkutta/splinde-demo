import { Entry, Section, ComputedSection } from './types';

export function isEntry(item: Entry | Section | ComputedSection): item is Entry {
    return 'sum' in item && 'note' in item && !('computedSum' in item);
}

export function isSection(item: Entry | Section | ComputedSection): item is Section {
    return 'children' in item && !('sum' in item) && !('computedSum' in item);
}

export function isComputedSection(item: Entry | Section | ComputedSection): item is ComputedSection {
    return 'children' in item && 'computedSum' in item;
}

export function computeSum(section: Section): ComputedSection;
export function computeSum(section: ComputedSection): ComputedSection;
export function computeSum(section: Section | ComputedSection): ComputedSection {
    const computedChildren = section.children.map(child => {
        if (isEntry(child)) {
            return child;
        } else if (isSection(child)) {
            return computeSum(child);
        } else {
            return computeSum(child);
        }
    });

    const computedSum = computedChildren.reduce((total, child) => {
        if (isEntry(child)) {
            return total + child.sum;
        } else {
            return total + (child as ComputedSection).computedSum;
        }
    }, 0);

    return {
        name: section.name,
        children: computedChildren,
        computedSum
    };
}

export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

// Utility functions for add/remove operations
export function createNewEntry(name: string = 'New Entry'): Entry {
    return {
        name,
        sum: 0,
        note: ''
    };
}

export function createNewSection(name: string = 'New Section'): Section {
    return {
        name,
        children: []
    };
}

export function addItemToSection(section: ComputedSection, item: Entry | Section, index?: number): ComputedSection {
    const newChildren = [...section.children];
    const itemToAdd = isEntry(item) ? item : computeSum(item);
    
    if (index !== undefined && index >= 0 && index <= newChildren.length) {
        newChildren.splice(index, 0, itemToAdd);
    } else {
        newChildren.push(itemToAdd);
    }
    
    return computeSum({
        name: section.name,
        children: newChildren
    });
}

export function removeItemFromSection(section: ComputedSection, index: number): ComputedSection {
    const newChildren = [...section.children];
    newChildren.splice(index, 1);
    
    return computeSum({
        name: section.name,
        children: newChildren
    });
} 