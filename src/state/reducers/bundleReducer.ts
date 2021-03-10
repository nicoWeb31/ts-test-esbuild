import produce from "immer";
import { ActionType } from "../action-types";
import { Action } from "../action";

interface BundlesState {
    [key: string]: {
        loading: boolean;
        code: string | undefined;
        err: string | undefined;
    };
}

const initialState: BundlesState = {};

const bundleReducer = produce ((
    state: BundlesState = initialState,
    action: Action
): BundlesState => {
    switch (action.type) {
        case ActionType.BUNDLE_START:
            state[action.payload.cellId] = {
                loading: true,
                code: "",
                err: "",
            };
            return state;

        case ActionType.BUNDLE_COMPLETE:
            state[action.payload.cellId] = {
                loading: false,
                code: action.payload.bundle.code,
                err: action.payload.bundle.err,
            };

            return state;
        default:
            return state;
    }
});

export default bundleReducer;
