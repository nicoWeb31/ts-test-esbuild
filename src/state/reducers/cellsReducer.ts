import { ActionType } from "../action-types";
import { Action } from "../action";
import { Cell } from "../cell";

interface CellState {
    loading: boolean;
    error: string | null;
    order: [];
    data: {
        [key: string]: Cell;
    };
}

const initialState: CellState = {
    loading: false,
    error: null,
    order: [],
    data: {},
};

const cellsReducer = (
    state: CellState = initialState,
    action: Action
): CellState => {
    switch (action.type) {
        case ActionType.DELETE_CELL:
            return {};

        case ActionType.UPDATE_CELL:
            const { id, content } = action.payload;
            return {
                ...state,
                data: {
                    ...state.data,
                    [id]: {
                        ...state.data[id],
                        content: content,
                    }
                },
            };

        case ActionType.MOVE_CELL:
            return {};

        case ActionType.INSERT_CELL_BEFORE:
            return {};

        default:
            return state;
    }
};

export default cellsReducer;
