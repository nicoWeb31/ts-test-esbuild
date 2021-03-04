import React from "react";
import { ResizableBox, ResizableProps } from "react-resizable";
import './resizable.css';

interface ResizableBoxProps {

    direction: 'horizontal' | 'vertical';


}

const Resizable: React.FC <ResizableBoxProps>= ({direction, children}) => {


    let resizableProps: ResizableProps;

    if(direction === 'horizontal') {
        resizableProps = {
            className: 'resize-horizontal',
            minConstraints:[window.innerWidth *0.2,Infinity],
            maxConstraints:[window.innerWidth *0.75, Infinity],
            height:Infinity,
            width:window.innerWidth * 0.75,
            resizeHandles:['e']
        }
    }else{
        resizableProps ={
            minConstraints:[Infinity, 24],
            maxConstraints:[Infinity, window.innerHeight * 0.9],
            height:300,
            width:Infinity,
            resizeHandles:['s'],
        }
    }
    
    return <ResizableBox 
    className="react-resizable-handle"
    {...resizableProps}

    > {children}</ResizableBox>;
};

export default Resizable;
