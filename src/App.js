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
    <div>
            <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={company}
          placeholder="Name"
          onChange={(e) => setCompany(e.target.value)}
        />

        <button type="submit">Create</button>

        <div className="data">{data ? <p>{data}</p> : null}</div>
      </form>
    </div>
  );
}

export default App;