import React from "react";
import "./admin.css";
import AddMovieContainer from "../../Components/AddMovieContainer/AddMovieContainer";
import { getGenresFromAPI } from "../../Services/API";
import { Redirect } from "react-router-dom";

class Admin extends React.Component {
  constructor() {
    super();
    this.state = {
      displaying: "none",
      loggingOut: false
    };
  }

  componentDidMount() {
    if (localStorage.getItem("genres") === null) {
      getGenresFromAPI()
        .then(genres => {
          localStorage.setItem("genres", JSON.stringify(genres));
        })
        .catch(err => console.log(err));
    }
  }

  onClickBtn = param => {
    this.setState({
      displaying: param
    });
  };

  render() {
    if (this.state.loggingOut === true) {
      return <Redirect to={"/login"} />;
    }

    return (
      <>
        <h1 class="center-align">WELCOME ADMIN</h1>
        <span class="logout">
          <a
            className=" grey darken-3 btn-small "
            onClick={() => {
              this.setState({ loggingOut: true });
            }}
          >
            <i class="material-icons left">vpn_key</i>
            Logout
          </a>
        </span>
        <span
          onClick={() => this.onClickBtn("api")}
          className="waves-effect waves-light btn-large #212121 grey darken-4"
        >
          ADD MOVIES FROM API
        </span>

        <span
          onClick={() => this.onClickBtn("custom")}
          value="custom"
          className="waves-effect waves-light btn-large #212121 grey darken-4"
        >
          ADD CUSTOM MOVIE
        </span>
        <AddMovieContainer display={this.state.displaying} />
      </>
    );
  }
}

export default Admin;
