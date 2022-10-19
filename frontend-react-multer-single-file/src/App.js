import axios from 'axios';
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [singlefile, setSingleFile] = useState('');
  const [getFile, setGetFile] = useState([]);
  const [update, setUpdate] = useState('');

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

  function updater(e) {
    setUpdate(e.target.files[0]);
  }
  function updatenew(id) {
    if (update.length === 0) {
      alert("input file")
    }
    else {
      const formdata = new FormData();
      formdata.append('file', update);
      axios.post(`http://localhost:3001/UpdateFile/${id}`, formdata).then(res => alert(res.data));
      setUpdate(null)
    }
  }

  return (
    <div>
      <div className='App'>
      <h1>Upload Image File</h1>
      </div>
      <form onSubmit={Uploadhandler} className="App">
        <input type='file' onChange={singlefileuploader} />
        <label id="p">Upload only jpeg jpg png format file</label>
        <div>
          <input type="submit" value="Upload" /> &nbsp;
          <input type="reset" value="Clear" />
        </div>
      </form>
      <div id='imgalign'>
        {getFile.map((file, index) =>
          <figure key={index} id="flex">
            <img src={Serverhost + file.filename} style={{ width: "10em", height: "10em" }} alt="getimages" />
            <input type='file' onChange={updater} />
            <div>
              <input type="submit" value="Update" onClick={() => updatenew(file._id)} /> &nbsp;
              <button onClick={() => deleting(file._id)}>delete</button>
            </div>
          </figure>)}
      </div>
    </div>
  );
}

export default App;
