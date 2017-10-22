import React, { Component } from 'react';
import { connect } from 'react-redux';

class AlertMessage extends Component {
    render() {
        const { message } = this.props;
        const display = {display: 'none'};
        const color = {color: 'green'};

        if(!message) {
            return (<div style={display}></div>);
        }

        return (
            <div>
                <p style={color}>Thank you registering with us {message.first_name}. We just sent you a confirmation 
                email at {message.email} and we will send all mail to {message.address} {message.city}, 
                {message.state}</p>

                <p style={color}>Have a wonderful Day!</p>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {message: state.message};
}

export default connect(mapStateToProps)(AlertMessage);