import React from "react";
import MonacoEditor from "@monaco-editor/react";
import "./code-editor.style.css";

interface CodeEditorProps{
    initialValue : string;
    onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({initialValue, onChange}) => {


    const onEditorDidMount = (getValue:()=>string, monacoEditor: any) => {

        monacoEditor.onDidChangeModelContent(()=>{
            console.log(getValue())
            onChange(getValue())
        })
    }

    return (
        <MonacoEditor

        editorDidMount = {onEditorDidMount}
        
        value = {initialValue}
            className="_editor"
            language="javascript"
            theme="dark"
            options={{
                wordwrap: "on",
                minimap: { enabled: false },
                showUnused: false,
                folding: false,
                lineNumbersMinChars: 3,
                fontSize: 16,
                scrollBeyondLine: false,
                automaticLayout: true
            }}
        />
    );
};

export default CodeEditor;
