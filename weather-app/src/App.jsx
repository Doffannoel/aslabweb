import { useState } from "react";
import axios from "axios";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [history, setHistory] = useState([]);

  const API_KEY = "38a9898b58994c87a45112553251203";

  const getWeather = async () => {
    if (!city) return alert("Masukkan nama kota dulu ya!");

    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
      );
      setWeather(response.data);

      // Menambahkan kota yang baru dicari ke history
      setHistory((prevHistory) => [...prevHistory, city]);
    } catch (error) {
      alert("Kota tidak ditemukan 😥");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center font-sans">
      <h1 className="text-3xl font-semibold text-blue-600 mb-8">
        🌤️ Weather Checker
      </h1>

      {/* Input dan tombol */}
      <div className="mb-6 flex space-x-4">
        <input
          type="text"
          placeholder="Masukkan nama kota..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={getWeather}
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
        >
          Cek Cuaca
        </button>
      </div>

      {/* Cuaca */}
      {weather && (
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8 w-80 text-center">
          <h2 className="text-2xl font-semibold mb-2">{weather.location.name}</h2>
          <p className="text-xl mb-2">🌡️ Suhu: {weather.current.temp_c}°C</p>
          <p className="text-lg mb-4">
            ☁️ Cuaca: {weather.current.condition.text}
          </p>
        </div>
      )}

      {/* History */}
      {history.length > 0 && (
        <div className="bg-white p-4 rounded-lg shadow-lg w-80">
          <h3 className="text-xl font-semibold mb-4">History Kota</h3>
          <ul className="space-y-2">
            {history.map((item, index) => (
              <li key={index} className="text-blue-600">
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
