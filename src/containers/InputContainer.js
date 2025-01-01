import React, { Component } from "react";
import InputComponent from "../components/InputComponent";
import WebSocketService from "../utils/WebSocketService";

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
      inputAddId: 1,
      isFieldEmpty: false
    };
  }

  componentDidMount() {
    WebSocketService.addListener(this.handleNewOrder);
  }

  handleNewOrder = (response) => {
    if(response.status === "success") {
      alert("주문이 접수되었습니다.");
    } else {
      alert("서버 에러: " + response.data);
    }
  };

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

    const data = {
      [e.target.name]: e.target.value
    };

    this.setState({
      inputItems: inputItems.map((item) =>
        item.id === id ? { ...item, ...data } : item
      )
    });
  };

  confirm = () => {
    const { inputItems } = this.state;

    const hasEmptyValue = inputItems.some((item) => !item.name.trim());
    if (hasEmptyValue) {
      alert("입력이 비어있는 칸이 있습니다.");
      return;
    }

    const data = inputItems.map((item) => {
      return { name: item.name, amount: item.amount };
    });
    const request = { type: "data/json", data: data}
    WebSocketService.sendMessage(request);
  };

  render() {
    const { inputItems, inputAddId } = this.state;

    return (
      <div className="container-center">
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