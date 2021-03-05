import { directive } from "jscodeshift";
import React, { useRef, useEffect } from "react";
import "./preview.css";

interface previewProps {
    code: string;
    err: string;
}

//execution code with eval
const html = `
    <html>
    <head>
    </head>
    <body>
        <div id="root">
        <script>
        const handleErr = (err) =>{
            const root = document.querySelector('#root');
            root.innerHTML = '<div style="color: red"><h4> Runtime Error </h4> '  + err + '</div>';
            console.error(err)

        }

        window.addEventListener('error',(e)=>{
            e.preventDefault();
            handleErr(e.error)
        })
        window.addEventListener('message',(e)=>{

            try{
                eval(event.data)
            }catch(err){
                handleErr()
            }

        },false)
        </script>
        </div>
    </body>
    </html>
`;

const Preview: React.FC<previewProps> = ({ code, err }) => {
    const iframe = useRef<any>();

    useEffect(() => {
        iframe.current.scrdoc = html;
        setTimeout(() => {
            iframe.current.contentWindow.postMessage(code, "*");
        }, 50);
    }, [code]);

    return (
        <div className="preview-container">
            <iframe
                ref={iframe}
                srcDoc={html}
                sandbox="allow-scripts"
                title="box-preview"
            />

            {err && <div className="preview-err">{err}</div>}
        </div>
    );
};

export default Preview;
