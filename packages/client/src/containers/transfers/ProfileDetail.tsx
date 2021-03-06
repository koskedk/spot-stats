import React, { Component } from "react";
import { ProfileScene } from "./ProfileScene";
import { ProfileSummary } from "./models/profile-summary";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { TabPanel, TabView } from "primereact/tabview";
import Moment from "react-moment";
interface Prop {
  profile: ProfileSummary;
}
export class ProfileDetail extends Component<Prop, {}> {
  dateTemplate = (rowData: any, column: any) => {
    const dt = rowData["logDate"];
    return (
      <span>
        <Moment format="DD MMM YYYY">{dt}</Moment>
      </span>
    );
  };
  date2Template = (rowData: any, column: any) => {
    const dt = rowData["updated"];
    return (
      <span>
        <Moment format="DD MMM YYYY">{dt}</Moment>
      </span>
    );
  };

  date3Template = (rowData: any, column: any) => {
    const dt = rowData["report"];
    const ll = JSON.parse(JSON.stringify(rowData["measure"]));

    if (dt && dt === "Demo EMR") return <span></span>;
    if (dt && dt === "v1.0.0.0") return <span></span>;
    if (dt && dt.startsWith("1983")) return <span></span>;

    if (ll.display.startsWith("Last") && dt) {
      return (
        <span>
          <Moment format="DD MMM YYYY">{dt}</Moment>
        </span>
      );
    }
    return <span>{dt} </span>;
  };

  render() {
    if (!this.props.profile) {
      return <div />;
    } else {
      const dwhSummaries = this.props.profile.summaries!.filter(
        (x) => x.docket.name === "NDWH"
      );
      const htsSummaries = this.props.profile.summaries!.filter(
        (x) => x.docket.name === "HTS"
      );
      const mpiSummaries = this.props.profile.summaries!.filter(
        (x) => x.docket.name === "MPI"
      );
      const mgsSummaries = this.props.profile.summaries!.filter(
        (x) => x.docket.name === "MGS"
      );
      return (
        <div>
          <div className="p-grid">
            <div className="p-col-12">
              <Card title={this.props.profile.name}>
                <div className="p-grid">
                  <div className="p-col-1">Code</div>
                  <div className="p-col-2">{this.props.profile.code}</div>
                </div>
              </Card>
            </div>
            <div className="p-col-8">
              <TabView>
                <TabPanel header="NDWH">
                  <DataTable value={dwhSummaries}>
                    <Column field="extract.display" header="Extract" />
                    <Column field="recieved" header="Recieved" />
                    <Column field="expected" header="Expected" />
                    <Column
                      field="updated"
                      header="Update"
                      body={this.date2Template}
                    />
                  </DataTable>
                </TabPanel>

                <TabPanel header="HTS">
                  <DataTable value={htsSummaries}>
                    <Column field="extract.display" header="Extract" />
                    <Column field="recieved" header="Recieved" />
                    <Column field="expected" header="Expected" />
                    <Column
                      field="updated"
                      header="Update"
                      body={this.date2Template}
                    />
                  </DataTable>
                </TabPanel>

                <TabPanel header="MPI">
                  <DataTable value={mpiSummaries}>
                    <Column field="extract.display" header="Extract" />
                    <Column field="recieved" header="Recieved" />
                    <Column field="expected" header="Expected" />
                    <Column
                      field="updated"
                      header="Update"
                      body={this.date2Template}
                    />
                  </DataTable>
                </TabPanel>
                <TabPanel header="MGS">
                  <DataTable value={mgsSummaries}>
                    <Column field="extract.display" header="Extract" />
                    <Column field="recieved" header="Recieved" />
                    <Column field="expected" header="Expected" />
                    <Column
                      field="updated"
                      header="Update"
                      body={this.date2Template}
                    />
                  </DataTable>
                </TabPanel>
              </TabView>
            </div>
            <div className="p-col-4">
              <DataTable
                value={this.props.profile.manifests}
                header="Uploads History"
              >
                <Column
                  field="logDate"
                  header="Date"
                  body={this.dateTemplate}
                />
                <Column field="docket" header="Docket" />
                <Column field="patientCount" header="Patient Count" />
              </DataTable>
            </div>
            <div className="p-col-8">
              <DataTable
                value={this.props.profile.metrics}
                header="Facility Metrics"
              >
                <Column field="measure.display" header="Measure" />
                <Column
                  field="report"
                  header="Metric"
                  body={this.date3Template}
                />
                <Column field="measure.description" header="Description" />
              </DataTable>
            </div>
          </div>
        </div>
      );
    }
  }
}
