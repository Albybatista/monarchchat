import './App.css';
import './App.js';

function App() {
  const [response, setResponse] = useState("");

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("FromAPI", data => {
      setResponse(data);
    });
  }, []);
  return (
    <div className="App">
      <p>hello world</p>
    </div>
  );
}

export default App;
