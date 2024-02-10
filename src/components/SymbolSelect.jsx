import React from 'react';
import './SymbolSelect.css'

const SymbolSelect = ({ onSelect }) => {
    return (
        <div className="modal">
            <div className="modal-content">
            <h2>Select Your Symbol</h2>
            <div id='btns'>
                <button onClick={() => onSelect('X')}>X</button>
                <button onClick={() => onSelect('O')}>O</button>
            </div>
            </div>
        </div>
    );
};

export default SymbolSelect;
