import React, { useEffect } from 'react';
import {useGetCryptosQuery} from '../services/cryptoApi';
import millify from 'millify';
import {Typography, Statistic, Row, Col} from 'antd';
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {Cryptocurrencies, News} from "../components"
import { getCoinsData } from '../services/crypAPi';
const {Title} = Typography;



function Homepage() {
  // eslint-disable-next-line
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getCoinsData())

    // eslint-disable-next-line
  }, [])
  
  const {data, loading} = useSelector( (state) => state.cry)
  if(!loading) console.log(data)
  const globalStats = data?.data?.stats
    // const {data, error, isFetching} = useGetCryptosQuery();
    // if (error) {
    //     console.error("rtk query:", error);
    // }
    //  if (!isFetching) {
    //     console.log(data?.data);
    // }
  return (
    <>
        <Title level={2} className="heading">Global Crypto Stats</Title>
        <Row>
            <Col span={12}><Statistic title="Total Cryptocurrencies" value={globalStats.total}/></Col>
            <Col span={12}><Statistic title="Total Exchanges" value={millify(globalStats.totalExchanges)}/></Col>
            <Col span={12}><Statistic title="Total Market Cap" value={millify(globalStats.totalMarketCap)}/></Col>
            <Col span={12}><Statistic title="Total 24h Volume" value={millify(globalStats.total24hVolume)}/></Col>
            <Col span={12}><Statistic title="Total Markets" value={millify(globalStats.totalMarkets)}/></Col>
        </Row>

        <div>
          <Title level={4} className="home-title">Top 10 Cryptocurrencies in the world</Title>
          <Title level={5} className="show-more"><Link to="/cryptocurrencies">Show more</Link></Title>
        </div>
        <Cryptocurrencies simplified/>
        
        <div>
          <Title level={4} className="home-title">Latest Crypto News</Title>
          <Title level={5} className="show-more"><Link to="/news">Show more</Link></Title>
        </div>
        <News simplified/>
    </>
  )
}

export default Homepage