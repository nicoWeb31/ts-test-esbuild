import { ActionType } from "../action-types";
import { cellTypes,cellDirection } from '../cell'


export interface MoveCellAction {
    type: ActionType.MOVE_CELL;
    payload: {
        id: string;
        direction:cellDirection;
    };
}

export interface DeleteCellAction {
    type: ActionType.DELETE_CELL;
    payload: string;
}

export interface InsertBeforeCellAction {
    type: ActionType.INSERT_CELL_BEFORE;
    payload: {
        id:string | null;
        type: cellTypes;

    }
}

export interface UpdateCellAction {
    type: ActionType.UPDATE_CELL;
    payload:{ 
        id: string;
        content: string;
    }
}


export type Action = MoveCellAction | DeleteCellAction | InsertBeforeCellAction | UpdateCellAction