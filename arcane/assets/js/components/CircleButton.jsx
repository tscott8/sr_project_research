import React from "react";
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FontIcon from 'material-ui/FontIcon';

export default class CircleButton extends React.Component {
   render() {
      return (
         <div onClick={this.props.click} id={this.props.id}>
            <FloatingActionButton >
               <FontIcon className="material-icons" >{this.props.name}</FontIcon>
            </FloatingActionButton>
         </div>
      );
   }
}
