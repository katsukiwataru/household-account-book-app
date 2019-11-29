import React from 'react';

type Props = {
  fetchData: () => void;
  setInputName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  sendInputName: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  setInputPrice: (event: React.ChangeEvent<HTMLInputElement>) => void;
  sendInputPrice: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};

const Home: React.FC<Props> = ({ fetchData, setInputName, sendInputName, setInputPrice, sendInputPrice }) => {
  return (
    <div>
      <button onClick={fetchData}>fetchData</button>
      <input
        type="text"
        placeholder="product name"
        onChange={(event) => setInputName(event as React.ChangeEvent<HTMLInputElement>)}
        onKeyPress={(event) => sendInputName(event as React.KeyboardEvent<HTMLInputElement>)}
      />
      <input
        type="text"
        placeholder="product price"
        onChange={(event) => setInputPrice(event as React.ChangeEvent<HTMLInputElement>)}
        onKeyPress={(event) => sendInputPrice(event as React.KeyboardEvent<HTMLInputElement>)}
      />
    </div>
  );
};

export default Home;
