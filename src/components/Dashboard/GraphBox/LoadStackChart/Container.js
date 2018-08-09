import { connect } from "react-redux";
import "babel-polyfill";
import { fetchChartData } from "actions/graph.js";
import LoadStackChart from "./LoadStackChart.js";


const mapStateToProps = state => ({
  data: state.data
});

const mapDispatchToProps = dispatch => ({
  fetchChartData: (url) =>  dispatch(fetchChartData(url))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoadStackChart);
