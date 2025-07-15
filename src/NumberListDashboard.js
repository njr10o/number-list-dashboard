import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaFileUpload, FaFileExcel, FaCopy, FaFileImage, FaQrcode } from 'react-icons/fa';

export default function NumberListDashboard() {
  const [country, setCountry] = useState('India');
  const [countries, setCountries] = useState([]);
  const [numberStats, setNumberStats] = useState({});

  useEffect(() => {
    axios.get('/api/countries')
      .then(res => setCountries(res.data))
      .catch(() => setCountries([{ name: 'India', flag: '🇮🇳' },
    { name: 'USA', flag: '🇺🇸' },   
    { name: 'UK', flag: '🇬🇧' },
    { name: 'Canada', flag: '🇨🇦' },
    { name: 'Australia', flag: '🇦🇺' },
    { name: 'Germany', flag: '🇩🇪' },
    { name: 'France', flag: '🇫🇷' },
    { name: 'Japan', flag: '🇯🇵' },
    { name: 'China', flag: '🇨🇳' },
    { name: 'Brazil', flag: '🇧🇷' },
    { name: 'Italy', flag: '🇮🇹' },
    { name: 'Spain', flag: '🇪🇸' },
    { name: 'Netherlands', flag: '🇳🇱' },
    { name: 'Sweden', flag: '🇸🇪' },
    { name: 'Norway', flag: '🇳🇴' },
    { name: 'Russia', flag: '🇷🇺' },
    { name: 'South Korea', flag: '🇰🇷' },
    { name: 'Mexico', flag: '🇲🇽' },
    { name: 'Argentina', flag: '🇦🇷' },
    { name: 'South Africa', flag: '🇿🇦'} ]));

    axios.get('/api/number-stats')
      .then(res => setNumberStats(res.data))
      .catch(() => setNumberStats({
        total: 500,
        removeWrong: 100,
        removeSame: 100,
        crazyNumbers: 100,
        textNumbers: 100,
        activeWhatsapp: 100,
      }));
  }, []);

  const handleCopy = () => navigator.clipboard.writeText('Dummy number list');
  const handleExcel = () => alert('Excel upload triggered');
  const handleScan = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const video = document.createElement('video');
      video.srcObject = stream;
      video.play();
      document.body.appendChild(video);
      alert('Camera opened for scanning. Close it manually when done.');
    } catch {
      alert('Camera access denied or not available.');
    }
  };
  const handleJPG = () => document.getElementById('jpgInput').click();
  const handlePNG = () => document.getElementById('pngInput').click();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 bg-cover bg-center text-white font-sans" style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/connected.png')` }}>
      <input type="file" id="jpgInput" accept="image/jpeg" style={{ display: 'none' }} onChange={() => alert('JPG selected')} />
      <input type="file" id="pngInput" accept="image/png" style={{ display: 'none' }} onChange={() => alert('PNG selected')} />

      <div className="backdrop-blur-xl bg-white bg-opacity-10 border border-white border-opacity-20 rounded-2xl p-6 w-[400px] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]">
        <div className="mb-5">
          <label className="block font-semibold mb-1">Select Country</label>
          <div className="flex items-center space-x-2">
            <select value={country} onChange={(e) => setCountry(e.target.value)} className="flex-1 px-3 py-2 rounded-lg bg-white bg-opacity-20 border border-white border-opacity-30 focus:outline-none text-black">
              {countries.map(c => (
                <option key={c.name} value={c.name} className="text-black">{c.flag} {c.name}</option>
              ))}
            </select>
            <button className="px-2 py-1 border border-white border-opacity-30 rounded text-xs shadow">Follow Up Calls</button>
            <button className="px-2 py-1 border border-white border-opacity-30 rounded text-xs shadow">Chat History</button>
          </div>
        </div>

        <div className="mb-5">
          <label className="block font-semibold mb-1">Upload Number List</label>
          <div className="grid grid-cols-6 gap-2 text-[10px] text-center">
            <IconButton icon={<FaCopy />} label="Copy" onClick={handleCopy} />
            <IconButton icon={<FaFileExcel />} label="Excel" onClick={handleExcel} />
            <IconButton icon={<FaQrcode />} label="Scan" onClick={handleScan} />
            <IconButton icon={<FaFileImage />} label="JPG" onClick={handleJPG} />
            <IconButton icon={<FaFileImage />} label="PNG" onClick={handlePNG} />
            <div>
              <button className="flex justify-center items-center bg-blue-500 p-2 rounded shadow w-full">
                <FaFileUpload />
              </button>
              <div>Upload</div>
            </div>
          </div>
        </div>

        <div className="bg-white bg-opacity-10 rounded-xl p-3">
          <p className="text-center font-bold mb-2">{numberStats.total} Total Number</p>
          <ul className="space-y-1 text-xs">
            <ListItem color="text-red-500" text={`${numberStats.removeWrong} Total No List Remove Wrong Numbers`} showIcon />
            <ListItem color="text-orange-400" text={`${numberStats.removeSame} Total No List Remove Same Numbers`} showIcon />
            <ListItem color="text-yellow-400" text={`${numberStats.crazyNumbers} Total No LzyCrazy Numbers`} />
            <ListItem color="text-gray-200" text={`${numberStats.textNumbers} Total No List Text Numbers`} />
            <ListItem color="text-green-400" text={`${numberStats.activeWhatsapp} Total Active WhatsApp Numbers`} />
          </ul>
        </div>
      </div>
    </div>
  );
}

const IconButton = ({ icon, label, onClick }) => (
  <div className="flex flex-col items-center">
    <button onClick={onClick} className="flex justify-center items-center bg-white bg-opacity-20 border border-white border-opacity-30 p-2 rounded shadow">{icon}</button>
    <div>{label}</div>
  </div>
);

const ListItem = ({ color, text, showIcon }) => (
  <li className={`flex justify-between ${color}`}>
    <span>{text}</span>
    {showIcon && <span>✖</span>}
  </li>
);
