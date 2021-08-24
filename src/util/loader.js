import React from "react";
import Loader from "react-loader-spinner";
export default class LoaderComponent extends React.Component {

  render() {
    return (
        <Loader className='loader' type="Circles" color="#00BFFF" height={200} width={200}/>
    );
  }
}
