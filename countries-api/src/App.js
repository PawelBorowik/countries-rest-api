import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [selectItem, setSelectItem] = useState("");
  const [loading, setLoading]= useState(true)
  const [error, setError]= useState()

  const API = "https://restcountries.eu/rest/v2/";

  useEffect(()=>{
    const myFetch= async()=>{
    
      try{
         const response =await fetch(API)
         const responseParsed= await response.json()
         setLoading(false)
         setCountries(responseParsed)
         }catch(error){
          setLoading(false)
          setError(error)
         }
        }
        myFetch()

  },  [selectItem])

  const handleChangeSelect = e => setSelectItem(e.target.value);
  
  const showCountries = countries.map(country => (
    <option key={country.name} value={country.name}>
      {country.name}
    </option>
  ));

  const selectedCountry = countries.filter(
    country => country.name === selectItem
  );
  const flag = selectedCountry.map(selectCountry => (
    <div key={selectCountry.name}>
     <img src={selectCountry.flag} alt={selectCountry.alpha3Code}></img>
      <p>{selectCountry.name}</p>
      <p>({selectCountry.nativeName})</p>
      <p>Capital city: {selectCountry.capital}</p>
    </div>
  ));
const select= <select onChange={handleChangeSelect} >
<option value="">Select country:</option>
{showCountries}
</select>
  
if(error){
  return <p>error</p>
}

  return (
    <div className="App">
      <header className="App-header">
        <div className="hhh">{loading ? <p>loading...</p>: select}</div>
        <div className="flag"> {flag}</div>
      </header>
    </div>
  );
}

export default App;
