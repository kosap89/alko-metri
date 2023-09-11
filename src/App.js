import "./App.css";
import { useState } from "react";

function App() {
  const [beers, setBeers] = useState(0);
  const [gender, setGender] = useState("");
  const [resultForMale, setResultForMale] = useState("");
  const [resultForFemale, setResultForFemale] = useState("");
  const [weight, setWeight] = useState(0);
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");

  function CalculateBloodAlcoholLevel(e) {
    e.preventDefault();
    const liters = beers * 0.33;
    const grams = liters * 8 * 4.5;
    const burning = weight / 10;
    const totalHours = parseFloat(hours || 0) + parseFloat(minutes || 0) / 60; // Tunnit + minuutit muunnettuna tunneiksi
    const gramsLeft = grams - burning * totalHours;
    const calculatedMaleBAC = gramsLeft / (weight * 0.7);
    const calculatedFemaleBAC = gramsLeft / (weight * 0.6);

    if (gender === "male") {
      const maleBAC = parseFloat(calculatedMaleBAC.toFixed(2));
      setResultForMale(maleBAC < 0 ? 0 : maleBAC);
    } else {
      const femaleBAC = parseFloat(calculatedFemaleBAC.toFixed(2));
      setResultForFemale(femaleBAC < 0 ? 0 : femaleBAC);
    }
  }

  return (
    <div id="container">
      <form onSubmit={CalculateBloodAlcoholLevel}>
        <div>
          <label>Gender</label>
          <select onChange={(e) => setGender(e.target.value)}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div>
          <label>Beers </label>
          <input
            type="number"
            value={beers}
            onChange={(e) => setBeers(e.target.value)}
          />
        </div>
        <div>
          <label>Weight in kg</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
        <div>
          <label>Time since last drink</label>
          <input
            type="number"
            placeholder="Hours.."
            value={hours}
            onChange={(e) => setHours(e.target.value)}
          />
          <input
            type="number"
            placeholder="Minutes.."
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">Calculate</button>
        </div>
      </form>
      {gender === "male" && (
        <div>Estimated Blood Alcohol Level for Male: {resultForMale}</div>
      )}
      {gender === "female" && (
        <div>Estimated Blood Alcohol Level for Female: {resultForFemale}</div>
      )}
    </div>
  );
}

export default App;
