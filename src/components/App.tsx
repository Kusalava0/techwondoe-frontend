import React, { useEffect, useState } from "react"
import Table from "./table";
import Header from "./header";
// import { User, COLUMNS } from "./columns";
import TableHandler from "./tableHandler";
// import AddUserForm from "./addUser";
import { User } from "./columns";
import './App.css'
import Paginate from "./PaginationTable";


const App = () => {

  const [usersData, setUsersData] = useState([]);
  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    await fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((data) => setUsersData(data))
      .catch((err) => {
        console.log(err)
      })
  }

  const [addUsersData, setAddUsersData] = useState<User[]>([]);
  useEffect(() => {
    fetchData();
  }, [])

  const addUser = (user: User) => {
    setAddUsersData([...addUsersData, user]);
  };

  // console.log(usersData)
  return (
    <div>
      {/* <Header></Header> */}
      {/* <Table></Table> */}
      {/* <AddUserForm users={usersData} addUser={addUser} /> */}
      <TableHandler></TableHandler>
    </div>
  )
}

export default App;

