import "./App.css";
import { useEffect, useState, useRef, useMemo } from "react";
import { UserList } from "./components/UsersList";
import { SortBy, type User } from "./types.d";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [showColors, setShowColors] = useState(false);
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE);
  const [filterCountry, setFilterCountry] = useState<string | null>(null);
  const originalUsers = useRef<User[]>([]);

  const toogleSortByCountry = () => {
    const newSortingValue =
      sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE;
    setSorting(newSortingValue);
  };

  const toggleColors = () => {
    setShowColors(!showColors);
  };

  const handleDelete = (email: string) => {
    const filteredUsers = users.filter((user) => user.email !== email);
    setUsers(filteredUsers);
  };

  const handleCangeSort = (sort: SortBy) => {
    setSorting(sort);
  };

  useEffect(() => {
    fetch("https://randomuser.me/api/?page=3&results=100&seed=abc")
      .then(async (res) => await res.json())
      .then((data) => {
        setUsers(data.results);
        originalUsers.current = data.results;
      });
  }, []);

  const filteredUsers = useMemo(() => {
    return typeof filterCountry === "string"
      ? users.filter((user) => {
          return user.location.country
            .toLowerCase()
            .includes(filterCountry.toLowerCase());
        })
      : users;
  }, [users, filterCountry]);

  const sortedUsers = useMemo(() => {
    if (sorting === SortBy.NONE) {
      return filteredUsers;
    }

    if (sorting === SortBy.NAME) {
      return filteredUsers.toSorted((a, b) => {
        return a.name.first.localeCompare(b.name.first);
      });
    }

    if (sorting === SortBy.LAST) {
      return filteredUsers.toSorted((a, b) => {
        return a.name.last.localeCompare(b.name.last);
      });
    }

    if (sorting === SortBy.COUNTRY) {
      return filteredUsers.toSorted((a, b) => {
        return a.location.country.localeCompare(b.location.country);
      });
    }

    return filteredUsers;
  }, [filteredUsers, sorting]);

  return (
    <div className="App">
      <header>
        <h1>Prueba Tecnica</h1>
        <button onClick={toggleColors}>Colorear filas </button>
        <button onClick={toogleSortByCountry}>
          {sorting === SortBy.COUNTRY
            ? "No ordenar por pais"
            : "Ordenar por pais"}
        </button>
        <button onClick={() => setUsers(originalUsers.current)}>
          Resetear Estado
        </button>
        <input
          type="text"
          placeholder="Buscar pasis ..."
          onChange={(e) => setFilterCountry(e.target.value)}
        />
      </header>
      <main>
        <UserList
          users={sortedUsers}
          showColors={showColors}
          deleteUsers={handleDelete}
          changeSorting={handleCangeSort}
        />
      </main>
    </div>
  );
}

export default App;
