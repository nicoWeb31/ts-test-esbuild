import React from "react";
import { useTypedSelector } from "../hooks/use-typed-selector";
import CellItem from "./CellItem";

const CellList: React.FC = () => {
    const cells = useTypedSelector(({ cells: { order, data } }) => {
        return order.map((id) => data[id]);
    });

    const renderedCells = cells.map((cell) => <CellItem key={cell.id} cell={cell}/>);

    return <div>{renderedCells}</div>;
};

export default CellList;
