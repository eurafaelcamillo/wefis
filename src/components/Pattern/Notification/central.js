import React from 'react';
import * as actionTypes from '../../../store/actions/actionTypes';
import {connect} from "react-redux";
import Notification from "./";
import update from "immutability-helper";

class NotificationCentral extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notification: {
                show: false,
                type: "success",
                title: "",
                text: ""
            }
        };
    }

    componentDidMount() {
        this.setState(
            update(this.state, {
                notification: {$set: this.props.notification}
            })
        );
    };

    componentDidUpdate(prevProps, _prevState, _snapshot) {
        if(prevProps.notification !== this.props.notification) {
            this.setState(
                update(this.state, {
                    notification: {$set: this.props.notification}
                })
            );

            if(!prevProps.notification.show && this.props.notification.show) {
                this.hide();
            }
        }
    }

    hide = () => {
        setTimeout(() => {
            this.props.hideNotification();
        }, 3000);
    };

    render() {
        if(this.state.notification.show) {
            return (<Notification notification={this.state.notification} hideNotification={() => this.props.hideNotification()}/>);
        }

        return null;
    }
}

const mapStateToProps = state => ({
    notification: state.notification.notification
});

const mapDispatchToProps = dispatch => ({
    hideNotification: () => dispatch({type: actionTypes.HIDE_NOTIFICATION})
});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationCentral);