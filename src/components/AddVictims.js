import { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import firebase from './firebase';
import './AddVictims.css';


function AddVictims () {
  
  const [Name, setName] = useState("")
  const Debtails = []
  const Type = "Lend"
  const Debt = 0
  let history = useHistory()


  const onSubmit = e => {
    e.preventDefault()
    firebase
      .firestore()
      .collection("victims")
      .add({
        Name,
        Debtails,
        Debt,
        Type

      })
      //reset form
      .then(() => 
        setName(""),
      )
      history.push("/")
  }

  return (
    <body className="body">
      <div>
      <Link 
						to = "/"
						style= {{ 
							textDecoration: 'none', 
              color: '#898989', 
              fontSize: '40px',
              paddingLeft: '15px'
						}}
					>
						{"="}
				</Link>
      </div>
      <div className="form">
        <form onSubmit={onSubmit}>
          <input
            color = "white"
            placeholder = "Type, enter."
            value = {Name}
            name = "name"
            onChange={e => setName(e.currentTarget.value)}
            type="text"
          />
          <div >
            {/* <button className="btn">
              + 
            </button> */}
          </div>
        </form>
      </div>
    </body>
  )
}

export default AddVictims;