import { useState } from "react";
import { bundler } from "../bundler/index";

import CodeEditor from "../component/CodeEditor";
import Resizable from "../component/Resizable";

import Preview from "../component/Preview";

const CodeCell = () => {
    const [input, setInput] = useState("");
    const [code, setCode] = useState("");

    const onClickHandler = async () => {
        const output = await bundler(input);
        setCode(output);
    };

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
                        initialValue="toto"
                        onChange={(value) => setInput(value)}
                    />
                </Resizable>
                {/* <div>
                    <button type="submit" onClick={onClickHandler}>
                        submit
                    </button>
                </div> */}
                <Preview code={code} />
            </div>
        </Resizable>
    );
};

export default CodeCell;
