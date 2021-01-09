import { useState, useEffect } from 'react';
import firebase from './firebase';
import { useParams, Link } from 'react-router-dom';
import Table2 from '../util/Table2';
import './Victims.css';

const Victims = () => {

  const init = {Name: '', Debt: 0, Debtails: [], Type: ''}
  const [debtails, setDebtails] = useState(init)
  const { id } = useParams()
  const initDebtails = { id: null, amount: '', desc: '', type: '' }
  const [newDebtails, setNewDebtails] = useState(initDebtails)
  const ref = firebase.firestore().collection("victims").doc(id)

	useEffect(() => {
    
		const unsubscribe = ref
			.onSnapshot(doc => {
        setDebtails(doc.data())
      })
    return () => unsubscribe()
  }, [])

  const checkType = (val) => {

    if (val < 0) {
      return "Borrow"
    }
    else {
      return "Lend"
    }
  }

  const addEntry = (newDebtails, type) => {

    var newDebt = debtails.Debt 
    console.log(newDebt)
    console.log(newDebtails.amount)

    if (type === "Lend") {
      newDebt += parseFloat(newDebtails.amount)
    }
    else {
      newDebt -= parseFloat(newDebtails.amount)
    }
    var newType = checkType(newDebt)
    newDebtails.type = type
    newDebtails.id = Math.random()

    ref
    .update({
      Type : newType,
      Debt : Math.round(newDebt * 100) / 100,
      Debtails : firebase.firestore.FieldValue.arrayUnion(newDebtails)
    })
  }

  const deleteEntry = (debtlete) => {

    var newDebt = debtails.Debt
    if (debtlete.type === "Lend") {
      newDebt -= parseFloat(debtlete.amount)
    }
    else {
      newDebt += parseFloat(debtlete.amount)
    }
    var newType = checkType(newDebt)
    ref
    .update({
      Type : newType,
      Debt : newDebt,
      Debtails : firebase.firestore.FieldValue.arrayRemove(debtlete)
    })
  }

  const deleteAll = () => {

    ref
    .update({
      Debt : 0,
      Debtails : []
    })

  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setNewDebtails({ ...newDebtails, [name]: value })
  }

  const deleteVictim = () => {
    ref.delete()  
  }

	const absolute = (val) => {
		return Math.abs(val)
  }
  
  return(
    
		<body className="Background">

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

      <div className="container-victims">




        <div className="container-victims-item">
          <div className="victim-name">
            {debtails.Name}
            <Link 
                onClick={deleteVictim}
                to={`/`}
                style={{ 
                  textDecoration: 'none', 
                  color: '#898989',
                  fontSize: '20px',
                  paddingLeft: '20px'
                }}
            >
              X
            </Link>
          </div>
          <div 
            style={{fontSize: '40px'}}
            className={debtails.Type}
          >
            {absolute(debtails.Debt)}
          </div>
        </div>






        <div className="container-victims-item">
          <div className="form-victims">
            <form onSubmit={(event) => {
              event.preventDefault()
              setNewDebtails(initDebtails)
            }}
            >
              <input 
                placeholder = "How much?"
                value = {newDebtails.amount}
                name = "amount"
                type="number"
                onChange={handleInputChange}
              />
              <br></br>
              <input 
                placeholder = "Why?"
                value = {newDebtails.desc}
                name = "desc"
                type="text"
                onChange={handleInputChange}
              />
              <br></br>
              <div className="btn-victims">
                <button 
                    onClick={() => addEntry(newDebtails, "Lend")}
                    className="btn-lend"
                >
                  Lend
                </button>
                <button 
                    onClick={() => addEntry(newDebtails, "Borrow")}
                    className="btn-borrow"
                >
                  Borrow
                </button>
              </div>

            </form>
          </div>
        </div>






        <div className="container-victims-item">
          <Table2 debtails={debtails.Debtails} deleteEntry={deleteEntry}/>
        </div>







        <div className="container-victims-item">
          <Link 
              onClick={deleteAll}
              to={`/`}
              style={{ textDecoration: 'none', color: 'white'}}
            >
              CLEAR
          </Link>
        </div>






      </div>
		</body>
  )
}

export default Victims;



//---backup

// import { useState, useEffect } from 'react';
// import firebase from './firebase';
// import { useParams, Link } from 'react-router-dom';
// import Table2 from '../util/Table2';

// const Victims = () => {

//   const [name, setName] = useState()
//   const [debt, setDebt] = useState()
//   const [debtails, setDebtails] = useState([])
//   const { id } = useParams()
//   const initDebtails = { id: null, amount: '', desc: '', type: '' }
//   const [newDebtails, setNewDebtails] = useState(initDebtails)
//   const ref = firebase.firestore().collection("victims").doc(id)
//   var num = 0

// 	useEffect(() => {
    
// 		const unsubscribe = ref
// 			.onSnapshot(doc => {
//         setDebtails(doc.data().Debtails)
//         setDebt(doc.data().Debt)
//         setName(doc.data().Name)
//       })
//     return () => unsubscribe()
//   }, [])


//   const addEntry = (newDebtails, type) => {

//     var newDebt = debt 

//     if (type === "Lend") {
//       newDebt += parseFloat(newDebtails.amount)

//     }

//     else {
//       newDebt -= parseFloat(newDebtails.amount)
//     }

//     newDebtails.type = type
//     newDebtails.id = debtails.length + 1

//     ref
//     .update({
//       Debt : newDebt,
//       Debtails : firebase.firestore.FieldValue.arrayUnion(newDebtails)
//     })
//   }

//   const deleteEntry = (debtlete) => {

//     var newDebt = debt

//     if (debtlete.type === "Lend") {
//       newDebt -= parseFloat(debtlete.amount)
//     }

//     else {
//       newDebt += parseFloat(debtlete.amount)
//     }

//     ref
//     .update({
//       Debt : newDebt,
//       Debtails : firebase.firestore.FieldValue.arrayRemove(debtlete)
//     })
//   }

//   const handleInputChange = (event) => {
//     const { name, value } = event.target
//     setNewDebtails({ ...newDebtails, [name]: value })
//   }

//   const deleteVictim = () => {
//     ref.delete()  
//   }

//   return(
// 		<div>
//       <div>
//         <h4>
//           <Link to="/">
//             Back Home
//           </Link>
//         </h4>
//         <h3>
//           {name} <br></br>
//           {debt}
//         </h3>
//       </div>
//       <div>
//         <form onSubmit={(event) => {
//           event.preventDefault()
//           setNewDebtails(initDebtails)
//         }}
//         >
//           <input 
//             placeholder = "Amount"
//             value = {newDebtails.amount}
//             name = "amount"
//             type="number"
//             onChange={handleInputChange}
//           />
//           <input 
//             placeholder = "Description"
//             value = {newDebtails.desc}
//             name = "desc"
//             type="text"
//             onChange={handleInputChange}
//           />
//           <button onClick={() => addEntry(newDebtails, "Lend")}>Lend</button>
//           <button onClick={() => addEntry(newDebtails, "Borrow")}>Borrow</button>
//         </form>
//       </div>
//       <Table2 debtails={debtails} deleteEntry={deleteEntry}/>
//       <div>
//         <Link 
//           onClick={deleteVictim}
// 				  to={`/`}
//           style={{ textDecoration: 'none', color: 'black'}}

// 			  >
//           Delete User
//         </Link>
//       </div>
// 		</div>
//   )
// }

// export default Victims;