import React, { useRef } from "react";
import MonacoEditor, { EditorDidMount } from "@monaco-editor/react";
import prettier from "prettier";
import parser from "prettier/parser-babel";
import codeShift from "jscodeshift";
import Highlighter from "monaco-jsx-highlighter";
import "./syntax.css"

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
        const highlighter = new Highlighter(
            //@ts-ignore
            window.monaco,
            codeShift,
            monacoEditor
        );

        highlighter.highLightOnDidChangeModelContent(
            () => {},
            () => {},
            undefined,
            () => {}
        );
    };

    const onFormatClick = () => {
        const unformated = editorRef.current.getModel().getValue();

        const formatted = prettier
            .format(unformated, {
                parser: "babel",
                plugins: [parser],
                useTabs: false,
                semi: true,
                singleQuote: true,
            })
            .replace("/\n$/", "");

        editorRef.current.setValue(formatted);
    };

    return (
        <div className="editor-wrapper">
            <button
                onClick={onFormatClick}
                className="button button-format is-primary is-small"
            >
                Format
            </button>

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
