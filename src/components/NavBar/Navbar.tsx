import * as React from 'react';
import '../../components/Navbar/Navbar.css';
import { BackButton } from '../ApiInfo/styled.elements';

export default class Navbar extends React.Component {
  // back button navigation
  handlegoBack = () => {
    window.history.back();
  };

  render() {
    // const btnStyle = {
    //   overflow: 'hidden',
    //   /* Set the navbar to fixed position */
    //   top: '0',
    //   /* Position the navbar at the top of the page */
    //   width: '100%',
    //   /* Full width */
    // };
    return (
      <div>
        <BackButton onClick={this.handlegoBack}>← Go Back</BackButton>
      </div>
    );
  }
}
