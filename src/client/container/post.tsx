import React, { useState } from 'react';
import PostComp from '../components/postComp';

const Home: React.FC = () => {
  const [name, setName] = useState<string | null>(null);
  const [price, setPrice] = useState<number | null>(null);

  const query = `mutation {
    createProduct(data: {
      name: "${name}",
      price: ${price}
    }) {
      id
      name
      price
    }
  }`;

  const fetchData = async () => {
    try {
      const data = await fetch('http://localhost:4466/', {
        credentials: 'omit',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          query,
        }),
        method: 'POST',
        mode: 'cors',
      });
      const jsonData = await data.json();
      console.log(jsonData);
    } catch (error) {
      console.log(error);
    }
  };

  const setInputName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const postName = event.target as HTMLButtonElement;
    setName(postName.value);
  };

  const sendInputName = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      fetchData();
    }
  };

  const setInputPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    const postName = event.target as HTMLButtonElement;
    const priceNumber = Number(postName.value);
    setPrice(priceNumber);
  };

  const sendInputPrice = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      fetchData();
    }
  };

  return (
    <div>
      <PostComp
        fetchData={fetchData}
        setInputName={setInputName}
        sendInputName={sendInputName}
        setInputPrice={setInputPrice}
        sendInputPrice={sendInputPrice}
      />
    </div>
  );
};

export default Home;
