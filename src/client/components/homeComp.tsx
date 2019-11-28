import React from 'react';

type Props = {
  products: Products[];
};

const Home: React.FC<Props> = ({ products }) => {
  return (
    <div>
      {products.map((product) => {
        return (
          <React.Fragment key={product.id}>
            <p>{product.id}</p>
            <p>{product.name}</p>
            <p>{product.price}</p>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Home;
