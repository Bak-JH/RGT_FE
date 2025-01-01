import React from "react";
import { Button } from "primereact/button";

import TextInput from "../components/inputs/TextInput";
import NumberInput from "../components/inputs/NumberInput";
import SubmitButton from "./buttons/SubmitButton";
import AddInputButton from "./buttons/AddInputButton";

class InputComponent extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.inputItems !== this.props.inputItems) {
      return true;
    }
    return false;
  }

  render() {
    const { inputItems, inputAddId, addInput, InputDelete, onChangeEvent, confirm } = this.props;
    return (
      <div>
        {inputItems.map((item, index) => {
          return (
            <div key={item.id} className="margin-vertical">
              {index === 0 && (
                <div className="container-end margin-vertical">
                  <AddInputButton onClick={() => addInput()} />
                  <SubmitButton onClick={() => confirm()} />
                </div>
              )}
              <div className="margin-vertical">
                <TextInput
                  className="margin-horizontal"
                  defaultValue={item.name}
                  onChangeEvent={(e) => onChangeEvent(e, item.id)}
                />
                <NumberInput
                  className="margin-horizontal"
                  defaultValue={item.amount}
                  onChangeEvent={(e) => onChangeEvent(e, item.id)}
                />
              
              {index > 0 && inputItems[index - 1] ? (
                <Button className="margin-horizontal" severity="danger" icon="pi pi-trash" onClick={() => InputDelete(item.id)} />
              ) : (
                ""
              )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default InputComponent;
