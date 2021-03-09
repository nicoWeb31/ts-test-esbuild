import React from "react";
import { useAction } from "../../hooks/useAction";
import "./add-cell.style.css";

interface AddcellProps {
    nexcellId: string | null;
    forcevisible?: boolean;
}

const AddCell: React.FC<AddcellProps> = ({ nexcellId, forcevisible }) => {
    const { insertCellAfter } = useAction();
    return (
        <div className={ `${forcevisible ? 'visible' : '' } add-cell` }>
            <div className="add-btn">
                <button
                    className="button is-rounded is-primary is-small"
                    onClick={() => insertCellAfter(nexcellId, "code")}
                >
                    <span className="icon is-small">
                        <i className="fa fa-plus"></i>
                    </span>
                    Code
                </button>
                <button
                    className="button is-rounded is-primary is-small"
                    onClick={() => insertCellAfter(nexcellId, "text")}
                >
                    <span className="icon is-small">
                        <i className="fa fa-plus"></i>
                    </span>
                    Text
                </button>
            </div>
            <div className="divider"></div>
        </div>
    );
};

export default AddCell;
