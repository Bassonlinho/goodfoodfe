
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withFirebase, isEmpty } from 'react-redux-firebase'

export const LoadingScreen = ({ auth, navigation }) => {

    const route = isEmpty(auth)
        ? 'Login'
        : 'HomeScreen';
    navigation.navigate(route);

    return null;

};

export default compose(
    withFirebase,
    connect((state) => {
        return {
            auth: state.firebase.auth,
            profile: state.firebase.profile
        }
    })
)(LoadingScreen)
