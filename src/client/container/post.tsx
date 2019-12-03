import React, { useState } from 'react';
import PostComp from '../components/postComp';
import history from '../plugins/history';
import styled from 'styled-components';

const Home: React.FC = () => {
  const [name, setName] = useState<string | null>(null);
  const [price, setPrice] = useState<number | null>(null);
  const [inputError, setInputError] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const queryArgs = ['商品名', '値段'];

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
      if (jsonData.errors) {
        setInputError(true);
      }
      if (!jsonData.errors) {
        history.push('/');
      }
    } catch (err) {
      setError(true);
    }
  };

  const setInputNamePrice = (event: React.ChangeEvent<HTMLInputElement>, queryArg: string) => {
    const eventTarget = event.target as HTMLButtonElement;
    if (!eventTarget.value) {
      setPrice(null);
    }
    if (queryArg === '商品名') {
      setName(eventTarget.value);
    }
    if (queryArg === '値段') {
      const priceNumber = parseInt(eventTarget.value, 10);
      setPrice(priceNumber);
    }
  };

  return (
    <div>
      <PostComp />
      {inputError && <Error>商品名と値段を入力してください。</Error>}
      {error && <Error>ネットワークエラーです。</Error>}
      <FormArea>
        {queryArgs.map((queryArg, index) => {
          return (
            <React.Fragment key={index}>
              <ProductBox>
                <p>{queryArg}</p>
                <input type="text" placeholder={queryArg} onChange={(event) => setInputNamePrice(event, queryArg)} />
              </ProductBox>
            </React.Fragment>
          );
        })}
        <SubmitButton onClick={fetchData}>登録する</SubmitButton>
      </FormArea>
    </div>
  );
};

const Error = styled.div`
  font-size: 22px;
  color: red;
  text-align: center;
`;

const FormArea = styled.div`
  width: 40%;
  margin: 0 auto;
`;

const ProductBox = styled.div`
  margin: 10px 0;
  align-items: center;
`;

const SubmitButton = styled.button`
  margin: 50px 0;
`;

export default Home;
