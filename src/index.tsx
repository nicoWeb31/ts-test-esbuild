import ReactDOM from "react-dom";
import { useState, useEffect, useRef } from "react";
import * as esbuild from "esbuild-wasm";
import {unpkgPathPlugin} from './plugins/unpkg-path-pluging';
import {fetchPlugin} from './plugins/fecth-plugin'

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


        const result = await ref.current.build({ 
            entryPoints: ["index.js"],
            bundle: true,
            write: false,
            plugins: [unpkgPathPlugin(),fetchPlugin(input)],
            define: {
                'process.env.NODE_ENV': '"production"',
                global: 'window'
            }
        }) 
        console.log("🚀 ~ file: index.tsx ~ line 35 ~ onClickHandler ~ result", result)


        setCode(result.outputFiles[0].text);
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
