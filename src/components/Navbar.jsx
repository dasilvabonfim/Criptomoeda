import React, {useContext} from 'react';
import { CoinContext } from '../context/MoedaContext';
import { Link } from 'react-router-dom';



export default function Navbar(){
    const {setCurrency} = useContext(CoinContext);

    const currencyHandler = (e) => {
        switch (e.target.value){
            case "usd": {
                setCurrency({name: 'usd', symbol: '$'})
                break;
            }
            case "brl": {
                setCurrency({name: 'brl', symbol: 'R$'})
                break;
            }
            case "eur": {
                setCurrency({name: 'eur', symbol: '€'})
                break;
            }
            default: {
                setCurrency({name: 'usd', symbol: '$'})
            }
        }
    }

    return(
        <div className="navbar">
            <Link to={`/`}>
            <img className="img-logo" src="src/assets/jooj.jpeg" alt="" />
            </Link>
            <ul>
                <Link to={`/`}><li>Menu</li></Link>

            </ul>
            <div className="navright">
                <select onChange={currencyHandler}>
                    <option value="usd">USD</option>
                    <option value="brl">BRL</option>
                    <option value="eur">EUR</option>
                </select>
                <button>Cadastra-se
                    <img src="src/assets/arrow_icon.png" alt="" />
                </button>
            </div>
        </div>

    )
}