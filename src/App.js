import React, { Component } from "react";
import "./App.css";
import Switch from "@material-ui/core/Switch";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";

class App extends Component {
  constructor() {
    super();
    this.state = {
      guests: [],
      data: [],
      toggleChecked: true,
      selectedValue: 0
    };
  }

  componentDidMount() {
    this.loadJson();
  }

  onToggle = event => {
    if (this.state.toggleChecked === true) {
      var temp = this.state.guests;
      var newData = [];
      var j = 0;
      for (var i = 0; i < temp.length; i++) {
        if (temp[i].allow_marketing === true) {
          newData[j] = temp[i];
          j = j + 1;
        }
      }
      this.setState({ data: newData });
      this.setState({ toggleChecked: false });
    }

    if (this.state.toggleChecked === false) {
      this.setState({ data: this.state.guests });
      this.setState({ toggleChecked: true });
    }
  };

  handleSortByVisitCountAsc() {
    var temp = this.state.data;
    temp.sort((a, b) => parseFloat(a.visit_count) - parseFloat(b.visit_count));
    this.setState({ data: temp });
  }

  handleSortByVisitCountDesc() {
    var temp = this.state.data;
    temp.sort((a, b) => parseFloat(b.visit_count) - parseFloat(a.visit_count));
    this.setState({ data: temp });
  }

  handleSortByTotalSpendAsc() {
    var temp = this.state.data;
    temp.sort((a, b) => parseFloat(a.total_spend) - parseFloat(b.total_spend));
    this.setState({ data: temp });
  }

  handleSortByTotalSpendDesc() {
    var temp = this.state.data;
    temp.sort((a, b) => parseFloat(b.total_spend) - parseFloat(a.total_spend));
    this.setState({ data: temp });
  }

  handleSortByIdAsc() {
    var temp = this.state.data;
    temp.sort((a, b) => parseFloat(a.id) - parseFloat(b.id));
    this.setState({ data: temp });
  }

  loadJson() {
    fetch("./guests.json")
      .then(response => response.json())
      .then(result => {
        this.setState({ data: result.data });
        this.setState({ guests: result.data });
      });
  }

  handleDropdown = event => {
    this.setState({ selectedValue: event.target.value });
    switch (event.target.value) {
      case 0:
        this.handleSortByIdAsc();
        break;
      case 1:
        this.handleSortByVisitCountAsc();
        break;
      case 2:
        this.handleSortByVisitCountDesc();
        break;
      case 3:
        this.handleSortByTotalSpendAsc();
        break;
      case 4:
        this.handleSortByTotalSpendDesc();
        break;
      default:
        break;
    }
  };

  render() {
    const textStyle = {
      fontSize: "26px",
      fontWeight: 500,
      textAlign: "center",
      color: "#696969"
    };

    return (
      <React.Fragment>
        <h1 style={textStyle}>Cafe Masa Guest List</h1>

        <div className="btns" style={{ float: "right", padding: "20px" }}>
          <span>Guests that allow marketing </span>
          <Switch
            onChange={this.onToggle}
            value={this.state.toggleChecked}
            color="primary"
          />

          <Select
            onChange={this.submit}
            style={{ width: "200px" }}
            value={this.state.selectedValue}
            onChange={this.handleDropdown}
          >
            <option value={0}>Sort By</option>
            <option value={1}>Visit Count: Low - High</option>
            <option value={2}>Visit Count: High - Low</option>
            <option value={3}>Total Spend: Low - High</option>
            <option value={4}>Total Spend: High - Low</option>
          </Select>
        </div>

        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">First Name</TableCell>
              <TableCell align="right">Last Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">City</TableCell>
              <TableCell align="right">Visit Count </TableCell>
              <TableCell align="right">Total Spend</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.data.map(row => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">{row.first_name}</TableCell>
                <TableCell align="right">{row.last_name}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.city}</TableCell>
                <TableCell align="right">{row.visit_count}</TableCell>
                <TableCell align="right">{row.total_spend}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </React.Fragment>
    );
  }
}

export default App;
