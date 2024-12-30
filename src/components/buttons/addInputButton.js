import React from 'react';
import { Button } from 'primereact/button';

class AddInputButton extends React.Component {
    render() {
        const {onClick} = this.props;

        return (
            <Button className="buttons" label="메뉴 추가" severity="secondary" onClick={()=> onClick()}/>
        );
    }
}

export default AddInputButton;