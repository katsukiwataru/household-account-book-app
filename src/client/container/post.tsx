import React, { useState } from 'react';
import PostComp from '../components/postComp';

const Home: React.FC = () => {
  const [name, setName] = useState<string | null>(null);
  const [price, setPrice] = useState<number | null>(null);
  const queryArgs = ['name', 'price'];

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

  const setInputNamePrice = (event: React.ChangeEvent<HTMLInputElement>, queryArg: string) => {
    const eventTarget = event.target as HTMLButtonElement;
    if (!eventTarget.value) {
      setPrice(null);
    }
    if (queryArg === 'name') {
      setName(eventTarget.value);
    }
    if (queryArg === 'price') {
      const priceNumber = parseInt(eventTarget.value, 10);
      setPrice(priceNumber);
    }
  };

  const sendInputNamePrice = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      fetchData();
    }
  };

  return (
    <div>
      <PostComp fetchData={fetchData} />
      {queryArgs.map((queryArg) => {
        return (
          <React.Fragment key={queryArg}>
            <div>
              <p>{queryArg}</p>
              <input
                type="text"
                placeholder={queryArg}
                onChange={(event) => setInputNamePrice(event, queryArg)}
                onKeyPress={(event) => sendInputNamePrice(event)}
              />
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Home;
