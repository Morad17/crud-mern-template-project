import { useState, useEffect } from 'react';
import Axios from 'axios'
import './App.css';

function App() {

  const [foodName, setFoodName ] = useState('')
  const [editFoodName, setNewFoodname ] = useState()
  const [days, setDays] = useState(0)
  const [editDays, setNewDays] = useState()
  const [foodList, setFoodList] = useState([])
  const [editIsClicked, setEditIsClicked] = useState(false)

  useEffect(()=> {
    Axios.get('http://localhost:3001/read').then((response) => {
      setFoodList(response.data)

    })
  }, [])

  const addToList = () => {
    Axios.post('http://localhost:3001/insert', {foodName:foodName, days:days})
    console.log(foodName + days);
  }
  
  const openOptions = () => {
    setEditIsClicked(true)
    if (editIsClicked === true) {
      document.getElementById('edit-options').style.display = "flex"
      setEditIsClicked(false)
    } else {
      document.getElementById('edit-options').style.display = "none"
    }
    
  }

  return (
    <div className="App">
      <h1>Food Recipe</h1>
      <div className="column">
      <label htmlFor="">Food Name</label>
      <input type="text" onChange={(e) => {setFoodName(e.target.value)}}/>
      </div>
      <div className="column">
        <label htmlFor="">When Last Ate</label>
        <input type="number" onChange={(e) => {setDays(e.target.value)}}/>
      </div>
      
      
      <button className="submit-button"onClick={addToList}>Add to list</button>

    <hr />

      <h1>Food List</h1>
    <div className="food-list">
      {
        foodList.map((food, key)=> {
          return <div className="food-card" key={key}>
            <h3>{food.foodName}</h3>
            <h3>{food.lastAte}</h3>
            <div className="card-functions">
              <button className="edit" onClick={openOptions}>Edit</button>
              <button className="delete">Delete</button>
            </div>
            <div className="edit-options" id={'edit-options'}>
              <input type="text" onChange={(e)=>{setNewFoodname(e.target.value)}}placeholder="Edit Food Name" />
              <input type="number" onChange={(e)=>{setNewDays(e.target.value)}} placeholder="Edit Last Ate"/>
              <button className="update">Update</button>
            </div>
          </div>
        })
      }
    </div>
      

    </div>
  );
}

export default App;
