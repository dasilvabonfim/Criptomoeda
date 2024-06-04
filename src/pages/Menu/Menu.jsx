import React, {useContext, useEffect, useState} from 'react'
import { CoinContext } from '../../context/MoedaContext';
import { Link } from 'react-router-dom';


const Menu = () => {
    const {allcoin,currency} = useContext(CoinContext);
    const [displayCoin, setDisplayCoin] = useState([]);
    const [input, setInput] = useState('');

    const inputHandler = (e) => {
        setInput(e.target.value);
        if(e.target.value === ""){
            setDisplayCoin(allcoin);
        }

    }

    const searchHandler = async (e) => {
        e.preventDefault();
        const coins = await allcoin.filter((item) => {return item.name.toLowerCase().includes(input.toLowerCase())})
        setDisplayCoin(coins);

    }


useEffect(() => {setDisplayCoin(allcoin)},[allcoin])
    return(
        <div className="Menu">
            <div className="jooj">
                <h1>Mercado Cripto</h1>
                <p>Veja informações de sua criptomoeda preferida.</p>
                <form onSubmit={searchHandler} action="">
                    <input onChange={inputHandler} list='coinlist' type="text" placeholder='Procurar moeda' required value={input}/>

                    <datalist id='coinlist'>
                        {allcoin.map((item,index) => {
                            return <option key={index} value={item.name}/>
                        })}
                    </datalist>
                    
                    <button>Procurar</button>
                </form>
            </div>
            <div className="crypto-table">
                <div className="table-layout">
                    <p>#</p>
                    <p>Nome</p>
                    <p>Preço</p>
                    <p style={{textAlign:"center"}}>Variação nas úlimas 24 horas</p>
                    <p className="market-cap">Valor de mercado</p>
                </div> 
                {displayCoin.slice(0,10).map((item,index) => (
                    <Link to={`/moeda/${item.id}`} className="table-layout" key={index}>
                        <p>
                            {item.market_cap_rank}
                        </p>
                        <div>
                            <img src={item.image} alt="" />
                            <p>{item.name + " - " + item.symbol}</p>
                        </div>
                        <p>
                            {currency.symbol + item.current_price.toLocaleString()}
                        </p>
                        <p className={item.price_change_percentage_24h>0?"green":"red"}>
                            {Math.floor(item.price_change_percentage_24h * 100)/ 100 + "%"}
                        </p>
                        <p className="market-cap">
                            {currency.symbol + item.market_cap.toLocaleString()}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Menu;

