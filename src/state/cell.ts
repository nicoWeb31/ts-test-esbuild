export type cellTypes = 'code' | 'text';

export type cellDirection = 'up' | 'down';

export interface Cell{
    id: string;
    type: cellTypes;
    content: string;
}
