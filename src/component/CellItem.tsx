import React from "react";
import { Cell } from "../state/cell";
import CodeCell from "./CodeCell";
import TextEditor from "./TextEditor";

interface cellItemsProps {
    cell: Cell;
}

const CellItem: React.FC<cellItemsProps> = ({ cell }) => {
    let child: JSX.Element;
    if (cell.type === "code") {
        child = <CodeCell />;
    } else {
        child = <TextEditor />;
    }

    return <div>{child}</div>;
};

export default CellItem;
