import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import HomeComp from '../components/homeComp';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const GET_PRODUCTS = gql`
  {
    products {
      id
      name
      price
    }
  }
`;

const Home: React.FC = () => {
  const { data, loading, error } = useQuery(GET_PRODUCTS);
  const [products, setProducts] = useState<Products[]>([]);
  const [erro, setError] = useState<boolean>(false);
  // if (data) {
  // }
  console.log(error, loading);
  // const hoge: Products[] = data.products as Products[];
  // console.log(hoge);

  // try {
  //   const client = new ApolloClient({
  //     uri: 'http://localhost:4466/',
  //   });
  //   const result = client.query({
  //     query: gql`
  //       {
  //         products {
  //           id
  //           name
  //           price
  //         }
  //       }
  //     `,
  //   });
  //   console.log(result);
  // } catch (err) {
  //   console.log(err);
  // }

  const fetchData = async () => {
    const query = `{
      products{
        id
        name
        price
      }
    }`;
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
      setProducts(jsonData.data.products);
    } catch (err) {
      setError(true);
    }
  };

  const removeData = async (id: string) => {
    const query = `mutation {
      deleteProduct(where: {
        id: "${id}"
      }){
        id
        name
        price
      }
    }`;
    try {
      await fetch('http://localhost:4466/', {
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
      fetchData();
    } catch (err) {
      setError(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <HomeComp />
      {erro && <Error>ネットワークエラーです。情報を取得できませんでした。</Error>}
      {data &&
        data.products.map(
          (product: { id: string | number | undefined; name: React.ReactNode; price: React.ReactNode }) => {
            return (
              <React.Fragment key={product.id}>
                <Product>
                  <Name>{product.name}</Name>
                  <Price>{product.price}円</Price>
                  <Id>
                    <Link to={`/post/${product.id}`}>編集</Link>
                    {/* <Remove onClick={() => removeData(product.id)}>削除</Remove> */}
                  </Id>
                </Product>
              </React.Fragment>
            );
          },
        )}
      {products.map((product) => {
        return (
          <React.Fragment key={product.id}>
            <Product>
              <Name>{product.name}</Name>
              <Price>{product.price}円</Price>
              <Id>
                <Link to={`/post/${product.id}`}>編集</Link>
                <Remove onClick={() => removeData(product.id)}>削除</Remove>
              </Id>
            </Product>
          </React.Fragment>
        );
      })}
    </div>
  );
};

const Error = styled.div`
  font-size: 22px;
  color: red;
  text-align: center;
`;

const Product = styled.div`
  display: flex;
  width: 50%;
  justify-content: space-between;
  text-align: center;
  align-items: center;
  margin: 10px auto;
  background-color: #f6f6f6;
`;

const Name = styled.p`
  width: 100%;
`;

const Price = styled.p`
  width: 100%;
`;

const Id = styled.p`
  width: 100%;
`;

const Remove = styled.span`
  margin: 0 10px;
`;

export default Home;
