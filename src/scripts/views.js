import React from 'react'
import ReactDOM from 'react-dom'

var AllListingsView = Backbone.View.extend({

	el: "#container",

	events: {
		'click .listing': '_navToItem'  
	},

	_navToItem: function(evt){

		var listingId = evt.currentTarget.getAttribute('id')
		console.log(listingId, "<<<<<< listingId is ")

		location.hash = 'itemListing/' + listingId
	},

	_buildTemplate: function(modelArr){

		var listingsArr = modelArr

		htmlString = ''

		for(var i = 0; i < listingsArr.length; i++){

		var listingImgUrl = listingsArr[i].get('Images')[0].url_570xN
		var listingTitle = listingsArr[i].get('title')


		// Take note of using .get here, refer to my evernote.
		// <img src={this.props.ListingModel.get('Images')[0].url_170x135} />
        // <h5>{this.props.ListingModel.get('title')}</h5>

		htmlString += '<div class="listing" id=' + listingsArr[i].get('listing_id') + '><img src="' + listingImgUrl + '">'
		htmlString += '<h5>' + listingTitle + '</h5>'
		htmlString += '<p class="style">' + listingsArr[i].get('tags')[0] + ', ' + listingsArr[i].get('tags')[1] + '</p>'
		htmlString += '<button class="plus">+</button><p class="price">$' + listingsArr[i].get('price') + '</p>'
		htmlString += '</div>'


		console.log("Build template fired!")
		console.log(modelArr)
		}

		return htmlString
	},

	render: function(){
		console.log("Render fired!")
		this.el.innerHTML = this._buildTemplate(this.ac.models)
	},

	initialize: function(allColl){
		console.log("AllListingsView initialize fired!")
		this.ac = allColl
		this.render()
	}

})

var SingleView = Backbone.View.extend({

	el: "#container",


	_buildTemplate: function(listingMod){

		var singleListing = listingMod

		// console.log(singleListing.get('Images')[0].url_570xN)
		// console.log(singleListing)

		htmlString = ''

		htmlString += "<div class='listing singleListing'><img src=" + singleListing.get('Images')[0].url_570xN + ">"
		htmlString += "<h5>" + singleListing.get('title') + "</h5>"
		htmlString += '<p class="style">' + singleListing.get('tags')[0] + ', ' + singleListing.get('tags')[1] + ' <span class="price">$' + singleListing.get('price') +'</span></p>'
		htmlString += '<p class="description">' + singleListing.get('description') + '</p>'
		htmlString += "</div>"

		return htmlString
	},

	render: function(err){
		if (err){
			console.log("No search results found, please try again.")
		}
		console.log("Single Render fired!")
		this.el.innerHTML = this._buildTemplate(this.listMod)
	},

	initialize: function(listingMod){
		this.listMod = listingMod
		

		// console.log("Collection passed into single View!")
		// this.ac = allColl
		// console.log(this.ac)
		this.render()
	}

})

export default Views