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

    useEffect(() => {
        if (!bundle) {
            createBundle(cell.id, cell.content);
            return;
        }
        const timer = setTimeout(async () => {
            createBundle(cell.id, cell.content);
        }, 750);

        return () => {
            clearTimeout(timer);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                <div className="progress-wrapper">
                    {!bundle || bundle.loading ? (
                        <div className="progress-cover">
                            <progress
                                className="progress is-smal is-primary"
                                max="100"
                            >
                                Loading...
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
