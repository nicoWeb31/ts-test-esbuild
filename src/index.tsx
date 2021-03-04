import ReactDOM from "react-dom";
import { useState, useEffect, useRef } from "react";
import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "./plugins/unpkg-path-pluging";
import { fetchPlugin } from "./plugins/fecth-plugin";
import CodeEditor from "./component/CodeEditor";
import "bulmaswatch/superhero/bulmaswatch.min.css";
import Preview from "./component/Preview";


const App = () => {
    const [input, setInput] = useState("");
    const [code, setCode] = useState("");

    const ref = useRef<any>();

    const startService = async () => {
        ref.current = await esbuild.startService({
            worker: true,
            wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm",
        });
    };

    useEffect(() => {
        startService();
    }, []);

    const onClickHandler = async () => {
        if (!ref.current) {
            return;
        }

        const result = await ref.current.build({
            entryPoints: ["index.js"],
            bundle: true,
            write: false,
            plugins: [unpkgPathPlugin(), fetchPlugin(input)],
            define: {
                "process.env.NODE_ENV": '"production"',
                global: "window",
            },
        });

        setCode(result.outputFiles[0].text);
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

ReactDOM.render(<App />, document.getElementById("root"));
