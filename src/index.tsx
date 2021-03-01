import ReactDOM from "react-dom";
import { useState, useEffect, useRef } from "react";
import * as esbuild from "esbuild-wasm";

const App = () => {
    const [input, setInput] = useState("");
    const [code, setCode] = useState("");

    const ref = useRef<any>();

    const startService = async () => {
        ref.current = await esbuild.startService({
            worker: true,
            wasmURL: "/esbuild.wasm",
        });
    };

    useEffect(() => {
        startService();
    }, []);

    const onClickHandler =  async() => {
        if (!ref.current) {
            return;
        }

        // console.log(ref.current)
        const result = await ref.current.transform(input,{
            loader: 'jsx',
            target: 'es2015'
        })
        console.log("🚀 ~ file: index.tsx ~ line 32 ~ onClickHandler ~ result", result)

        setCode(result.code);
    };

    return (
        <div>
            <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
            ></textarea>
            <div>
                <button type="submit" onClick={onClickHandler}>
                    submit
                </button>
            </div>
            <pre>{code}</pre>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
