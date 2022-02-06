import { Coins } from "../../../../Models/Coins";


const Coin = ({id, image, name, market_cap, market_cap_rank, symbol, current_price, dayChange}:Coins) => {

  return (
        <>
          <td className="coin_rank" key={id + 'rank'}>{market_cap_rank}</td>
          <td className="coin_image" key={id + 'img'}>
              <img src={image} /> {name} 
            </td>
        {/*   <td className="coin_symbol" key={id + 'symbol'}>{symbol}</td>
          <td className="coin_name" key={id + 'name'}>{name}</td> */}
          <td className="coin_price" key={id + 'price'}>${current_price.toLocaleString()}</td>
          <td className="coin_dayChange" key={id + 'change'}>{dayChange.toFixed(2)}%</td>
          <td className="coin_market_cap" key={id + 'cap'}>${market_cap.toLocaleString()}</td>
      </>
  );
};

export default Coin;
