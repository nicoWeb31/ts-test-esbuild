import { useState, useEffect } from "react";
import { bundle } from "../bundler/index";

import CodeEditor from "../component/CodeEditor";
import Resizable from "../component/Resizable";

import Preview from "../component/Preview";

const CodeCell = () => {
    const [input, setInput] = useState("");
    const [code, setCode] = useState("");

    useEffect(() => {
        const timer = setTimeout(async () => {
            const output = await bundle(input);
            setCode(output);
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

                <Preview code={code} />
            </div>
        </Resizable>
    );
};

export default CodeCell;
