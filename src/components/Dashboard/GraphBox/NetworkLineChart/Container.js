import { connect } from "react-redux";
import NetworkLineChart from "./NetworkLineChart.js";

const mapStateToProps = state => ({
  data: state.data
});

const mapDispatchToProps = dispatch => ({
  fetchChartData: (url) =>  dispatch(fetchChartData(url))
});

export default connect(mapStateToProps, mapDispatchToProps)(NetworkLineChart);
