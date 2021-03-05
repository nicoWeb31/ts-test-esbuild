import MDEditor from "@uiw/react-md-editor";
import React, { useState, useEffect, useRef } from "react";

const TextEditor: React.FC = () => {
    const [editing, setEditing] = useState(false);

    const editorRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const listener = (e: MouseEvent) => {
            if (
                editorRef.current &&
                e.target &&
                editorRef.current.contains(e.target as Node)
            ) {
                console.log("click insid editor ");
                return;
            }
            console.log('element clicked otside editor');
            setEditing(false);
        };

        document.addEventListener("click", listener, { capture: true });

        return () => {
            document.removeEventListener("click", listener);
        };
    }, []);

    const isEditing = () => {
        if (editing) {
            return (
                <div ref={editorRef}>
                    <MDEditor />
                </div>
            );
        } else {
            return (
                <div>
                    <MDEditor.Markdown source={" #toto "} />
                </div>
            );
        }
    };

    return <div onClick={() => setEditing(true)}>{isEditing()}</div>;
};

export default TextEditor;
