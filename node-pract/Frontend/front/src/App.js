import { useEffect, useState } from "react";

const API = "http://localhost:4000/files";

const App = () => {
  const [fileList, setFileList] = useState({ uploads: [], alarm: [] });
  const [selectedFileContent, setSelectedFileContent] = useState('');

  const [selectedFileName, setSelectedFileName] = useState('');
  console.log("state");

  const fetchFileContent = async (filename) => {
    try {
      const response = await fetch(`/files/${filename}`);
      console.log("my res",response);
      const content = await response.text();
      console.log(content,"my content");
      setSelectedFileContent(content);
      setSelectedFileName(filename);
    } catch (error) {
      console.error('Error fetching file content:', error);
    }
  };

  const fetchUsers = async (url) => {
    try {
      const res = await fetch(url);
      if (res.status === 200) {
        const data = await res.json();
        setFileList(data);
      } else {
        console.error("Request failed with status:", res.status);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchUsers(API);
  }, []);

  return (
    <>
      <div className="App">
        <h1>Uploads Folder Files</h1>
        <ul>
          {fileList.uploads.map((file, index) => (
            <li key={index} onClick={() => fetchFileContent(file)}>{file}</li>
          ))}
        </ul>

        <h2>Alarm Folder Files</h2>
        <ul>
          {fileList.alarm.map((file, index) => (
            <li key={index} onClick={() => fetchFileContent(file)}>{file}</li>
          ))}
        </ul>
        <div>
          <h2>File Content: {selectedFileName}</h2>
          <pre>{selectedFileContent}</pre>
        </div>
      </div>
    </>
  );
};

export default App;
