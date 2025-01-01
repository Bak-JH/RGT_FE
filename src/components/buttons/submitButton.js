import React from "react";
import { Button } from 'primereact/button';

class SubmitButton extends React.Component {
    render() {
        const {onClick} = this.props;

        return (
            <Button className="margin-horizontal" label="주문하기" variant="primary" onClick={()=> onClick()}/>
        );
    }
}

export default SubmitButton;