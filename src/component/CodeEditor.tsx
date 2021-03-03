import React,{useRef} from "react";
import MonacoEditor, { EditorDidMount } from "@monaco-editor/react";
import prettier from "prettier";
import parser from "prettier/parser-babel";

import "./code-editor.style.css";

interface CodeEditorProps {
    initialValue: string;
    onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {

    const editorRef = useRef<any>();

    const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
        editorRef.current = monacoEditor;
        monacoEditor.onDidChangeModelContent(() => {
            console.log(getValue());
            onChange(getValue());
        });

        monacoEditor.getModel()?.updateOptions({ tabSize: 2 });
    };

    const onFormatClick = () =>{
        const unformated = editorRef.current.getModel().getValue();

        const formatted = prettier.format(unformated,{
            parser: 'babel',
            plugins:[parser],
            useTabs: false,
            semi: true,
            singleQuote: true
        });

        editorRef.current.setValue(formatted);
    }

    return (
        <div>
            <button onClick={onFormatClick}>Format</button>

            <MonacoEditor
                editorDidMount={onEditorDidMount}
                value={initialValue}
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
                    automaticLayout: true,
                }}
            />
        </div>
    );
};

export default CodeEditor;
