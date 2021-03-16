import { ActionType } from "../action-types";
import { cellTypes, cellDirection, Cell } from "../cell";

export interface MoveCellAction {
    type: ActionType.MOVE_CELL;
    payload: {
        id: string;
        direction: cellDirection;
    };
}

export interface DeleteCellAction {
    type: ActionType.DELETE_CELL;
    payload: string;
}

export interface InsertAfterCellAction {
    type: ActionType.INSERT_CELL_AFTER;
    payload: {
        id: string | null;
        type: cellTypes;
    };
}

export interface UpdateCellAction {
    type: ActionType.UPDATE_CELL;
    payload: {
        id: string;
        content: string;
    };
}

export interface BundleStartAction {
    type: ActionType.BUNDLE_START;
    payload: {
        cellId: string;
    };
}

export interface BundleCompleteAction {
    type: ActionType.BUNDLE_COMPLETE;
    payload: {
        cellId: string;
        bundle: {
            code: string;
            err: string;
        };
    };
}

export interface FetchCellAction {
    type: ActionType.FETCH_CELLS;
}
export interface FetchCellCompleteAction {
    type: ActionType.FETCH_CELLS_COMPLETE;
    payload: Cell[];
}
export interface FetchCellErrorAction {
    type: ActionType.FETCH_CELLS_ERROR;
    payload: string;
}

export interface SaveCellErrorAction {
    type: ActionType.SAVE_CELLS_ERROR;
    payload: string;
}

export type Action =
    | MoveCellAction
    | SaveCellErrorAction
    | DeleteCellAction
    | InsertAfterCellAction
    | UpdateCellAction
    | BundleCompleteAction
    | BundleStartAction
    | FetchCellAction
    | FetchCellCompleteAction
    | FetchCellErrorAction
    | FetchCellErrorAction;
