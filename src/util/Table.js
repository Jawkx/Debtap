import React from 'react';
import { Link } from 'react-router-dom';
import './Table.css';


const Table = (props) => {

	const absolute = (val) => {
		return Math.abs(val)
	}

	return(
		<table className="Table">
				<thead>
				</thead>
				<tbody>
					{props.victims.map((victims) => (
						<tr key={victims.id}>
							<td style = {{width: 200, height: 50}}>
								<Link 
								to={`/Victims/${victims.id}`}
								style={{ textDecoration: 'none', color: 'white'}}
								>
									{victims.Name}
								</Link>
							</td>
							<td 
								className={victims.Type}
								style = {{fontSize: "25px", fontFamily: "'Roboto Mono', monospace"}}
							>
								{absolute(victims.Debt)}
							</td>
						</tr>
					))}	
				</tbody>
		</table>
	)
}

export default Table