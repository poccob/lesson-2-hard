import React from 'react';
import UsersItem from './components/UsersItem'

function App() {
  const [users, setUsers] = React.useState([]);
  const [inputValue, setInputValue] = React.useState('');
  const [page, setPage] = React.useState(1);
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    setLoaded(false);
    fetch(`https://5c3755177820ff0014d92711.mockapi.io/users?page=${page}&limit=10`)
      .then((resp) => resp.json())
      .then((json) => {
        if (json.length > 0) {
          setUsers((oldUsers) => [...oldUsers, ...json]);
          setLoaded(true);
        } else {
          setLoaded('hideButton');
        };
      });
  }, [page]);

  const addUsers = () => {
    setPage((page) => ++page);
  }

  return (
    <div className="app">
      <input 
        type="text" 
        className="search" 
        placeholder="Поиск пользователя..." 
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <ul className="users">
        {
          users
          .filter((obj) => 
            (obj.name + obj.email).toLowerCase().includes(inputValue.toLowerCase()))
          .map((obj) => (
            <UsersItem 
              key={obj.name + obj.email} 
              name={obj.name} 
              email={obj.email}
            />
          ))
        }
      </ul>
      {
        loaded===false ? <div className="loading">Loading...</div> : ""
      }
      <button 
        onClick={addUsers} 
        className={loaded==="hideButton" ? "hideButton" : ""} 
        disabled={!loaded}>
          {loaded ? "Next 10 users" : "Wait..."}
      </button>
    </div>
  );
};

export default App;
