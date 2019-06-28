import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

// creating class and constructor, then set state on all of the frinds info
class App extends Component {
  constructor() {
    super()
    this.state = {
      friends: [],
      name: "",
      age: "",
      email: "",
      id: ""
    }
  }


//  calling server for data and logging the error or list in console
   getData = () => {
    axios.get('http://localhost:5000/friends')
    .then(response => {
      this.setState({
        friends:response.data
      });
      console.log(this.state.friends)
    })
    .catch(err => {
      console.log(err);
    })
  }
  
  componentDidMount() {
    this.getData();
   };

   handleInput = event => {
     this.setState({[event.target.name]: event.target.value});
   }

// adding new friend to list, posting it
   addFriend = () => {
    const newFriend = {
      name: this.state.name,
      age: Number(this.state.age),
      email: this.state.email,
      id: this.state.counter + 1
    }
    axios.post(('http://localhost:5000/friends'), newFriend) 
      .then(friendSent => {
        this.getData();
      })
      .catch(err => {
        console.log(err);
      });
      this.setState( {
        name: '', age: '', email: '', counter: newFriend.id
      })
   };
// delete friend from list via delete function
   deleteFriend = (friendId) => {
    axios.delete(`http://localhost:5000/friends/${friendId}`)
    .then(response => {
      this.getData()
    }).catch(err => {
      console.log(err)
    })
   }
// update friend function
   updateFriend = () => {
     this.setState({
       updateFriend: !this.state.updateFriend
     })
   }

// rendering the friend list to page
  render() {
    return (
      <div>
        <div className="friendContainer">
          {/* map friends and add the onlcik events for updating and deleting */}
          {this.state.friends.map(friend => (
            <div className="friendCard">
              <this.Friends key={friend.id} friend={friend}/>
              <button onClick={() => this.deleteFriend(friend.id)}>Delete</button>
              <button onClick={this.updateFriend}>Edit</button>
              {/* adding form for updating info */}
              {this.state.updateFriend ? 
              <div>
                <input type="text" onChange={this.handleInput} placeholder="Name" name="name" value= {this.state.name}/>
                <input type="text" onChange={this.handleInput} placeholder="Age" name="age" value= {this.state.age}/>
                <input type="text" onChange={this.handleInput} placeholder="Email" name="email" value= {this.state.email}/>
                <button>Update</button>
              </div>: null}

            </div>
          ))}
        </div> 
        {/* adding form for adding a new friend */}
        <input type="text" onChange={this.handleInput} placeholder="Name" name="name" value= {this.state.name}/>
        <input type="text" onChange={this.handleInput} placeholder="Age" name="age" value= {this.state.age}/>
        <input type="text" onChange={this.handleInput} placeholder="Email" name="email" value= {this.state.email}/>
        <button onClick={this.addFriend }>Add New Friend</button>      
      </div>
    );
  }
// render friend info to page
  Friends({friend}) {
    const{name, age, email, id} = friend
    return(
        <div>
          <div className="friendInfo">{name}</div>
          <div className="friendInfo">{age}</div>
          <div className="friendInfo">{email}</div>
          <div className="friendInfo">{id}</div>
        </div>
    )
  }
  
}


export default App;