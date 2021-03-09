import React from "react";
import { useAction } from "../../hooks/useAction";
import "./add-cell.style.css";

interface AddcellProps {
    nexcellId: string | null;
}

const AddCell: React.FC<AddcellProps> = ({ nexcellId }) => {
    const { insertCellBefore } = useAction();
    return (
        <div className="add-cell">
            <div className="add-btn">
                <button onClick={() => insertCellBefore(nexcellId, "code")}>
                    Code
                </button>
                <button onClick={() => insertCellBefore(nexcellId, "text")}>
                    Text
                </button>
            </div>
            <div className="divider"></div>
        </div>
    );
};

export default AddCell;
