import React from "react";
import { TouchableOpacity } from "react-native";
import styles from './style';
import Block from '../Block';
import Text from '../../Pattern/Text';
import { theme } from '../../../utils/constants';
import * as actions from "../../../store/actions";
import {connect} from "react-redux";
import update from "immutability-helper";

class DrawerItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            auth: this.props.auth
        }
    }

    componentDidUpdate(prevProps, _prevState, _snapshot) {
        if (prevProps.auth !== this.props.auth) {
            this.setState(update(this.state, {
                auth: {$set: this.props.auth}
            }));
        }
    }

    renderIcon = () => {
        const { title, focused } = this.props;

        switch (title) {
            default:
                return null;
        }
    };

    render() {
        const { focused, title, navigation } = this.props;

        const containerStyles = [
            styles.defaultStyle,
            focused ? [styles.activeStyle, styles.shadow] : null
        ];

        if((title === "Menu" || title === "Perfil") && !this.state.auth.user) return null

        if(title === 'Acesso' && this.state.auth.user) return null;

        if(title === 'Sair' && !this.state.auth.user) return null;

        return (
            <TouchableOpacity
                style={{ height: 60 }}
                onPress={() => title === 'Sair' ? this.props.onLogout(navigation) : navigation.navigate(title)}
            >
                <Block flex row style={containerStyles}>
                    <Block middle flex={0.1} style={{ marginRight: 5 }}>
                        {this.renderIcon()}
                    </Block>
                    <Block row center flex={0.9}>
                        <Text
                            style={{
                                textTransform: "uppercase",
                                fontWeight: "300"
                            }}
                            size={12}
                            bold={!!focused}
                            color={focused ? theme.COLORS.PRIMARY : "white"}
                        >
                            {title}
                        </Text>
                    </Block>
                </Block>
            </TouchableOpacity>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

const mapDispatchToProps = dispatch => ({
    onLogout: (navigation) => dispatch(actions.logout(navigation))
});

export default connect(mapStateToProps, mapDispatchToProps)(DrawerItem);