import React from 'react'
import ReactDOM from 'react-dom'

const AllListingsView = React.createClass({
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




export default Views