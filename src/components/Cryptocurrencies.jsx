import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getCoinsData } from '../services/crypAPi';
import millify from 'millify';
import { Card, Row, Col, Input } from "antd";
import { Link } from "react-router-dom";


function Cryptocurrencies() {
  const dispatch = useDispatch();

  useEffect( () => {
    dispatch(getCoinsData())
    // eslint-disable-next-line
  }, [])

  const {data: cryptoList, loading} = useSelector( (state) => state.cry)
  
  const [cryptos, setCryptos] = useState(cryptoList?.data?.coins)
  console.log("cryptocurrencies: ", cryptos);
  
  


  return (
    <>
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos.map( (coin) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={coin.id}>
            <Link to={`/crypto/${coin.id}`}>
              <Card 
              title={`${coin.rank}. ${coin.name}`}
              extra={<img src={coin.iconUrl} className="crypto-image" alt={`${coin.name}'s icon`}/>}
              hoverable
              >
                <p>Price: {millify(coin.price)}</p>
                <p>Market Cap: {millify(coin.marketCap)}</p>
                <p>Daily Change: {millify(coin.change)}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>  
  )
}

export default Cryptocurrencies