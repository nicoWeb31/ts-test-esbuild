import { useState } from "react";
import { bundler } from "../bundler/index";

import CodeEditor from "../component/CodeEditor";

import Preview from "../component/Preview";

const CodeCell = () => {
    const [input, setInput] = useState("");
    const [code, setCode] = useState("");

    const onClickHandler = async () => {
        const output = await bundler(input);
        setCode(output);
    };

    return (
        <div>
            <CodeEditor
                initialValue="toto"
                onChange={(value) => setInput(value)}
            />
            {/* <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
            ></textarea> */}
            <div>
                <button type="submit" onClick={onClickHandler}>
                    submit
                </button>
            </div>
            <Preview code={code} />
        </div>
    );
};

export default CodeCell;
