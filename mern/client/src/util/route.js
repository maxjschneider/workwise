import { Navigate, Outlet } from 'react-router-dom'
import { connect } from "react-redux";

const mapStateToProps = ({ session: { userId} }) => ({
    loggedIn: Boolean(userId)
});

const Private = ({ loggedIn }) => {
    return (
      loggedIn ? <Outlet/> : <Navigate to='/login'/>
    )
}

export default connect(
    mapStateToProps
)(Private);