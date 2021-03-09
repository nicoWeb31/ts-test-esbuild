import React from "react";
import { Cell } from "../state/cell";
import ActionBar from "./action-bar";
import CodeCell from "./CodeCell";
import TextEditor from "./TextEditor";
import './cell-item.css'


interface cellItemsProps {
    cell: Cell;
}

const CellItem: React.FC<cellItemsProps> = ({ cell }) => {
    let child: JSX.Element;
    if (cell.type === "code") {
        child = <CodeCell cell={cell} />;
    } else {
        child = <TextEditor cell={cell} />;
    }

    return (
        <div className="cell-item">
        <ActionBar id={cell.id}/>

        {child}
        </div>

    )
    
};

export default CellItem;
