import { useState, useEffect } from "react";
import bundle from "../bundler"
import CodeEditor from "../component/CodeEditor";
import Resizable from "../component/Resizable";
import { useAction } from '../hooks/useAction'

import Preview from "../component/Preview";
import { Cell } from "../state/cell";

interface CodeCellProps{
    cell: Cell
}

const CodeCell: React.FC<CodeCellProps> = ({cell}) => {
    // const [input, setInput] = useState("");
    const [code, setCode] = useState("");
    const [err, setErr] = useState("");
    const { updateCell } = useAction(); 

    useEffect(() => {
        const timer = setTimeout(async () => {
            const output = await bundle(cell.content);
            setCode(output.code);
            setErr(output.err);
        }, 750);

        return () => {
            clearTimeout(timer);
        };
    }, [cell.content]);

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
                        onChange={(value:string) => updateCell(cell.id,value)}
                    />
                </Resizable>

                <Preview code={code} err={err}/>
            </div>
        </Resizable>
    );
};

export default CodeCell;
