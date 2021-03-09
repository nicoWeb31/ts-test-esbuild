import React from "react";
import { useTypedSelector } from "../hooks/use-typed-selector";
import CellItem from "./CellItem";
import AddCell from "./addCell/add-cell";

const CellList: React.FC = () => {
    const cells = useTypedSelector(({ cells: { order, data } }) => {
        return order.map((id) => data[id]);
    });

    const renderedCells = cells.map((cell) => {
        return (
            <React.Fragment key={cell.id}>
                <AddCell nexcellId={cell.id} forcevisible={cells.length === 0}/>
                <CellItem cell={cell} />
            </React.Fragment>
        );
    });

    return (
        <div>
            {renderedCells}

            <AddCell nexcellId={null} forcevisible={cells.length === 0} />
        </div>
    );
};

export default CellList;
