import { SortBy, type User } from "../types.d";

interface Props {
  changeSorting: (sort: SortBy) => void;
  deleteUsers: (email: string) => void;
  showColors: boolean;
  users: User[];
}

export function UserList({
  changeSorting,
  deleteUsers,
  showColors,
  users,
}: Props) {
  return (
    <div>
      <table width={"100%"}>
        <thead>
          <tr>
            <th>Foto</th>
            <th className="pointer" onClick={() => changeSorting(SortBy.NAME)}>
              Nombre
            </th>
            <th className="pointer" onClick={() => changeSorting(SortBy.LAST)}>
              Apellidos
            </th>
            <th
              className="pointer"
              onClick={() => changeSorting(SortBy.COUNTRY)}
            >
              Pais
            </th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            const backgroundColor = index % 2 === 0 ? "#333" : "#555";
            const color = showColors ? backgroundColor : "transparent";

            return (
              <tr key={user.email} style={{ backgroundColor: color }}>
                <td>
                  <img
                    src={user.picture.thumbnail}
                    alt={`${user.name.first} ${user.name.last}`}
                  />
                </td>
                <td>{user.name.first}</td>
                <td>{user.name.last}</td>
                <td>{user.location.country}</td>
                <td>
                  <button
                    onClick={() => {
                      deleteUsers(user.email);
                    }}
                  >
                    borrar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
