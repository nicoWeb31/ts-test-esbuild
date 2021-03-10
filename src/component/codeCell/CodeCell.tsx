import { useEffect } from "react";
import CodeEditor from "../CodeEditor";
import Preview from "../Preview";
import Resizable from "../Resizable";
import { useAction } from "../../hooks/useAction";
import { Cell } from "../../state/cell";
import { useTypedSelector } from "../../hooks/use-typed-selector";
import "./codeCell.style.css";

interface CodeCellProps {
    cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
    const { updateCell, createBundle } = useAction();
    const bundle = useTypedSelector((state) => state.bundles[cell.id]);
    //
    const cumulativeCode: any = useTypedSelector((state) => {
        const { data, order } = state.cells;
        const orderedCells = order.map((id) => data[id]);

        const cumuCode: any = [];
        for (let c of orderedCells) {
            if (c.type === "code") {
                cumuCode.push(c.content);
            }
            if (c.id === cell.id) {
                break;
            }
        }
        return cumuCode;
    });

    useEffect(() => {
        if (!bundle) {
            createBundle(cell.id, cumulativeCode.join("\n"));
            return;
        }
        const timer = setTimeout(async () => {
            createBundle(cell.id, cumulativeCode.join("\n"));
        }, 750);

        return () => {
            clearTimeout(timer);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cumulativeCode.join("\n"), cell.id]);

    return (
        <Resizable direction="vertical">
            <div
                style={{
                    height: "calc(100% - 10px)",
                    display: "flex",
                    flexDirection: "row",
                }}
            >
                <Resizable direction="horizontal">
                    <CodeEditor
                        initialValue={cell.content}
                        onChange={(value) => updateCell(cell.id, value)}
                    />
                </Resizable>
                <div className="progress-wrapper">
                    {!bundle || bundle.loading ? (
                        <div className="progress-cover">
                            <progress
                                className="progress is-small is-primary"
                                max="100"
                            >
                                Loading
                            </progress>
                        </div>
                    ) : (
                        <Preview code={bundle.code} err={bundle.err} />
                    )}
                </div>
            </div>
        </Resizable>
    );
};

export default CodeCell;
