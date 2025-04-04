'use client';

import { useState } from 'react';

export default function Home() {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [digipin, setDigipin] = useState('');

  const Get_DIGIPIN = (lat: number, lon: number) => {
    const L = [
      ['F', 'C', '9', '8'],
      ['J', '3', '2', '7'],
      ['K', '4', '5', '6'],
      ['L', 'M', 'P', 'T'],
    ];

    let vDIGIPIN = '';

    let row = 0, column = 0;
    let MinLat = 2.5, MaxLat = 38.50, MinLon = 63.50, MaxLon = 99.50;
    const LatDivBy = 4, LonDivBy = 4;
    let LatDivDeg = 0, LonDivDeg = 0;

    if (lat < MinLat || lat > MaxLat || lon < MinLon || lon > MaxLon) {
      return 'Coordinates Out of Range';
    }

    for (let Lvl = 1; Lvl <= 10; Lvl++) {
      LatDivDeg = (MaxLat - MinLat) / LatDivBy;
      LonDivDeg = (MaxLon - MinLon) / LonDivBy;

      let NextLvlMaxLat = MaxLat;
      let NextLvlMinLat = MaxLat - LatDivDeg;

      for (let x = 0; x < LatDivBy; x++) {
        if (lat >= NextLvlMinLat && lat < NextLvlMaxLat) {
          row = x;
          break;
        } else {
          NextLvlMaxLat = NextLvlMinLat;
          NextLvlMinLat = NextLvlMaxLat - LatDivDeg;
        }
      }

      let NextLvlMinLon = MinLon;
      let NextLvlMaxLon = MinLon + LonDivDeg;

      for (let x = 0; x < LonDivBy; x++) {
        if (lon >= NextLvlMinLon && lon < NextLvlMaxLon) {
          column = x;
          break;
        } else if ((NextLvlMinLon + LonDivDeg) < MaxLon) {
          NextLvlMinLon = NextLvlMaxLon;
          NextLvlMaxLon = NextLvlMinLon + LonDivDeg;
        } else {
          column = x;
        }
      }

      if (Lvl === 1 && L[row][column] === '0') {
        return 'Out of Bound';
      }

      vDIGIPIN += L[row][column];

      if (Lvl === 3 || Lvl === 6) {
        vDIGIPIN += '-';
      }

      MinLat = NextLvlMinLat;
      MaxLat = NextLvlMaxLat;
      MinLon = NextLvlMinLon;
      MaxLon = NextLvlMaxLon;
    }

    return vDIGIPIN;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);
    const result = Get_DIGIPIN(lat, lon);
    setDigipin(result);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6">
             <center>
          <h1 className="text-2xl font-bold text-center leading-relaxed">
            Centre of Excellence in Land Administration and Management
            <br />
            Administrative Training Institute (ATI), Mysuru, Karnataka
            <br />
            An Initiative of Department of Land Resources, Ministry of Rural
            Development, Government of India
          </h1>
        </center><br/><br/>
      <h1 className="text-2xl font-bold mb-4 mt-[1rem] text-amber-100">DIGIPIN Generator</h1>
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
        <input
          type="number"
          placeholder="Latitude"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          step="0.000001"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          placeholder="Longitude"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          step="0.000001"
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Generate DIGIPIN
        </button>
      </form>

      {digipin && (
        <div className="mt-6 text-lg">
          <strong>DIGIPIN:</strong> {digipin}
        </div>
      )}
        <footer className="text-sm text-center mt-[200px] w-full align-bottom">
  <div className="flex flex-col sm:flex-row justify-between items-center gap-2 px-4">
    <p>
      Application by: Sumanth M, Centre of Excellence in Land Administration
      and Management, ATI, Mysuru
    </p>
    <p>
      Special Thanks to: Ministry of Communications Department of Posts for
      providing DIGIPIN Algorithm for Implementation
    </p>
    <a
      href="https://www.mydigipin.com/p/digipin.html"
      className="text-blue-600 underline"
      target="_blank"
      rel="noopener noreferrer"
    >
      Source: DIGIPIN Documentation
    </a>
  </div>
</footer>

    </main>
  );
}
