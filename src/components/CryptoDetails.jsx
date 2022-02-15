import React, { useState } from 'react';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import { Col, Row, Typography, Select } from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';
import {useGetCryptoDetailsQuery} from "../services/cryptoApi";

const { Title, Text } = Typography;
const { Option } = Select;


const CryptoDetails = () => {
    const { coinId } = useParams();
    const [timeperiod, setTimeperiod] = useState('7d');
    const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
    console.log(data)
    // const { data: coinHistory } = useGetCryptoHistoryQuery({ coinId, timeperiod });
    const cryptoDetails = data?.data?.coin;


    if(isFetching) return 'loading...'

    const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

    const stats = [ { title: 'Price to USD', value: `$ ${cryptoDetails.price && millify(Number(cryptoDetails.price))}`, icon: <DollarCircleOutlined /> }, { title: 'Rank', value: cryptoDetails.rank, icon: <NumberOutlined /> }, { title: '24h Volume', value: `$ ${cryptoDetails["24hVolume"] && millify(Number(cryptoDetails["24hVolume"]))}`, icon: <ThunderboltOutlined /> }, { title: 'Market Cap', value: `$ ${cryptoDetails.marketCap && millify(Number(cryptoDetails.marketCap))}`, icon: <DollarCircleOutlined /> }, { title: 'All-time-high(daily avg.)', value: `$ ${millify(Number(cryptoDetails.allTimeHigh.price))}`, icon: <TrophyOutlined/> },
];

    const genericStats = [
        { title: 'Number Of Markets', value: cryptoDetails.numberOfMarkets, icon: <FundOutlined/> },
        { title: 'Number Of Exchanges', value: cryptoDetails.numberOfExchanges, icon: <MoneyCollectOutlined/> },
        { title: 'Change', value: cryptoDetails.change, icon : <ExclamationCircleOutlined /> },
        { title: 'Total Supply', value: `$ ${millify(Number(cryptoDetails?.supply?.total))}`, icon: <ExclamationCircleOutlined /> },
        { title: 'Circulating Supply', value: `$ ${millify(Number(cryptoDetails?.supply?.circulating))}`, icon: <ExclamationCircleOutlined /> },
    ];


    return (
        <div>
            <Col className={"coin-detail-container"}>
                <Col className={"coin-heading-container"}>
                    <Title level={2} className={"coin-name"}>
                        {cryptoDetails.name}({cryptoDetails.symbol}) Price
                    </Title>
                    <p>
                        {cryptoDetails.name} live price in US Dollar (USD). View value statistics, market cap and supply.
                    </p>
                </Col>
                <Select defaultValue={"7d"}
                        className={"select-timeperiod"}
                        placeholder={"select timeperios"}
                        onChange={(value)=>setTimeperiod(value)}>
                    {time.map((date)=>(
                        <Option key={date}>{date}</Option>
                    ))}

                </Select>
            </Col>
        </div>
    );
};

export default CryptoDetails;