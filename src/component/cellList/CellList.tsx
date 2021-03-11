import React from "react";
import { useTypedSelector } from "../../hooks/use-typed-selector";
import CellItem from "../CellItem";
import AddCell from "../addCell/add-cell";
import './cell-list.style.css'

const CellList: React.FC = () => {
    const cells = useTypedSelector(({ cells: { order, data } }) => {
        return order.map((id) => data[id]);
    });

    const renderedCells = cells.map((cell) => {
        return (
            <React.Fragment key={cell.id}>
                <CellItem cell={cell} />
                <AddCell previouscellId={cell.id} />
            </React.Fragment>
        );
    });

    return (
        <div className="cell-list">
            <AddCell previouscellId={null} forcevisible={cells.length === 0} />
            {renderedCells}
        </div>
    );
};

export default CellList;
