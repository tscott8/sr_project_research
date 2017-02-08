import React from "react"

import CircleButton from "../components/CircleButton.jsx"

export default class AppContainer extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
             <CircleButton id="test_button" name="play_arrow" />
          </div>
        </div>
      </div>
    )
  }
}
