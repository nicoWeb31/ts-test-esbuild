import React from "react";
import { ResizableBox } from "react-resizable";
import './resizable.css';

interface ResizableBoxProps {

    direction: 'horizontal' | 'vertical';


}

const Resizable: React.FC <ResizableBoxProps>= ({direction, children}) => {
    return <ResizableBox 
    className= "react-resizable-handle"
    height={300}
    width={Infinity}
    resizeHandles={['s']}
    > {children}</ResizableBox>;
};

export default Resizable;
