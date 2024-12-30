import React from 'react';
import { InputText } from 'primereact/inputtext';

class TextInput extends React.Component {
    render() {
        const {defaultValue, onChangeEvent} = this.props

        return (
            <>
                <InputText 
                    name="name" 
                    defaultValue={defaultValue} 
                    keyfilter={/^[a-zA-Z0-9가-힣]*$/} 
                    onChange={(e)=> onChangeEvent(e)}
                />
            </>
        );
    }
}

export default TextInput;