import { connect } from 'react-redux';
import NameView from '../ProfileGenViews/NameView';
import actions from '../actions';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  setName: e => dispatch(actions.updateProfile(e)),
});

const NameContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(NameView);

export default NameContainer;
