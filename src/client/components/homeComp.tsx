import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  products: Products[];
};

const Home: React.FC<Props> = ({ products }) => {
  return (
    <div>
      <p>
        <Link to={`/post/`}>Post</Link>
      </p>
      {products.map((product) => {
        return (
          <React.Fragment key={product.id}>
            <div>
              <Link to={`/post/${product.id}`}>Desc</Link>
              <p>{product.name}</p>
              <p>{product.price}</p>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Home;
