import React from 'react';


import './App.css';

import SubmitButton from './buttons/submitButton';
import AddInputButton from './buttons/addInputButton';
import TextInput from './Inputs/TextInput';
import NumberInput from './Inputs/NumberInput';
import InputContainer from './InputContainer';


function App() {
  return (
    <>
      <div className="d-flex justify-content-center p-4">
        <h1 className="m-0">주문페이지</h1>
      </div>
      <br />
      <InputContainer>
        <div>
          <AddInputButton />
          <SubmitButton name="dd" amount="123"/>
        </div>
        <br />
        <TextInput />
        <NumberInput />
      </InputContainer>
    </>
  );
}

export default App;
