import { connect } from "react-redux";
import "babel-polyfill";
import CpuStackChart from "./CpuStackChart.js";
import { fetchChartData } from "actions/graph.js";


const mapStateToProps = state => ({
  data: state.data
});

const mapDispatchToProps = dispatch => ({
  fetchChartData: (url) =>  dispatch(fetchChartData(url))
});

export default connect(mapStateToProps, mapDispatchToProps)(CpuStackChart);
