import { useEffect } from "react";
import CodeEditor from "../component/CodeEditor";
import Preview from "../component/Preview";
import Resizable from "../component/Resizable";
import { useAction } from "../hooks/useAction";
import { Cell } from "../state/cell";
import { useTypedSelector } from '../hooks/use-typed-selector';



interface CodeCellProps {
    cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {

    const { updateCell, createBundle } = useAction();
    const bundle = useTypedSelector((state)=>state.bundles[cell.id])

    useEffect(() => {
        const timer = setTimeout(async () => {
            createBundle(cell.id, cell.content)
        }, 750);

        return () => {
            clearTimeout(timer);
        };
    }, [cell.content, cell.id]);

    return (
        <Resizable direction="vertical">
            <div
                style={{
                    height: "cal(100% - 10px)",
                    display: "flex",
                    flexDirection: "row",
                }}
            >
                <Resizable direction="horizontal">
                    <CodeEditor
                        initialValue={cell.content}
                        onChange={(value: string) => updateCell(cell.id, value)}
                    />
                </Resizable>

                {bundle && <Preview code={bundle.code} err={bundle.err} />}
            </div>
        </Resizable>
    );
};

export default CodeCell;
