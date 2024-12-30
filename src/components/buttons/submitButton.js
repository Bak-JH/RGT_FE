import React from "react";
import { axiosInstance } from "../../utils/axiosInstance";
import { Button } from 'primereact/button';

class SubmitButton extends React.Component {
    render() {
        const {onClick} = this.props;

        return (
            <Button className="buttons" label="주문하기" variant="primary" onClick={()=> onClick()}/>
        );
    }
}

export default SubmitButton;