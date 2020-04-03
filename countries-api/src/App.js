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
    <option className="App_select-option" key={country.name} value={country.name}>
      {country.name}
    </option>
  ));

  const selectedCountry = state.countries.filter(
    country => country.name === selectCountry
  );
  const showSelectedCountry = selectedCountry.map(selectCountry => (
    <div className="App_country-conteiner"key={selectCountry.name}>
     <img className="App_country flag" src={selectCountry.flag} alt={selectCountry.alpha3Code}></img>
      <p className="App_country ">{selectCountry.name}</p>
      <p className="App_country nativeName">({selectCountry.nativeName})</p>
      <p className="App_country capital">Capital city: {selectCountry.capital}</p>
      <p className="App_country capital">Language: {selectCountry.languages.map( (lang, index)=><span key={lang.iso639_1}> {(index? "," :"")+ lang.name}</span>)}</p>
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
       <header className="App_sellect">{state.loading ? <p>loading...</p>: select}</header>
      <main className="App-main">
       
        <div className="App_content"> {showSelectedCountry}</div>
      </main>
    </div>
  );
}

export default App;
