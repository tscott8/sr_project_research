import React, { Component, PropTypes } from 'react'
import { Dialog, TextField } from 'material-ui'

export default class EditDialog extends Component {
   constructor(props) {
      super(props);

      this.state = {
         item: props.item,
         dirty: false
      }
   }

   handleChange = (e, key) => {
      let item = this.state.item;
      item[key] = e.target.value;
      this.setState({item: item});
   }

   checkSpecialChars = (string) => {
     let format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
     let test = format.test(string)
     // console.log(test)
     return !test
   }

   checkField = (e) => {
     let item = e.target.value;
     let key = e.target.id;
     let errKey = e.target.id+'_errors'
     console.log(key)

     if (item.length < 1) { this.setState({[errKey]:['required field']})}
     else if (key !== "email" && item.length > 0 && !this.checkSpecialChars(item)) {
         this.setState({[key]:item, [errKey]:['invalid '+key]})
     }
     else { this.setState({[key]:item, [errKey]:[]}) }
   }

   renderTrackForm = () => {
      //TODO TYLER HELP!!!!
      return (
         <div>
            <TextField
               floatingLabelText={"Track Name"}
               id={'trackName'}
               name={'trackName'}
               type={'text'}
               value={this.state.item.name}
               onChange={this.checkField}
               />
         </div>
      )
   }

   renderContent = () => {
      switch (this.props.type) {
         case "track":
            return this.renderTrackForm();
      }
   }

   render() {
      // console.info("IN editdialog RENDER", this.props);
      const { item } = this.props;

      return (
         <Dialog
            {...this.props}
            autoDetectWindowHeight
            autoScrollBodyContent
            >
            <div>{this.renderContent(item)}</div>
         </Dialog>
      )
   }
}
