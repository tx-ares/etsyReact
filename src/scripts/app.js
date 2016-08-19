import React from 'react'
import ReactDOM from 'react-dom'
import Models from 'models.js'
import Views from 'views.js'

const app = function() {

	const Header = React.createClass({
		render: () => {
			return <h1>YOLO</h1>
		}
	})

	ReactDOM.render(<Header/>,document.querySelector('.container'))
}

app()