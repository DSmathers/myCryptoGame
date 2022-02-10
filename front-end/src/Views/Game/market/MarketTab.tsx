import CoinDetailsModal from "./components/CoinDetailsModal";
import TopTenTable from "./components/TopTenTable";
import './market_page_styles.css'
import { useState } from 'react' 



const MarketTab = () => {
  const [ selectedCoin, setSelectedCoin ] = useState(null);
  return (
    <div id="watchlist_wrapper">
      <header id = "watchlist_header"> Top 10 By Market Cap </header>
      <TopTenTable setSelectedCoin={setSelectedCoin} />
      {/* If there is a coin selected, the information is passed to the modal and it's shown */}
      {selectedCoin && <CoinDetailsModal selectedCoin={selectedCoin} setSelectedCoin={setSelectedCoin} />}
    </div>
  )
};

export default MarketTab;
