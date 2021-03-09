import { ActionType } from "../action-types";
import {
    MoveCellAction,
    UpdateCellAction,
    DeleteCellAction,
    InsertAfterCellAction,
    Action,
} from "../action";
import { cellTypes, cellDirection} from "../cell";

export const updateCell = (id: string, content: string): UpdateCellAction => {
    return {
        type: ActionType.UPDATE_CELL,
        payload: {
            id,
            content,
        },
    };
};

export const deleteCell = (id: string): DeleteCellAction => {
    return {
        type: ActionType.DELETE_CELL,
        payload: id,
    };
};

export const insertCellAfter = (
    id: string | null,
    cellType: cellTypes
): InsertAfterCellAction => {
    return {
        type: ActionType.INSERT_CELL_AFTER,
        payload: {
            id,
            type:cellType,
        },
    };
};

export const moveCell = (
    id: string,
    direction: cellDirection
): MoveCellAction => {
    return {
        type: ActionType.MOVE_CELL,
        payload: {
            id,
            direction,
        },
    };
};
