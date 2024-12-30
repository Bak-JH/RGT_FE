import React, { Component } from "react";
import InputComponent from "../InputComponent";

import { axiosInstance } from "../utils/axiosInstance";

class InputContainer extends Component {
  constructor(props) {
    super();
    this.state = {
      inputItems: [
        {
          id: 0,
          name: "",
          amount: 1
        }
      ],
      inputAddId: 1
    };
  }

  AddInput = () => {
    const { inputItems, inputAddId } = this.state;

    const input = {
      id: inputAddId,
      name: "",
      amount: 1
    };

    this.setState({
      inputItems: inputItems.concat({
        ...input
      }),
      inputAddId: inputAddId + 1
    });
  };

  InputDelete = (id) => {
    const { inputItems } = this.state;

    this.setState(
      {
        inputItems: []
      },
      () => {
        this.setState({
          inputItems: inputItems.filter((item) => item.id !== id)
        });
      }
    );
  };

  onChangeEvent = (e, id) => {
    const { inputItems } = this.state;
    
    console.log(e.target);

    const data = {
      [e.target.name]: e.target.value
    };

    console.log(data);

    this.setState({
      inputItems: inputItems.map((item) =>
        item.id === id ? { ...item, ...data } : item
      )
    });
  };

  confirm = () => {
    const { inputItems } = this.state;

    axiosInstance.post()
  };

  render() {
    const { inputItems, inputAddId } = this.state;

    return (
      <div>
        <InputComponent
          inputItems={inputItems}
          inputAddId={inputAddId}
          addInput={this.AddInput}
          InputDelete={this.InputDelete}
          onChangeEvent={this.onChangeEvent}
          confirm={this.confirm}
        />
      </div>
    );
  }
}

export default InputContainer;