import React, { useState, useEffect, useReducer } from "react";
import "./App.css";

function dataUseReducer(state, action){
  switch(action.type){
    case "FETCH_START":
      return {
        ...state, 
      }
      case "FETCH_SUCCESS":
        return {
          ...state,
          countries:action.countries, 
          loading:false}
      case "FETCH_FAILED":
        return {
          ...state, 
          countries:[], 
          loading:false,
          error: action.error}
      default:
            return null   
  }
}

function App() {
  // const [countries, setCountries] = useState(null);
  const [selectCountry, setSelectCountry] = useState("");
  // const [loading, setLoading]= useState(true)
  // const [error, setError]= useState(null)
 const [state, dispatch] =useReducer(
dataUseReducer,
{
  countries:[],
  loading:true,
  error:null,
}
)

const API = "https://restcountries.eu/rest/v2/";

  useEffect(()=>{
    const myFetch= async()=>{
    dispatch({type:"FETCH_START"})
      try{
         const response =await fetch(API)
         const responseParsed= await response.json()
         dispatch({type:"FETCH_SUCCESS", countries: responseParsed})
        //  setLoading(false)
        //  setCountries(responseParsed)
         }catch(error){
          dispatch({type:"FETCH_FAILED", error: error})
          // setLoading(false)
          // setError(error)
         }
        }
        myFetch()

  }, [selectCountry])

  const handleChangeSelect = e => setSelectCountry(e.target.value);
  
  const showCountries = state.countries.map(country => (
    <option key={country.name} value={country.name}>
      {country.name}
    </option>
  ));

  const selectedCountry = state.countries.filter(
    country => country.name === selectCountry
  );
  const showSelectedCountry = selectedCountry.map(selectCountry => (
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
  
if(state.error){
  return <p>error</p>
}
  return (
    <div className="App">
      <header className="App-header">
        <div className="hhh">{state.loading ? <p>loading...</p>: select}</div>
        <div className="flag"> {showSelectedCountry}</div>
      </header>
    </div>
  );
}

export default App;
