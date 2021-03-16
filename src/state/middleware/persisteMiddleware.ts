import { Action } from "../action";
import { Dispatch } from "redux";
import { ActionType } from "../../state/action-types";
import { saveCell } from "../action-creators";
import { RootState } from "../reducers";

export const persistMiddlware = ({
    dispatch,
    getState,
}: {
    dispatch: Dispatch<Action>;
    getState: () => RootState;
}) => {
    let timer: any;

    return (next: (action: Action) => void) => {
        return (action: Action) => {
            next(action);

            if (
                [
                    ActionType.MOVE_CELL,
                    ActionType.UPDATE_CELL,
                    ActionType.INSERT_CELL_AFTER,
                    ActionType.DELETE_CELL,
                ].includes(action.type)
            ) {
                if (timer) {
                    clearTimeout(timer);
                }
                timer = setTimeout(() => {
                    saveCell()(dispatch, getState);
                }, 250);
            }
        };
    };
};
