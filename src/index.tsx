import ReactDOM from "react-dom";
import { useState, useEffect, useRef } from "react";
import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "./plugins/unpkg-path-pluging";
import { fetchPlugin } from "./plugins/fecth-plugin";
import CodeEditor from './component/CodeEditor';

const App = () => {
    const [input, setInput] = useState("");

    const ref = useRef<any>();
    const iframe = useRef<any>();

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

        iframe.current.scrdoc = html;

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
        // console.log(
        //     "🚀 ~ file: index.tsx ~ line 35 ~ onClickHandler ~ result",
        //     result
        // );

        // setCode(result.outputFiles[0].text);

        iframe.current.contentWindow.postMessage(
            result.outputFiles[0].text,
            "*"
        );
    };

    //execution code with eval
    const html = `
    <html>
    <head>
    </head>
    <body>
        <div id="root">
        <script>
        window.addEventListener('message',(e)=>{

            try{
                eval(event.data)
            }catch(err){
                const root = document.querySelector('#root');
                root.innerHTML = '<div style="color: red"><h4> Runtime Error </h4> '  + err + '</div>';
                console.error(err)

            }

        },false)
        </script>
        </div>
    </body>
    </html>
`;

    return (
        <div>
            <CodeEditor initialValue='toto' onChange={(value)=>setInput(value)}/>
            <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
            ></textarea>
            <div>
                <button type="submit" onClick={onClickHandler}>
                    submit
                </button>
            </div>
            {/* <pre>{code}</pre> */}
            <iframe
                ref={iframe}
                srcDoc={html}
                sandbox="allow-scripts"
                title="box-preview"
            ></iframe>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
