import React, { useRef, useEffect } from "react";

interface previewProps {
    code: string;
}

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

const Preview: React.FC<previewProps> = ({ code }) => {
    const iframe = useRef<any>();

    useEffect(() => {
        iframe.current.scrdoc = html;

        iframe.current.contentWindow.postMessage(
            code,
            "*"
        );
    }, [code]);

    return <iframe 
    style={{backgroundColor: "white"}}
    ref={iframe}
    srcDoc={html}
    sandbox="allow-scripts"
    title="box-preview"
    />
};

export default Preview;
