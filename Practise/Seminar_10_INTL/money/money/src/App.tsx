import { useState, useEffect } from 'react'

import './App.css'

function App() {
  const [error, setError] = useState<string | null>(null);
  const [exchangeRates, setExchangeRates] = useState<{ [key: string]: number | null }>({});
  const [timestamp, setTimestamp] = useState();
  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await fetch('https://v1.apiplugin.io/v1/currency/X5uVKrZZ/rates?source=RUB', {
          method: 'get',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        const data = await response.json()
        console.log(data);
        setExchangeRates(data.rates);
        setTimestamp(data.date);
      } catch (err: any) {
        setError(err.message);
      }
    };
    fetchExchangeRates();
  }, [])

  return (
    <div>
      <h1>Курсы валют</h1>
      {error ? (
        <p> Ошибка: {error}</p>
      ) : exchangeRates ? (
        <div>
          <p> Курс рубля:</p>
          <ul>
            <li>Доллар США:{' '} {exchangeRates.USD !== null && exchangeRates.USD !== undefined ? new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'USD' }).format(exchangeRates.USD) : 'N/A'}</li>
            <li>ЕВРО:{' '} {exchangeRates.EUR !== null && exchangeRates.EUR !== undefined ? new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'EUR' }).format(exchangeRates.EUR) : 'N/A'}</li>
            <li>ФУНТ СТЕРЛИНГА:{' '} {exchangeRates.GBP !== null && exchangeRates.GBP !== undefined ? new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'GBP' }).format(exchangeRates.GBP) : 'N/A'}</li>
          </ul>
          <p>Данные получены: {timestamp && new Intl.DateTimeFormat('ru-RU').format(new Date(timestamp))}</p>
        </div>
      ) : (
        <p>Загрузка....</p>
      )
      }
    </div>
  )
}

export default App
