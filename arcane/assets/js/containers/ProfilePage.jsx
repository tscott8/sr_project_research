import React, { Component, PropTypes } from 'react'


export default class ProfilePage extends Component {
   constructor(props) {
      super(props);
   }

   render() {
      return (
         <div>
            <h1> Cover Art </h1>
            <h3> Name </h3>
            <p>Tabs (Albums Tracks)</p>
            <p>Description</p>
            <p>Members</p>
         </div>
      );
   }

}
