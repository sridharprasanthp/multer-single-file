import axios from 'axios';
import { useState, useEffect } from 'react'
import './App.css';

function App() {
  const [singlefile, setSingleFile] = useState('');
  const [getFile, setGetFile] = useState([])

  function singlefileuploader(e) {
    setSingleFile(e.target.files[0])
  }

  function Uploadhandler(e) {
    e.preventDefault();
    if (singlefile.length === 0) {
      alert("Input file then Upload")
    } else {
      const formData = new FormData();
      formData.append('file', singlefile);
      axios.post('http://localhost:3001/SingleFile', formData).then(res => alert(res.data));
      setSingleFile('')
    }
  };

  useEffect(() => {
    axios.get('http://localhost:3001/').then(res => setGetFile(res.data))
  }, [getFile]);

  function deleting(id) {
    axios.delete(`http://localhost:3001/${id}`).then(res => alert(res.data))
  }

  const Serverhost = "http://localhost:3001/"

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Upload Image File</h1>
      <form onSubmit={Uploadhandler} className="App">
        <input type='file' onChange={singlefileuploader}/>  
        <label id="p">Upload only jpeg,jpg,png</label>
        <div>
          <input type="submit" value="Upload" /> &nbsp;
          <input type="reset" value="Remove" />
        </div>
      </form>
      {getFile.map((file, index) =>
        <figure key={index} id="flex">
          <img src={Serverhost + file.filename} style={{ width: "10em", height: "10em" }} alt="getimages" />
          <button onClick={() => deleting(file._id)} id="button">delete</button>
        </figure>)}
    </div>
  );
}

export default App;
