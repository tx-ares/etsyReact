import React from 'react'
import ReactDOM from 'react-dom'
import Models from './models.js'
import {Component} from 'react'


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
						<SliderFrame />
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

export const SlideShow = React.createClass({

		render: function() {
			return  (
				<div id="slideshow">
	   				<div>
	     				<img className="slideImg" src={'http://lifemusicmedia.com/wp-content/uploads/2014/04/2014_KillswitchEngage_09-L.jpg'} />
	   				</div>
	   				<div>
	     				<img className="slideImg" src={'http://www.overdrive.ie/wp-content/uploads/2013/10/Killswitch-Engage-live.jpg'} />
   					</div>
	   				<div>
	     				<img className="slideImg" src={'http://concart.net/files/2016/07/killswitch_engage_live_chicago_open_air_2016-03-1918x1280.jpg'} />
	   				</div>

	   				<div>
	     				<img className="slideImg" src={'http://hmmagazine.com/wp-content/themes/hm2016/timthumb.php?src=http://cdn.hmmagazine.com/wp-content/uploads/2016/03/06122448/for-today-3.jpg&w=1200&zc=1'} />
	   				</div>
   					
				</div>
	    	)
		}
})

// export const Slider = React.createClass({
// 	render: function() {
// 		return (
// 		<div id="wowslider-container1">
// 			<div className="ws_images">
// 				<ul>
// 					<li><img src="data1/images/adamd.jpg" alt="" title="" id="wows1_0"/></li>
// 					<li><img src="data1/images/betweentheburiedandme1.jpg" alt="" title="" id="wows1_1"/></li>
// 					<li><img src="data1/images/bornofosiris1.jpg" alt="" title="" id="wows1_2"/></li>
// 					<li><img src="data1/images/dayseeker1.jpg" alt="" title="" id="wows1_3"/></li>
// 					<li><img src="data1/images/jesseleach.jpg" alt="" title="" id="wows1_4"/></li>
// 					<li><img src="data1/images/jobforacowboy1.jpg" alt="" title="" id="wows1_5"/></li>
// 					<li><img src="data1/images/live1.jpg" alt="" title="" id="wows1_6"/></li>
// 					<li><img src="data1/images/megadeth1.jpg" alt="" title="" id="wows1_7"/></li>
// 					<li><img src="data1/images/soad1.jpg" alt="" title="" id="wows1_8"/></li>
// 					<li><img src="data1/images/tigersjaw2.jpg" alt="" title="" id="wows1_9"/></li>
// 					<li><img src="data1/images/underoathlive1.jpg" alt="" title="" id="wows1_10"/></li>
// 					<li><img src="data1/images/adtr1.jpg" alt="" title="" id="wows1_11"/></li>
// 					<li><img src="data1/images/adtr2.jpg" alt="" title="" id="wows1_12"/></li>
// 					<li><img src="data1/images/deftones1.jpg" alt="" title="" id="wows1_13"/></li>
// 					<li><img src="data1/images/kse1.jpg" alt="" title="" id="wows1_14"/></li>
// 					<li><a href="http://wowslider.com/vi"><img src="data1/images/tigersjaw1.jpg" alt="cssslider" title="" id="wows1_15"/></a></li>
// 					<li><img src="data1/images/trivium1.jpg" alt="" title="" id="wows1_16"/></li>
// 				</ul>
// 			</div>
// 			<div className="ws_bullets">
// 				<div>
// 					<a href="#" title=""><span><img src="data1/tooltips/adamd.jpg" alt=""/>1</span></a>
// 					<a href="#" title=""><span><img src="data1/tooltips/betweentheburiedandme1.jpg" alt=""/>2</span></a>
// 					<a href="#" title=""><span><img src="data1/tooltips/bornofosiris1.jpg" alt=""/>3</span></a>
// 					<a href="#" title=""><span><img src="data1/tooltips/dayseeker1.jpg" alt=""/>4</span></a>
// 					<a href="#" title=""><span><img src="data1/tooltips/jesseleach.jpg" alt=""/>5</span></a>
// 					<a href="#" title=""><span><img src="data1/tooltips/jobforacowboy1.jpg" alt=""/>6</span></a>
// 					<a href="#" title=""><span><img src="data1/tooltips/live1.jpg" alt=""/>7</span></a>
// 					<a href="#" title=""><span><img src="data1/tooltips/megadeth1.jpg" alt=""/>8</span></a>
// 					<a href="#" title=""><span><img src="data1/tooltips/soad1.jpg" alt=""/>9</span></a>
// 					<a href="#" title=""><span><img src="data1/tooltips/tigersjaw2.jpg" alt=""/>10</span></a>
// 					<a href="#" title=""><span><img src="data1/tooltips/underoathlive1.jpg" alt=""/>11</span></a>
// 					<a href="#" title=""><span><img src="data1/tooltips/adtr1.jpg" alt=""/>12</span></a>
// 					<a href="#" title=""><span><img src="data1/tooltips/adtr2.jpg" alt=""/>13</span></a>
// 					<a href="#" title=""><span><img src="data1/tooltips/deftones1.jpg" alt=""/>14</span></a>
// 					<a href="#" title=""><span><img src="data1/tooltips/kse1.jpg" alt=""/>15</span></a>
// 					<a href="#" title=""><span><img src="data1/tooltips/tigersjaw1.jpg" alt=""/>16</span></a>
// 					<a href="#" title=""><span><img src="data1/tooltips/trivium1.jpg" alt=""/>17</span></a>
// 				</div>
// 			</div>
// 				<div className="ws_script" style="position:absolute;left:-99%"><a href="http://wowslider.com">bootstrap carousel</a> by WOWSlider.com v8.7.1m
// 				</div>
// 			<div className="ws_shadow"></div>
// 		</div>	

// 		)
// 	}
// })

export const SliderFrame = React.createClass({
	render: function () {
		return (
			
			<iframe src={"wowslider-iframe.html"} style="width:800px;height:600px;max-width:100%;overflow:hidden;border:none;padding:0;margin:0 auto;display:block;" marginheight="0" marginwidth="0"></iframe>
			
		)
	}
})

export const MainImg = React.createClass({
	render: function() {
		return (
				<div>
	     			<img src='http://lifemusicmedia.com/wp-content/uploads/2014/04/2014_KillswitchEngage_09-L.jpg' />
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
			return  (
				<header>
	        			<h1><a href="#home">Riffsy</a></h1>
	        			<div className="iconBox">
	        				<a href="#home"><i className="fa fa-home"></i></a>
	        				<i className="fa fa-heart"></i>
	        				<i className="fa fa-user"></i>
	        				<i className="fa fa-shopping-cart" aria-hidden="true"></i>
	        			</div>
	    		</header>
	    	)
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

