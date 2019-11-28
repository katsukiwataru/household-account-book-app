import React from 'react';

type Props = {
  fetchData: () => void;
  setInputText: (event: React.ChangeEvent<HTMLInputElement>) => void;
  sendInputValue: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};

const Home: React.FC<Props> = ({ fetchData, setInputText, sendInputValue }) => {
  return (
    <div>
      <button onClick={fetchData}>fetchData</button>
      <input
        type="text"
        placeholder="product name"
        onChange={(event) => setInputText(event as React.ChangeEvent<HTMLInputElement>)}
        onKeyPress={(event) => sendInputValue(event as React.KeyboardEvent<HTMLInputElement>)}
      />
    </div>
  );
};

export default Home;
