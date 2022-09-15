import React, { useEffect, useState } from "react";
import axios from "axios";
// import { Users } from "../../Users/Users";
import './Inputs.css' 

export const Inputs = () => {


  const [formInputs, setFormInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    sex: "male",
    

  });
  const [users, setUsers] = useState([]);
  const[message,  setMessage] = useState('');
  const [loading, setLoading] = useState(false);



 useEffect(() => {
(async()=>{
  try {
    const {data} = await axios.get('http://localhost:3001/users');
    console.log(data)
    setMessage(data.message)
    setUsers(data.data);
    document.title = `${users.length} users left`
  } catch (error) {
    setMessage(error)
    
  }



})();
 },[users.length])
  


//controlled components name is hardcoded value is dynamic event target value
  const handeleInputs = (event) => {
    const { value, name } = event.target;
    setFormInputs({ ...formInputs, [name]: value });
  };


  //submit user setusers all of previus and user from inputs
  const handleSubmit = (e) => {
    e.preventDefault();
  if (formInputs.id) {
     const updatedUser = {...formInputs}
     axios.put(`http://localhost:3001/users/${formInputs.id}`,updatedUser)
     .then(({data})=>{
       console.log('put request',data)
       setMessage(data.message)
     
     })
   } else {
    

    const user= {...formInputs, id:new Date().toString()}
    axios.post('http://localhost:3001/users',user)
    .then(({data})=>{
      console.log(data.message,'post request')
      setMessage(data.message)
    })
    
  
  }
  setFormInputs({
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    sex: "" ,
  
  })
};

  
//removing user by filtering with id
  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/users/${id}`)
        .then(({data})=>{
          console.log('delete request',data)
          setMessage(data.message)
        })
    
  
 
  }

  //onclick trying to assign input values to user values which was filtered by id
  const handleEdit = (_id) => {


    let userForInput = users.find( user => user._id === _id)
  
    setFormInputs({
        firstName:userForInput.firstName,
        lastname:userForInput.lastName,
        email: userForInput.email,
        age:userForInput.age,
        sex: userForInput.sex,
        id:_id
      })
  
      
  console.log(formInputs,'put req')
   
  }
 

 

  return (
    <div  className="inputs-wrapper">
      <h1>{message}</h1>
      <form onSubmit={handleSubmit} className="form">
       
          <input
            type="text"
            value={formInputs.firstName}
            onChange={handeleInputs}
            name="firstName"
            placeholder="First Name"
            required
            minLength={5}
          />
         
          <input
            type="text"
            value={formInputs.lastName}
            onChange={handeleInputs}
            name="lastName"
            placeholder="lastName"
            required
            minLength={3}
          />
      
          <input
            type="email"
            value={formInputs.email}
            onChange={handeleInputs}
            name="email"
            placeholder="email address"
            required
          />{" "}
       
          <input
            type="number"
            value={formInputs.age}
            onChange={handeleInputs}
            name="age"
            placeholder="age"
            required
            min={18}
          />{" "}
          <div className="select-gender">
          <select onChange={handeleInputs} name="gender" value={ formInputs.sex}>
          <option value="male">male</option>
          <option value="female">female</option>
        </select>{" "}
        <button className="submit-btn" type="submit">{formInputs.id? 'edit':'Submit'} </button>
          </div>
     
     
      
        
        
      </form>

<div className="users-wrapper">
{
         users.length > 0 && users.map( user => {
        const { firstName, lastName, email, age, sex, _id } = user;
        return (
          <div key={_id} className="user">
            <p>Name : {firstName}</p>
            <p>Lastname : {lastName}</p>
            <p>Email : {email}</p>
            <p>Age : {age}</p>
            <p>Sex : {sex}</p>

            <div className="user-buttons">
            <button onClick={()=>handleEdit(_id)}>edit</button>
            <button onClick={()=>handleDelete(_id)}>delete</button>
           { console.log(_id,'user id')}
            </div>
           
          </div>
      
        );
      })}  
</div>
    



    </div>
  );
  }
