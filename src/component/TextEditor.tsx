import MDEditor from "@uiw/react-md-editor";
import React, { useState, useEffect, useRef } from "react";
import './text-editor-MD.css';

const TextEditor: React.FC = () => {
    const [editing, setEditing] = useState(false);
    const [value,setValue] = useState('# toto');
    
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
                <div ref={editorRef} className="text-editor">
                    <MDEditor  value={value} onChange={(v)=>setValue(v || null)}/>
                </div>
            );
        } else {
            return (
                <div className="text-editor card-content">
                    <MDEditor.Markdown source={value} />
                </div>
            );
        }
    };

    return <div className="card" onClick={() => setEditing(true)}>{isEditing()}</div>;
};

export default TextEditor;
