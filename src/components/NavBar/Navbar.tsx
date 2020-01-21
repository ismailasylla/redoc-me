import * as React from 'react';
import '../../components/Navbar/Navbar.css';
import { BackButton } from '../ApiInfo/styled.elements';
import { NextButton } from '../ApiInfo/styled.elements';

export default class Navbar extends React.Component {
  // back button navigation
  handlegoBack = () => {
    window.history.back();
  };

  render() {
    const backStyle = {
      overflow: 'hidden',
      /* Set the navbar to fixed position */
      top: '4px',
      position: 'fixed',
      marginBottom: '10px',
      textAlign: 'center',
      display: 'inline-block',
    };
    return (
      <div className="container">
        <BackButton onClick={this.handlegoBack} style={backStyle}>
          ← Go Back
        </BackButton>
        {/* <NextButton onClick={this.handlegoNextPage} style={nextStyle}>
          Next Page →
        </NextButton> */}
      </div>
    );
  }
}
