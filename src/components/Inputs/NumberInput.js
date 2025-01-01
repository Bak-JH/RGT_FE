import React from "react";
import { InputNumber } from 'primereact/inputnumber';

class NumberInput extends React.Component {
    render(){
        const {defaultValue, onChangeEvent} = this.props
        return(
            <>
                <InputNumber 
                    name="amount"
                    className="centered-input margin-horizontal"
                    value={defaultValue}
                    onValueChange={(e)=>{ onChangeEvent(e);}}
                    showButtons 
                    buttonLayout="horizontal" 
                    step={1} 
                    min={1}
                    decrementButtonClassName="p-button-secondary" 
                    incrementButtonClassName="p-button-secondary" 
                    incrementButtonIcon="pi pi-plus" 
                    decrementButtonIcon="pi pi-minus"
                />
            </>
        );
    }
}

export default NumberInput;