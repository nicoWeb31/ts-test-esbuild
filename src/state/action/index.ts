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

export interface InsertAfterCellAction {
    type: ActionType.INSERT_CELL_AFTER;
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

export interface BundleStartAction {
    type: ActionType.BUNDLE_START,
    payload: {
        cellId: string;
    }
}

export interface BundleCompleteAction {
    type: ActionType.BUNDLE_COMPLETE;
    payload :{
        cellId : string;
        bundle :{
            code: string;
            err: string;
        }
    }
}

export type Action = MoveCellAction | DeleteCellAction | InsertAfterCellAction | UpdateCellAction | BundleCompleteAction | BundleStartAction