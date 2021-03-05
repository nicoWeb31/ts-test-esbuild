import { ActionType } from "../action-types";
import { Action } from "../action";
import { Cell } from "../cell";
import produce from "immer";

interface CellState {
    loading: boolean;
    error: string | null;
    order: string[];
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

const cellsReducer = produce(
    (state: CellState = initialState, action: Action) => {
        switch (action.type) {
            case ActionType.DELETE_CELL:
                delete state.data[action.payload];
                // @ts-ignore
                state.order = state.order.filter((id) => id !== action.payload);

                return state;

            case ActionType.UPDATE_CELL:
                const { id, content } = action.payload;
                // return {
                //     ...state,
                //     data: {
                //         ...state.data,
                //         [id]: {
                //             ...state.data[id],
                //             content: content,
                //         }
                //     },
                // };
                state.data[id].content = content;
                return state;

            case ActionType.MOVE_CELL:
                const { direction } = action.payload;
                const index = state.order.findIndex(
                    (id) => id === action.payload.id
                );
                const targetIndex = direction === "up" ? index - 1 : index + 1;
                if (targetIndex < 0 || targetIndex > state.order.length - 1) {
                    return state;
                }

                state.order[index] = state.order[targetIndex];
                state.order[targetIndex] = action.payload.id;

                return state;

            case ActionType.INSERT_CELL_BEFORE:
                const cell: Cell = {
                    content: "",
                    type: action.payload.type,
                    id: ramdomId(),
                };

                state.data[cell.id] = cell;
                const foundId = state.order.findIndex(id => id === action.payload.id);
                if(foundId < 0 ) {
                    state.order.push(cell.id);
                }else{
                    state.order.splice(foundId,0,cell.id)
                }
                return state;

            default:
                return state;
        }
    }
);

const ramdomId = () => {
    return Math.random().toString(36).substr(2, 5);
};

export default cellsReducer;
