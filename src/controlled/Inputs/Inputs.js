import React, { useState } from "react";
// import { Users } from "../../Users/Users";

export const Inputs = () => {


  const [formInputs, setFormInputs] = useState({
    firstname: "",
    lastname: "",
    email: "",
    age: "",
    gender: "",

  });
  const [users, setUsers] = useState([]);
  


//controlled components name is hardcoded value is dynamic event target value
  const handeleInputs = (event) => {
    const { value, name } = event.target;
    setFormInputs({ ...formInputs, [name]: value });
  };


  //submit user setusers all of previus and user from inputs
  const handleSubmit = (e) => {
    e.preventDefault();
  
    setUsers([...users, formInputs] )
    setFormInputs({
        firstname: "",
        lastname: "",
        email: "",
        age: "",
        gender: "",
        id:userId
      })
  };
//removing user by filtering with id
  const handleDelete = (id) => {
    setUsers( users.filter( user => user.id !== id ) );
    console.log('delete',users)
 
  }

  //onclick trying to assign input values to user values which was filtered by id
  const handleEdit = (id) => {
    let userForInput = users.filter( user => user.id === id)
    console.log(userForInput,'edit')
  
    setFormInputs({
        firstname:userForInput.firstname,
        lastname:userForInput.lastname,
        email: userForInput.email,
        age:userForInput.age,
        gender: userForInput.gender,
        id:id
      })
     
  
   
  }
 

 

  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
        <div className="inputs">
          <input
            type="text"
            value={formInputs.firstname}
            onChange={handeleInputs}
            name="firstname"
          />
          Name <br />
          <input
            type="text"
            value={formInputs.lastname}
            onChange={handeleInputs}
            name="lastname"
          />
          Lastname <br />
          <input
            type="text"
            value={formInputs.email}
            onChange={handeleInputs}
            name="email"
          />{" "}
          email <br />
          <input
            type="text"
            value={formInputs.age}
            onChange={handeleInputs}
            name="age"
          />{" "}
          age <br />
          <select onChange={handeleInputs} name="gender" defaultValue='male'>
          <option value="male">male</option>
          <option value="female">female</option>
        </select>{" "}
        <button type="submit"> Submit User </button>
        </div>
      
        
        
      </form>


      {
         users && users.map((user) => {
        const { firstname, lastname, email, age, gender, id } = user;
        return (
          <div key={id} className="user">
            <p>name:{firstname}</p>
            <p>lastname:{lastname}</p>
            <p>email:{email}</p>
            <p>age:{age}</p>
            <p>gender:{gender}</p>

            
            <button onClick={()=>handleEdit(id)}>edit</button>
            <button onClick={()=>handleDelete(id)}>delete</button>
          </div>
      
        );
      })}  



    </div>
  );
  }
