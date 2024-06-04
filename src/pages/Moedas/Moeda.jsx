import React, { useEffect, useState, useContext} from 'react';
import { useParams } from 'react-router-dom';
import { CoinContext } from '../../context/MoedaContext';
import LineChart from '../../components/LineChart';


export default function Moeda(){

    const {moedaId} = useParams();
    const [coinData, setCoinData] = useState({});
    const [historicalData, setHistoricalData] = useState([]);
    const {currency} = useContext(CoinContext);

    const fetchCoinData = async () => {
        const options = {
            method: 'GET',
            headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-AWt7JoXYsuijzkQEUzLoa6SJ'}
          };
          
          fetch(`https://api.coingecko.com/api/v3/coins/${moedaId}`, options)
            .then(response => response.json())
            .then(response => setCoinData(response))
            .catch(err => console.error(err));
    }

    const fetchHistoricalData = async () => {
        const options = {
            method: 'GET',
            headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-AWt7JoXYsuijzkQEUzLoa6SJ'}
          };
          
          fetch(`https://api.coingecko.com/api/v3/coins/${moedaId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`, options)
            .then(response => response.json())
            .then(response => setHistoricalData(response))
            .catch(err => console.error(err));
    }

    useEffect(() => {fetchCoinData();fetchHistoricalData();},[currency])

    if (coinData && coinData.image && historicalData){
        return(
            <div className="coin">
                <div className="coin-nome">
                    <img src={coinData.image.large} alt="" />
                    <p><b>{coinData.name} {coinData.symbol.toUpperCase()}</b></p>
                </div>
                <div className="coin-chart">
                    <LineChart historicalData={historicalData} />
                </div>
                <div className="coin-info">
                    <ul>
                        <li>Rank da cripto no mercado</li>
                        <li>{coinData.market_cap_rank}</li>
                    </ul>
                    <ul>
                        <li>Preço atual</li>
                        <li>{currency.symbol + coinData.market_data.current_price[currency.name].toLocaleString()}</li>
                    </ul>
                    <ul>
                        <li>Valor de mercado</li>
                        <li>{currency.symbol + coinData.market_data.market_cap[currency.name].toLocaleString()}</li>
                    </ul>
                    <ul>
                        <li>Alta nas últimas 24 horas</li>
                        <li>{currency.symbol + coinData.market_data.high_24h[currency.name].toLocaleString()}</li>
                    </ul>
                    <ul>
                        <li>Baixa nas últimas 24 horas</li>
                        <li>{currency.symbol + coinData.market_data.low_24h[currency.name].toLocaleString()}</li>
                    </ul>
                </div>
            </div> 
        )
    }
    else{
        return(
            <div className="spinner">
                <div className="spin"></div>
            </div>
        )
    }
}