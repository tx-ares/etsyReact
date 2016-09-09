import React from 'react'
import ReactDOM from 'react-dom'
import Models from './models.js'

export const AllListingsView = React.createClass({

	//Here we will render the DOM with including all the prior subcomponents created. 
	render: function() {
		//Sanity check to make sure we still have our data.
		// console.log(this.props, "<<< Props")

		return  <div>
					<Body />
					{/* Keeping with the same principle as in our router, we must continue to pass props along to any components that require that data.	*/}
					<ListingContainer allColl={this.props.allColl}/>
					<Footer />
 		  		</div>
	}
})

export const SearchView = React.createClass({

	render: function() {
		return (
				<div>
					<Body />
					{/*  This time, when we call ListingContainer component we will pass searchColl as our collection.	*/}
					<ListingContainer allColl={this.props.searchColl}/>
					<Footer />
 		  		</div>		
 		  	)
	}
})

export const SingleListingView = React.createClass({
	_getParse: function(descr) {
		var ps = [],
			line = ''
		for (var i = 0; i < descr.length; i ++) {
			line += descr[i]
			if (descr[i] === '\n') {
				ps.push(<p className="description">{line}</p>)
				line = ''
			}
		}
		return ps
	},

	render: function() {

		var singleListing = this.props.listingMod

		return (
				<div>
					<Body />
						<div className='singleListing'>
							<div className="imgContainer">
								<img src={singleListing.get('Images')[0].url_570xN} />
							</div>
							<div className="details">
							<h3>{singleListing.get('title')}</h3>
							<p className="style">{singleListing.get('tags')[0]},{singleListing.get('tags')[1]}</p>
							<p><button className="etsyButton"><a href={singleListing.get('url')}>Buy it on Etsy.com for ${singleListing.get('price')}</a></button></p>
							{this._getParse(singleListing.get('description'))}
							</div>

						</div>
					<Footer />
				</div>
		)
	}
})

export const Body = React.createClass({
		render: () => {
			return <div>
						<Header />
						<Hamburguesa />
						<input type="checkbox" className="hamburguesa-menu-toggler"></input>
						<Nav />
						<SearchBar />
					</div>
		}
})

export const Footer = React.createClass({
		render: function() {
			return (
					<footer>
						<ul className="footer quickLinks">
	            			<li><h5><a href="https://github.com/txsadamwest">Github</a></h5></li>
	            			<li><h5><a href="https://medium.com/@txsadamwest">Blog</a></h5></li>
	            			<li><h5><a href="mailto:a.huerta@gmail.com">Contact</a></h5></li>
	            			<li><h5><a href="https://github.com/txsadamwest">Portfolio</a></h5></li>
	            			<p className="finePrint">&copy; TxsAdamWest 2016 All data is pulled from Etsy's API.  Very special thanks to them for letting me rip their api to make this. :) </p>
	        			</ul>
	   				</footer>
	   		)
		}
})

export const MainImg = React.createClass({
		render: function() {
			return  (
				<div className="mainImg">
	        		<img className="headlineImg" src="./images/AsILayDyingwallpaper.jpg"></img>
	    		</div>
	    	)
		}
})

export const SearchBar = React.createClass({

	_searchEnter : function(eventObj){
	if(eventObj.keyCode === 13) {
		// console.log(eventObj.target.value)
		location.hash = "search/" + eventObj.target.value
		eventObj.target.value = ''
		}
	},

	render: function() {
		return (
			<div className="search">
	     		<input onKeyDown={this._searchEnter} className="searchBar" type="text" placeholder="Search Riffsy" /><button className="searchButton">Search</button>
	       	</div>
			)
	}
})

export const Header = React.createClass({
		render: () => {
			return <header>
	        			<h1><a href="#home">Riffsy</a></h1>
	        			<div className="iconBox">
	        				<a href="#home"><i className="fa fa-home"></i></a>
	        				<i className="fa fa-heart"></i>
	        				<i className="fa fa-user"></i>
	        				<i className="fa fa-shopping-cart" aria-hidden="true"></i>
	        			</div>
	    			</header>
		}

})

export const Hamburguesa = React.createClass({
		render: function() {
			return  (
				<div className="hamburguesa">
	        			<hr></hr>
	        			<hr></hr>
	        			<hr></hr>
	    		</div>
	    	)
	    }
})

export const Nav = React.createClass({
		render: function() {
			return  (
					<nav>
		        		<ul className="quickLinks">
				            <li><a href="#search/guitars">Guitars</a></li>
				            <li><a href="#search/music">Music</a></li>
				            <li><a href="#search/guitar picks">Picks</a></li>
				            <li><a href="#search/music posters">Posters</a></li>
				            <li><a href="#search/band t's">Apparel</a></li>
				            <li><a href="#search/music patches">Sew on's</a></li>
				            <li><a href="#search/music stickers">Stickers</a></li>
				            <li><a href="#search/music phone cases">Cases</a></li>
		        		</ul>
	    			</nav>
	    	)
		}
})



export const Listing = React.createClass({

	render: function() {
		var model = this.props.listMod
		// console.log(model, "<<< Single listing rendered!")

		return ( <div className="listing" id={model.get('listing_id')}>

					<a href={"#itemListing/" + model.get('listing_id')}>
						<img src={model.get('Images')[0].url_570xN} /> 
					</a>
					<h5>{model.get('title')}</h5>
					<p className="style">{model.get('tags')[0]}{model.get('tags')[1]}</p>
					<button className="plus">+</button><p className="price">${model.get('price')}</p>
				</div>
		)
	}
})

export const ListingContainer = React.createClass({
	//We now grabbed the models from our collection in the render function below.
	_getJsxArray: function(modelArr) {
		//Any good array starts out empty. 
		var jsxArray = []
		//Sanity check.  Still good? Good.
		console.log(modelArr,"<<< _getJxsArray callback triggered!")
		//Heavy lifter here.  
		modelArr.forEach(function(model){
			console.log(model)
			//Every index is now pushed into our Listing scaffold component.  Which will then trigger Listing component's render function.
			jsxArray.push(<Listing listMod={model} /> )

		})
		//After each model is pushed into the array, return the array.
		return jsxArray


	},
	render: function() {

		return  (
			<div id="listingContainer">
				{this._getJsxArray(this.props.allColl.models)}
			</div>
		)
	}
})

