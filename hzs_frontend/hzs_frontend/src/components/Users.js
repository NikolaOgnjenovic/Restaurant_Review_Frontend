import {useEffect, useState} from "react";

const Users = () => {
    const BASE_URL = 'https://hrana-u-blizini-api.herokuapp.com/user/';
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getData = () => {
          fetch(BASE_URL)
            .then((response) => response.json())
            .then((data) => setUsers(data));
        };
        getData();
      }, []);

      const onUserAdded = (user) => {
        fetch(BASE_URL, {
          method: "POST",
          body: JSON.stringify({
            email: user.email,
            password: user.password,
            username: user.username,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            let newUsers = [...users, data];
            setUsers(newUsers);
          });
      };
    return;
}

export default Users;