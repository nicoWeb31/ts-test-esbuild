import { useState, useEffect } from "react";
import bundle from "../bundler"
import CodeEditor from "../component/CodeEditor";
import Resizable from "../component/Resizable";

import Preview from "../component/Preview";

const CodeCell = () => {
    const [input, setInput] = useState("");
    const [code, setCode] = useState("");
    const [err, setErr] = useState("");

    useEffect(() => {
        const timer = setTimeout(async () => {
            const output = await bundle(input);
            setCode(output.code);
            setErr(output.err);
        }, 750);

        return () => {
            clearTimeout(timer);
        };
    }, [input]);

    return (
        <Resizable direction="vertical">
            <div
                style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "row",
                }}
            >
                <Resizable direction="horizontal">
                    <CodeEditor
                        initialValue="const a = 1"
                        onChange={(value:string) => setInput(value)}
                    />
                </Resizable>

                <Preview code={code} err={err}/>
            </div>
        </Resizable>
    );
};

export default CodeCell;
