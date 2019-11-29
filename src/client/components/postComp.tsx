import React from 'react';

type Props = {
  fetchData: () => void;
};

const Home: React.FC<Props> = ({ fetchData }) => {
  return (
    <div>
      <button onClick={fetchData}>create product</button>
    </div>
  );
};

export default Home;
