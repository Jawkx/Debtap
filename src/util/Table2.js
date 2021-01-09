import React from 'react';

const Table2 = (props) => (
	<table>

			<tbody>
				{props.debtails.map((debtails) => (
					<tr key={debtails.id}>
						<td style = {{width: 150, height: 30}}>
								{debtails.desc}
						</td>
						<td className={debtails.type} style = {{width: 50}}>
							{debtails.amount}   
						</td>
						<td >
							<button 
								className="clear-btn"
								onClick={() => props.deleteEntry(debtails)}> 
									X 
							</button>
						</td>
					</tr>
				))}	
			</tbody>
	</table>
)

export default Table2