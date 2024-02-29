import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useQuery } from "@tanstack/react-query";
import { getJobList } from "../../@apis/jobs";
// import { ProductService } from './ProductService';

function MyJobs() {
  // const [customers, setCustomers] = useState([]);
  
  const truncate = {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: "25%"
  }

  const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
  const paginatorRight = <Button type="button" icon="pi pi-download" text />;

  // ;

  const { data } = useQuery({
    queryKey: ["jobs"],
    queryFn: getJobList,
  });
    console.log(data);

  const actionTemplate = (rowData) => {
    return (
      <div className="flex gap-2">
        <button className="bg-red-700 py-1 rounded-sm  px-3 text-white">
          edit
        </button>
        <button className="bg-yellow-600  rounded-sm py-1 px-3 text-white">
          Delete
        </button>
      </div>
    );
  };

  // const editCustomer = (rowData) => {
  //     // Logic to handle edit action
  //     console.log("Edit customer:", rowData);
  // };

  // const deleteCustomer = (rowData) => {
  //     // Logic to handle delete action
  //     console.log("Delete customer:", rowData);
  // };

  return (
    <div className="p-5 m-auto h-full">
      <div className="card my-14 mx-auto w-[80%] border h-full">
        <DataTable
          value={data?.myJobs}
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25, 50]}
          tableStyle={{ minWidth: "50rem" }}
          paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
          currentPageReportTemplate="{first} to {last} of {totalRecords}"
          paginatorLeft={paginatorLeft}
          paginatorRight={paginatorRight}
        >
          <Column field="title" header="Title" style={{ width: "25%" }} />
          <Column field="category" header="Category" style={{ width: "25%" }} />
          <Column field="description" header="Description" className="truncate inline-block antialiased leading-relaxed" style={{width: "25%" }} />
          <Column field="country" header="Country" style={{ width: "25%" }} />
          <Column field="city" header="City" style={{ width: "25%" }} />
          <Column field="company" header="Company" style={{ width: "25%" }} />
          <Column
            field="representative.name"
            header="Representative"
            style={{ width: "25%" }}
          />
          <Column
            body={actionTemplate}
            header="Action"
            style={{ width: "10%" }}
          />
        </DataTable>
      </div>
    </div>
  );
}

export default MyJobs;
