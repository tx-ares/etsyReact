import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import Models from './models.js'
import Views from './views.js'


const app = function() {

	const Header = React.createClass({
		render: () => {
			return <AllListingsView />
		}
	})

	ReactDOM.render(<Header/>,document.querySelector('.container'))
}

app()