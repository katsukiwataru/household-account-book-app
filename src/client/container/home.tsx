import React, { useState, useEffect } from 'react';
import HomeComp from '../components/homeComp';

const Home: React.FC = () => {
  const [products, setProducts] = useState<Products[]>([]);

  const query = `{
    products{
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
      setProducts(jsonData.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <HomeComp products={products} />
    </div>
  );
};

export default Home;
