import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Table from '../util/Table'
import firebase from './firebase'
import './MainPage.css';

const MainPage = () => {


	const [victims, setVictims] = useState([])
	useEffect(() => {

		const unsubscribe = firebase
			.firestore()
			.collection("victims")
			.onSnapshot(snapshot => {
				const listVictims = snapshot.docs.map(doc => ({
					id: doc.id,
					...doc.data()
				}))
				setVictims(listVictims)
			})
			return () => unsubscribe()
	}, [])


	return (
		<body className="MainPage">
			<div className="Credit">
				Debtap by WeiHan
			</div>
			<div className="container">
				<div className="container-item">
					<Table victims={ victims } />
				</div>
				<div className="container-item">
					<Link 
							to = "/AddVictims"
							style= {{ 
								textDecoration: 'none', 
								color: '#898989',
								fontSize: '40px',
							}}
						>
							+
					</Link>
				</div>
			</div>
		</body>
	)

}

export default MainPage


