import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import Models from './models.js'
import Views from './views.js'


const app = function() {

	const Body = React.createClass({
		render: () => {
			return <div>
						<Header />
						<AllListingsView />
					</div>

		}
	})

	ReactDOM.render(<Body/>,document.querySelector('.container'))
}

app()