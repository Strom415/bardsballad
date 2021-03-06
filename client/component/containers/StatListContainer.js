import { connect } from 'react-redux';
import StatListView from '../ScoreGenViews/StatListView';
import toJS from './toJS/index';

const mapStateToProps = state => ({
  stats: state.getIn(['data', 'stats']),
  holder: state.getIn(['data', 'holder']),
});

const mapDispatchToProps = () => ({});

const StatListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJS(StatListView));

export default StatListContainer;
