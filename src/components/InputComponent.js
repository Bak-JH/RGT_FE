import React, { Component } from "react";
import TextInput from "./Inputs/TextInput";
import NumberInput from "./Inputs/NumberInput";
import { Button } from "primereact/button";
import SubmitButton from "./buttons/submitButton";
import AddInputButton from "./buttons/addInputButton";

class InputComponent extends Component {
  render() {
    const { inputItems, inputAddId, addInput, InputDelete, onChangeEvent, confirm } = this.props;

    return (
      <div>
        {inputItems.map((item, index) => {
          return (
            <div key={item.id}>
              {index === 0 && (
                <div>
                  <AddInputButton onClick={() => addInput()} />
                  <SubmitButton onClick={() => confirm()} />
                </div>
              )}
              <TextInput
                defaultValue={item.name}
                onChangeEvent={(e) => onChangeEvent(e, item.id)}
              />
              <NumberInput
                defaultValue={item.amount}
                onChangeEvent={(e) => onChangeEvent(e, item.id)}
              />
              
              {index > 0 && inputItems[index - 1] ? (
                <Button className="buttons" onClick={() => InputDelete(item.id)}> - </Button>
              ) : (
                ""
              )}
            </div>
          );
        })}
      </div>
    );
  }
}

export default InputComponent;
