import React from 'react'
import MonacoEditor from '@monaco-editor/react';
import './code-editor.style.css'

const CodeEditor = () => {
    return <MonacoEditor className="_editor" language="javascript" theme="dark" options={{wordwrap: 'on'}}/>
}


export default CodeEditor
