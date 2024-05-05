import React, {useContext} from 'react';
import InpuAreaContext from "../../context/InputAreaContext";

function Button({inserts, back, title, label}) {

    const {input, setInput} = useContext(InpuAreaContext);
    const handleClick = (insertText) => {
        setInput(prevText => insertText);
    };

    return (
        <button
            onClick={() => handleClick(inserts)}
            className="btn btn-xs btn-example"
            title={title}>
            {label}
        </button>
    );
}

export default Button;