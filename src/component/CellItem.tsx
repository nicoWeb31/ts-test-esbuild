import React from "react";
import { Cell } from "../state/cell";
import ActionBar from "./action-bar";
import CodeCell from "./CodeCell";
import TextEditor from "./TextEditor";
import "./cell-item.css";

interface cellItemsProps {
    cell: Cell;
}

const CellItem: React.FC<cellItemsProps> = ({ cell }) => {
    let child: JSX.Element;
    if (cell.type === "code") {
        child = (
            <>
                <div className="action-bar-wrapper">
                    <ActionBar id={cell.id} />
                </div>
                <CodeCell cell={cell} />
            </>
        );
    } else {
        child = (
            <>
                <ActionBar id={cell.id} />
                <TextEditor cell={cell} />
            </>
        );
    }

    return <div className="cell-item">{child}</div>;
};

export default CellItem;
