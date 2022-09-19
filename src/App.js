import React, { useState } from 'react';

function App() {
  const [data, setData] = useState('');
  const [company, setCompany] = useState('');

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("/api/message", {
        method: "POST",
        body: JSON.stringify({
          company: company,
        }),
      });
      let resJson = await res.json();
      if (res.status === 200) {
        console.log(res.body)
        setCompany("");
        setData(resJson.text)
      } else {
        setData("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='main'>
      <h3>Pitch my startup</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={company}
          placeholder="Company name, Industry"
          onChange={(e) => setCompany(e.target.value)}
        />

        <button type="submit">Generate Pitch</button>
      </form>
      <div className="data">{data ? <div className='result'><p>{data}</p></div> : null}</div>
    </div>
  );
}

export default App;