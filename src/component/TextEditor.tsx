import MDEditor from "@uiw/react-md-editor";
import React, { useState, useEffect, useRef } from "react";
import { Cell } from "../state/cell";
import { useAction } from '../hooks/useAction'
import './text-editor-MD.css';


interface TextEditorProps {
cell: Cell
}


const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
    const [editing, setEditing] = useState(false);
    // const [value,setValue] = useState('# toto');
    

    const { updateCell } = useAction();

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
                    {/* @ts-ignore */}
                    <MDEditor  value={cell.content} onChange={(v)=>updateCell(cell.id, v || '')}/>
                </div>
            );
        } else {
            return (
                <div className="text-editor card-content">
                    <MDEditor.Markdown source={cell.content || 'click to édit'} />
                </div>
            );
        }
    };

    return <div className="card" onClick={() => setEditing(true)}>{isEditing()}</div>;
};

export default TextEditor;
