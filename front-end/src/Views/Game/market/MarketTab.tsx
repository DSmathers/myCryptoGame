import TopTenTable from "./components/TopTenTable";
import './market_page_styles.css'




const MarketTab = () => {
  return (
    <div id="watchlist_wrapper">
      <header id = "watchlist_header"> Top 10 By Market Cap</header>
      <TopTenTable />
    </div>
  )
};

export default MarketTab;
