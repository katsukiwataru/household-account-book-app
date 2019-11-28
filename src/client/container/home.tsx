import React, { useState } from 'react';
import HomeComp from '../components/homeComp';

const Home: React.FC = () => {
  const [name, setName] = useState<string>('');

  const query = `mutation {
    createProduct(data: {
      name: "${name}",
      price: 30000
    }) {
      id
      name
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

  const setInputText = (event: React.ChangeEvent<HTMLInputElement>) => {
    const postName = event.target as HTMLButtonElement;
    setName(postName.value);
  };

  const sendInputValue = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      fetchData();
    }
  };
  return (
    <div>
      <HomeComp fetchData={fetchData} sendInputValue={sendInputValue} setInputText={setInputText} />
    </div>
  );
};

export default Home;
