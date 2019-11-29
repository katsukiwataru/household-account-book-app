import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

type Props = {
  products: Products[];
};

const Home: React.FC<Props> = ({ products }) => {
  return (
    <div>
      <PostProduct>
        <h1>商品一覧</h1>
        <p>
          <Link to={`/post/`}>商品を追加する</Link>
        </p>
      </PostProduct>
      <Product>
        <Name>商品名</Name>
        <Price>値段</Price>
        <Id>編集</Id>
      </Product>
      <div>
        {products.map((product) => {
          return (
            <React.Fragment key={product.id}>
              <Product>
                <Name>{product.name}</Name>
                <Price>{product.price}円</Price>
                <Id>
                  <Link to={`/post/${product.id}`}>編集</Link>
                </Id>
              </Product>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

const PostProduct = styled.div`
  display: flex;
  justify-content: space-between;
  width: 40%;
  margin: 10px auto;
  align-items: center;
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

export default Home;
