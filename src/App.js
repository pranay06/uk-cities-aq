import logo from './logo.svg';
import './App.css';
// import AutoComplete from './components/AutoComplete';
import CountryCitiesWeather from './pages/country-cities-aq';
function App() {
  return (
    <div className='main-container d-flex p-20'>
      <div>
        <h1 className='text-white text-center'>Compare your Air</h1>
        <p className='text-white text-center'>Compare the air quality between cities in the UK.</p>
        <p className='text-white text-center mt-0'>
          Select cities to compare using the search tool below.
        </p>
      </div>
      <CountryCitiesWeather/>
    </div>
  );
}

export default App;
