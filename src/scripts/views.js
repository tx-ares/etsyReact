import React from 'react'
import ReactDOM from 'react-dom'
import Models from './models.js'

export const Body = React.createClass({
		render: () => {
			return <div>
						{console.log("render fired!")}
						<Header />
						<AllListingsView />
					</div>

		}
})

export const Footer = React.createClass({
	render: () => {
		return <footer>
					<ul class="footer quickLinks">
            			<li><h5><a href="https://github.com/txsadamwest">Github</a></h5></li>
            			<li><h5><a href="https://medium.com/@txsadamwest">Blog</a></h5></li>
            			<li><h5><a href="mailto:a.huerta@gmail.com">Contact</a></h5></li>
            			<li><h5><a href="https://github.com/txsadamwest">Portfolio</a></h5></li>
            			<p class="finePrint">&copy; TxsAdamWest 2016 All data is pulled from Etsy's API.  Very special thanks to them for letting me rip their api to make this. :) </p>
        			</ul>
   				</footer>
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

export const AllListingsView = React.createClass({

	_navToItem: function(evt){

		var listingId = evt.currentTarget.getAttribute('id')
		console.log(listingId, "<<<<<< listingId is ")

		location.hash = 'itemListing/' + listingId
	},

	render: () => {
		return <div class="listing" id={listingsArr[i].get('listing_id')}><img src="listingImgUrl"></img>
 		  	<h5>  listingTitle </h5>
 		  	<p class="style">{listingsArr[i].get('tags')[0]}{listingsArr[i].get('tags')[1]}</p>
 		  	<button class="plus"></button><p class="price"> {listingsArr[i].get('price')}</p>
 		  </div>
	}
})

// ******************************************* //  

// Former Backbone Views here for reference. ////

// ******************************************* //  

// var AllListingsView = Backbone.View.extend({

// 	el: "#container",

// 	events: {
// 		'click .listing': '_navToItem'  
// 	},

// 	_navToItem: function(evt){

// 		var listingId = evt.currentTarget.getAttribute('id')
// 		console.log(listingId, "<<<<<< listingId is ")

// 		location.hash = 'itemListing/' + listingId
// 	},

// 	_buildTemplate: function(modelArr){

// 		var listingsArr = modelArr

// 		htmlString = ''

// 		for(var i = 0; i < listingsArr.length; i++){

// 		var listingImgUrl = listingsArr[i].get('Images')[0].url_570xN
// 		var listingTitle = listingsArr[i].get('title')


// 		// Take note of using .get here, refer to my evernote.
// 		// <img src={this.props.ListingModel.get('Images')[0].url_170x135} />
//         // <h5>{this.props.ListingModel.get('title')}</h5>

// 		htmlString += '<div class="listing" id=' + listingsArr[i].get('listing_id') + '><img src="' + listingImgUrl + '">'
// 		htmlString += '<h5>' + listingTitle + '</h5>'
// 		htmlString += '<p class="style">' + listingsArr[i].get('tags')[0] + ', ' + listingsArr[i].get('tags')[1] + '</p>'
// 		htmlString += '<button class="plus">+</button><p class="price">$' + listingsArr[i].get('price') + '</p>'
// 		htmlString += '</div>'


// 		console.log("Build template fired!")
// 		console.log(modelArr)
// 		}

// 		return htmlString
// 	},

// 	render: function(){
// 		console.log("Render fired!")
// 		this.el.innerHTML = this._buildTemplate(this.ac.models)
// 	},

// 	initialize: function(allColl){
// 		console.log("AllListingsView initialize fired!")
// 		this.ac = allColl
// 		this.render()
// 	}

// })

// var SingleView = Backbone.View.extend({

// 	el: "#container",


// 	_buildTemplate: function(listingMod){

// 		var singleListing = listingMod

// 		htmlString = ''

// 		htmlString += "<div class='listing singleListing'><img src=" + singleListing.get('Images')[0].url_570xN + ">"
// 		htmlString += "<h5>" + singleListing.get('title') + "</h5>"
// 		htmlString += '<p class="style">' + singleListing.get('tags')[0] + ', ' + singleListing.get('tags')[1] + ' <span class="price">$' + singleListing.get('price') +'</span></p>'
// 		htmlString += '<p class="description">' + singleListing.get('description') + '</p>'
// 		htmlString += "</div>"

// 		return htmlString
// 	},

// 	render: function(err){
// 		if (err){
// 			console.log("No search results found, please try again.")
// 		}
// 		console.log("Single Render fired!")
// 		this.el.innerHTML = this._buildTemplate(this.listMod)
// 	},

// 	initialize: function(listingMod){
// 		this.listMod = listingMod
// 		this.render()
// 	}

// })
