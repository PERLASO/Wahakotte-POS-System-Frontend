import React, { Component } from "react";
import {
  getMeasurementList,
  setMeasurement,
  updateMeasurement,
  deleteMeasurement
} from "../../context/Setting";

export default class UpdateMesurements extends Component {
  constructor(props) {
    super(props);
    this.state = {
      measurements: [],
      MeasurementName: "",
      MeasurementNameToUpdate: "",
      id: 0,
    };

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeNameToUpdate = this.handleChangeNameToUpdate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    getMeasurementList().then((res) => {
      this.setState({ measurements: res.data });
    });
  }

  handleChangeName(event) {
    this.setState({ MeasurementName: event.target.value });
  }

  handleChangeNameToUpdate(name, id) {
    this.setState({ MeasurementNameToUpdate: name });
    this.setState({ id: id });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.measurements.length <= 14) {
      let data = {
        name: this.state.MeasurementName.toUpperCase(),
      };

      setMeasurement(data).then((c) => {
        if (c.data === true) {
          alert("Measurement Added!");
          getMeasurementList().then((res) => {
            this.setState({ measurements: res.data });
          });
        } else {
          alert("Failed! Try again");
        }
      });
    }
  }

  handleUpdateSubmit = (event) => {
    event.preventDefault();

    let data = {
      id: this.state.id,
      name: this.state.MeasurementNameToUpdate.toUpperCase(),
    };
    if (this.state.MeasurementNameToUpdate.length > 0) {
      updateMeasurement(data).then((c) => {
        if (c.data === true) {
          alert("Success !");
          getMeasurementList().then((res) => {
            this.setState({ measurements: res.data });
          });
        } else {
          alert("Update failed !");
        }
      });
    }
  };

  handleDelete=(event, id)=> { 
    event.preventDefault();
      deleteMeasurement(id).then((c) => {
        if(c.data === true) {
          alert("Measurement Deteted !");
          getMeasurementList().then((res) => {
            this.setState({ measurements: res.data });
          });
        } else {
          alert("Delete failed !");
        }
      });
  };

  render() {
    return (
      <div className="p-3 pl-5">
        <h3>Update Measurements List</h3>

        <form className="form-inline" onSubmit={this.handleSubmit}>
          <input
            type="text"
            class="form-control"
            placeholder="Enter Measurement"
            required={true}
            onChange={this.handleChangeName}
          />
          <button type="submit" class="btn btn-primary pl-4 pr-4 ml-3">
            Add
          </button>
        </form>
        {this.state.measurements.length > 12 &&
        this.state.measurements.length != 15 ? (
          <div class="alert alert-warning" role="alert">
            You can only add more {15 - this.state.measurements.length}{" "}
            measurements
          </div>
        ) : null}
        {this.state.measurements.length == 15 ? (
          <div class="alert alert-danger" role="alert">
            Maximum number of measurements reached!
          </div>
        ) : null}

        <div
          className="vh-70 container-fluid overflow-auto"
          style={{ height: "65vh", overflow: "scroll" }}
        >
          <table class="table table-striped mt-3 w-25 ">
            <thead>
              <tr>
                <th scope="col" style={{ width: "15%" }}>
                  <h4>#</h4>
                </th>
                <th scope="col">
                  <h4>Name</h4>
                </th>
                <th scope="col" style={{ width: "30%" }}>
                  <h4>Action</h4>
                </th>
              </tr>
            </thead>
            <tbody>
              {this.state.measurements.map((item, index) => {
                return (
                  <tr>
                    <td>
                      <h5>{index + 1}</h5>
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control text-uppercase"
                        defaultValue={item.name}
                        id="measurement"
                        required={true}
                        onChange={(e) =>
                          this.setState({
                            MeasurementNameToUpdate: e.target.value,
                            id: item.id,
                          })
                        }
                      />
                    </td>
                    <td className="d-flex">
                      <button
                        type="button"
                        class="btn btn-warning"
                        onClick={this.handleUpdateSubmit}
                      >
                        Update
                      </button>
                      <button
                        type="button"
                        class="btn btn-danger ml-2"
                        onClick={event => this.handleDelete(event ,item.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
