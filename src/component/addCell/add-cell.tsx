import React from "react";
import { useAction } from "../../hooks/useAction";

interface AddcellProps {
    nexcellId: string;
}

const AddCell: React.FC<AddcellProps> = ({ nexcellId }) => {
    const { insertCellBefore } = useAction();
    return (
        <div>
            <button onClick={()=>insertCellBefore(nexcellId, 'code')}>Code</button>
            <button onClick={()=>insertCellBefore(nexcellId, 'text')}>Text</button>

        </div>
    );
};

export default AddCell;
