"use client";
import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { NetworkService } from "../../../../service/NetworkDetails";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { MultiSelect } from "primereact/multiselect";
import { InputText } from "primereact/inputtext";
import DeleteModal from "../../../../components/networkelement/deleteNetworkElement/deleteNetworkElement";
import CreateNetwork from "../../../../components/networkelement/createNetworkElement/createNetworkElement";
import UpdateNetwork from "../../../../components/networkelement/updateNetworkElement/updateNetworkElement";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "./networkelement.module.css";
import { useAuthContext } from "@/context/AuthContext";
import styles from "./networkelement.module.css";

export default function NetworkElementPage() {
  const [loading, setLoading] = useState(false);
  const [networks, setNetworks] = useState<any[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [globalFilter, setGlobalFilter] = useState("");
  const [data, setData] = useState<any[]>([]);
  const [typeOfForm, setTypeOfForm] = useState("create");
  const [selectedNetworks, setSelectedNetworks] = useState<any[]>([]);

  // Distructuring props from our custom useAuthContext Hook
  const { setIsUserValid, isMenuOpen } = useAuthContext();

  // options for the MultiSelect PRIMEReact component
  const columns = [
    { field: "globally_unique_identifier", header: "Globally_unique_identifier" },
    { field: "object_type_label", header: "Object Type" },
    { field: "address", header: "Address" },
    { field: 'city', header: 'City' },
    { field: 'state', header: 'State' },
    { field: 'zip', header: 'Zip' },
    { field: "gps_coordinate", header: "GPS Coordinate" },
    { field: "gps_polygon_endpoints", header: "GPS Polygon EndPoints" },
    { field: "date", header: "Created Date" },
    { field: "IPV4", header: "IPv4" },
    { field: "port", header: "Port" },
    { field: "username", header: "Username" },
    { field: "password", header: "Password" },
  ];
  const object = {
    id: "",
    globally_unique_identifier: "",
    date: "",
    common_name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    object_type_label: "NE",
    gps_coordinate: [
      {
        longitude: "",
        latitude: "",
      },
    ],
    gps_polygon_endpoints: [
      {
        longitude: "",
        latitude: "",
      },
      {
        longitude: "",
        latitude: "",
      },
      {
        longitude: "",
        latitude: "",
      },
      {
        longitude: "",
        latitude: "",
      },
    ],
    IPV4: "",
    port: "",
    username: "",
    password: "",
  };

  // initial value for the MultiSelect PRIMEReact component
  const [visibleColumns, setVisibleColumns] = useState([
    /** Comment since table is only related to NE, there is no need to expose the Object Label**/
    // { field: "object_type_label", header: "Object Type label" },
    { field: 'city', header: 'City' },
    { field: 'state', header: 'State' },
    { field: "IPV4", header: "IPv4" },
    { field: "port", header: "Port" },
    { field: "address", header: "Address" },
    { field: "gps_coordinate", header: "GPS Coordinate" },
    { field: "date", header: "Created Date" },

  ]);

  //This function we will Fecth Dummy Data from NetworkDetails.js file
  const insertDataIntoTable = () => {
    NetworkService.getNetworksMedium().then((data) => setNetworks(data));
  };

  //UseEffect will call the function before rendring in webpage
  useEffect(() => {
    setIsUserValid(true);
    console.log("insertDataIntoTable call");
    insertDataIntoTable();
  }, []);

  //This function we toggle which column needed to be displayed in table
  const onColumnToggle = (event: any) => {
    let selectedColumns = event.value;
    let orderedSelectedColumns = columns.filter((col) =>
      // The some() method of Array tests whether at least one element
      // in the array passes the test implemented by the provided function.
      // It returns true if, in the array, it finds an element for which
      // the provided function returns true; otherwise it returns false.
      selectedColumns.some(
        // Desrtuct the 'field' prop from the current iterating element, and compare it
        // with the 'col' iterating element.
        (sCol: { field: string }) => sCol.field === col.field
      )
    );
    setVisibleColumns(orderedSelectedColumns);
  };

  const openDeleteModal = (rowData: any) => {
    setData(rowData);
    setOpenModal(true);
  };
  const closeDeleteModal = () => {
    setOpenModal(false);
    setData([]);
  };
  const closeCreateOrEditModal = () => {
    if (openCreateModal) {
      setOpenCreateModal(false);
    } else if (openUpdateModal) {
      setOpenUpdateModal(false);
    }
    setData([]);
    setTypeOfForm("");
  };

  const openCreateOrEditModal = (rowData: any, typeOfForm: string) => {
    if (typeOfForm === "create") {
      rowData.id = networks.length + 1;
      setOpenCreateModal(true);
      setData(rowData);
    } else if (typeOfForm === "update" || typeOfForm === "bulkEdit") {
      setOpenUpdateModal(true);
      setData(rowData);
    }
  };
  const verifiedBodyTemplate = (rowData: any) => {
    return (
      <span className="cursor-pointer">
        <FontAwesomeIcon
          icon={faPencil}
          style={{ color: "#F59E0B" }}
          onClick={() => {
            openCreateOrEditModal(rowData, "update");
            setTypeOfForm("update");
          }}
          size="lg"
        />
        <FontAwesomeIcon
          style={{ color: "#F44336" }}
          size="lg"
          onClick={() => {
            openDeleteModal([rowData]);
          }}
          className="ml-2"
          icon={faTrashCan}
        />
      </span>
    );
  };

  //This function is called to delete the Network
  const deleteNetwork = () => {
    if (data.length === 1) {
      let networkData = [...networks];
      let index = networkData.findIndex(
        (x) =>
          x.globally_unique_identifier === data[0].globally_unique_identifier
      );
      networkData.splice(index, 1);
      setNetworks(networkData);
      toast.success(`Deleted the Network ${data[0].common_name} `, {
        duration: 4000,
        position: "top-right",
      });
    } else {
      deleteSelectedProducts();
    }
  };

  //This function is used for Both creating , updating and Bulk editing
  const createOrUpdate = (obj: any) => {
    let dataRow = [...networks];
    if (typeOfForm === "update") {
      let index = networks.findIndex((x) => x.id === obj.id);
      if (index !== -1) {
        dataRow[index] = obj;
        setNetworks(dataRow);
      }
      toast.success(`Updated the Network Element ${obj.common_name}`, {
        duration: 4000,
        position: "top-right",
      });
    } else if (typeOfForm === "create") {
      dataRow.push(obj);
      setNetworks(dataRow);
      toast.success(`Added the Network Element ${obj.common_name}`, {
        duration: 4000,
        position: "top-right",
      });
    } else if (typeOfForm === "bulkEdit") {
      let selectedNetworksToUpdate = [...selectedNetworks];
      selectedNetworksToUpdate.map((selectedNetworkToUpdate) => {
        if (obj.common_name) {
          selectedNetworkToUpdate.common_name = obj.common_name;
        } else if (obj.address) {
          selectedNetworkToUpdate.address = obj.address;
        } else if (obj.city) {
          selectedNetworkToUpdate.address = obj.city;
        } if (obj.state) {
          selectedNetworkToUpdate.address = obj.state;
        } if (obj.zip) {
          selectedNetworkToUpdate.address = obj.zip;
        }
        if (obj.port) {
          selectedNetworkToUpdate.port = obj.port;
        } else if (obj.username) {
          selectedNetworkToUpdate.username = obj.username;
        } else if (obj.password) {
          selectedNetworkToUpdate.password = obj.password;
        }
      });
      let duplicateNetwork = networks.slice(0);
      selectedNetworksToUpdate.map((selectedNetworkToUpdate) => {
        networks.map((network, index) => {
          if (network.id === selectedNetworkToUpdate.id) {
            if (obj.common_name) {
              duplicateNetwork[index].common_name = obj.common_name;
            }
            if (obj.address) {
              duplicateNetwork[index].address = obj.address;
            }
            if (obj.city) {
              duplicateNetwork[index].city = obj.city;
            }
            if (obj.state) {
              duplicateNetwork[index].state = obj.state;
            }
            if (obj.zip) {
              duplicateNetwork[index].zip = obj.zip;
            }
            if (obj.port) {
              duplicateNetwork[index].port = obj.port;
            }
            if (obj.username) {
              duplicateNetwork[index].username = obj.username;
            }
            if (obj.password) {
              duplicateNetwork[index].password = obj.password;
            }
          }
        });
      });
      setNetworks(duplicateNetwork);
      setSelectedNetworks([]);
      toast.success(`The selected Network Elements were Updated`, {
        duration: 4000,
        position: "top-right",
      });
    }
  };

  //This Function used to delete Mutiple Network
  const deleteSelectedProducts = () => {
    let _networks = networks.filter((val) => !selectedNetworks.includes(val));
    setNetworks(_networks);
    toast.success(
      `Successfully Deleted ${selectedNetworks.length} Network Elements.`,
      {
        duration: 4000,
        position: "top-right",
      }
    );
    setSelectedNetworks([]);
  };

  //This Function called when we do Global Search
  const applyGlobalFilter = (value: any) => {
    const result: Object[] = [];
    networks.map((data) => {
      const networkValue = Object.values(data);
      if (checkIfValueExist(networkValue, value.toLowerCase())) {
        result.push(data);
      }
    });
    setTimeout(() => {
      if (result.length > 0) {
        setGlobalFilter(value);
        setNetworks(result);
      }
      setLoading(false);
    }, 1000);
  };

  /**
   * Callback used to check if value exits in the networkValue
   * @param networkValue - array of values of the enumerable properties of
   * the NE object passed from the applyGlobalFilter().
   * @param value - The search value
   * @returns True if value exits in the networkValue
   */
  const checkIfValueExist = (networkValue: any, value: string): boolean => {
    let exist = false;
    networkValue.map((data: any) => {
      if (typeof data === "string") {
        if (data.toLowerCase().includes(value)) {
          exist = true;
        }
      }
    });
    return exist;
  };

  const commonNameTemplete = (rowData: any) => {
    let data;
    if (globalFilter) {
      //When we do Global search if the value Exist in the data it is highlighted By Bold
      var regEx = new RegExp(globalFilter, "ig");
      data = rowData.common_name.replace(
        regEx,
        `<b class="text-xl">${globalFilter}</b>`
      );
    } else {
      data = rowData.common_name;
    }
    return <span dangerouslySetInnerHTML={{ __html: data }}></span>;
  };

  const cityTemplete = (rowData: any) => {
    let data;
    if (globalFilter) {
      //When we do Global search if the value Exist in the data it is highlighted By Bold
      var regEx = new RegExp(globalFilter, "ig");
      data = rowData.city.replace(
        regEx,
        `<b class="text-xl">${globalFilter}</b>`
      );
    } else {
      data = rowData.city;
    }
    return <span dangerouslySetInnerHTML={{ __html: data }}></span>;
  }

  const zipTemplete = (rowData: any) => {
    return <span>{rowData.zip}</span>;
  }

  let idBodyTemplete = (row: any) => {
    return (
      <p
        title={row.globally_unique_identifier}
        className="w-64 whitespace-nowrap text-ellipsis overflow-hidden"
      >
        {row.globally_unique_identifier}
      </p>
    );
  };

  const stateTemplete = (rowData: any) => {
    let data;
    if (globalFilter) {
      //When we do Global search if the value Exist in the data it is highlighted By Bold
      var regEx = new RegExp(globalFilter, "ig");
      data = rowData.state.replace(
        regEx,
        `<b class="text-xl">${globalFilter}</b>`
      );
    } else {
      data = rowData.state;
    }
    return <span dangerouslySetInnerHTML={{ __html: data }}></span>;
  }
  const ObjectTypeLabelTemplete = (rowData: any) => {
    let data;
    if (globalFilter) {
      var regEx = new RegExp(globalFilter, "ig");
      data = rowData.object_type_label.replace(
        regEx,
        `<b class="text-xl">${globalFilter}</b>`
      );
    } else {
      data = rowData.object_type_label;
    }
    return <span dangerouslySetInnerHTML={{ __html: data }}></span>;
  };
  const gpsCoordinateTemplete = (rowData: any) => {
    let data = `[${rowData.gps_coordinate[0].longitude},${rowData.gps_coordinate[0].latitude}]`;
    return <span>{data}</span>;
  };
  const addressTemplete = (rowData: any) => {
    let data;
    if (isNaN(rowData.address) && globalFilter) {
      var regEx = new RegExp(globalFilter, "ig");
      data = rowData.address.replace(
        regEx,
        `<b class="text-xl">${globalFilter}</b>`
      );
    } else {
      data = rowData.address;
    }
    return <span dangerouslySetInnerHTML={{ __html: data }}></span>;
  };
  const gpsPolygonEndPointTemplete = (rowData: any) => {
    let data = "";
    rowData.gps_polygon_endpoints.map((value: any, index: number) => {
      data =
        data +
        ` [${value.longitude},${value.latitude}]${index < rowData.gps_polygon_endpoints.length - 1 ? "," : ""
        }`;
    });
    return <span>{"[ " + data + " ]"}</span>;
  };
  const dateTemplete = (rowData: any) => {
    let data;
    if (globalFilter) {
      data = rowData.date.replaceAll(
        globalFilter,
        `<b class="text-xl">${globalFilter}</b>`
      );
    } else {
      data = rowData.date;
    }
    return <span dangerouslySetInnerHTML={{ __html: data }}></span>;
  };
  const IPV4Templete = (rowData: any) => {
    let data;
    if (globalFilter) {
      data = rowData.IPV4.replaceAll(
        globalFilter,
        `<b class="text-xl">${globalFilter}</b>`
      );
    } else {
      data = rowData.IPV4;
    }
    return <span dangerouslySetInnerHTML={{ __html: data }}></span>;
  };
  const portTemplete = (rowData: any) => {
    let data = rowData.port;
    return <span dangerouslySetInnerHTML={{ __html: data }}></span>;
  };
  const usernameTemplete = (rowData: any) => {
    let data;
    if (globalFilter) {
      data = rowData.username.replaceAll(
        globalFilter,
        `<b class="text-xl">${globalFilter}</b>`
      );
    } else {
      data = rowData.username;
    }
    return <span dangerouslySetInnerHTML={{ __html: data }}></span>;
  };
  const passwordTemplete = (rowData: any) => {
    let data;
    if (globalFilter) {
      data = rowData.password.replaceAll(
        globalFilter,
        `<b class="text-xl">${globalFilter}</b>`
      );
    } else {
      data = rowData.password;
    }
    return <span dangerouslySetInnerHTML={{ __html: data }}></span>;
  };

  return (
    <div>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-4 lg:px-8">
        <div className={`shadow-2xl ${!isMenuOpen ? `${styles["table-data"]}` : `${styles["table-width-menu-open"]}`} rounded overflow-x-auto`}>
          <MultiSelect
            value={visibleColumns}
            options={columns}
            style={{width:`${isMenuOpen?"620px":"865px"}`}}
            optionLabel="header"
            onChange={onColumnToggle}
            className={`mb-2 mr-4`}
            display="chip"
            filter
            placeholder="Select Columns"
          />
          <InputText
            type="search"
            onInput={(e) => {
              setTimeout(() => {
                if ((e.target as HTMLInputElement).value) {
                  setLoading(true);
                  applyGlobalFilter((e.target as HTMLInputElement).value);
                } else {
                  insertDataIntoTable();
                  setGlobalFilter("");
                }
              }, 2000);
              //  setGlobalFilter(e.target.value)
            }}
            placeholder="Global Search..."
          />
          {/** I removed the class since it was making the rows not expand
           * due to the buttons taking up  space**/}
          {/* <div className="float-right"> */}
          <div className="float-right">
            <div className="flex justify-end space-x-1">
              <Button
                label={`${visibleColumns.length === 1 ? "" : "Bulk Delete"}`}
                className="ml-1 
                text-white 
                 font-bold  
                 rounded-full
                 shadow-lg"
                icon="pi pi-trash"
                severity="danger"
                onClick={() => {
                  openDeleteModal(selectedNetworks);
                }}
                disabled={!selectedNetworks || !selectedNetworks.length}
              />

              <Button
                label={`${visibleColumns.length === 1 ? "" : "Bulk Edit"}`}
                className="ml-1
                text-white 
                 font-bold  
                 rounded-full
                 shadow-lg"
                severity="warning"
                icon="pi pi-pencil"
                onClick={() => {
                  openCreateOrEditModal(object, "bulkEdit");
                  setTypeOfForm("bulkEdit");
                }}
                disabled={!selectedNetworks || !selectedNetworks.length}
              />

              <Button
                label={`${visibleColumns.length === 1 ? "" : "Create NE"}`}
                icon=" pi pi-plus"
                severity="success"
                className="ml-1
                 text-white 
                 font-bold  
                 rounded-full
                 shadow-lg"
                onClick={() => {
                  openCreateOrEditModal(object, "create");
                  setTypeOfForm("create");
                }}
              ></Button>
            </div>
          </div>
          <DataTable
            loading={loading}
            showGridlines
            stripedRows
            filterDisplay="row"
            scrollable
            scrollHeight="800px"
            value={networks}
            selection={selectedNetworks}
            onSelectionChange={(e) => setSelectedNetworks(e.value)}
            dataKey="id"
            selectionMode={"checkbox"}
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10]}
            paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
            currentPageReportTemplate="{first} to {last} of {totalRecords}"
          >
            <Column
              frozen
              style={{ minWidth: "3rem" }}
              selectionMode="multiple"
            ></Column>
            <Column
              key="common_name"
              frozen
              style={{ minWidth: "15rem" }}
              body={commonNameTemplete}
              sortable
              filter
              filterPlaceholder="Search"
              header="common Name"
              field="common_name"
            />
            {visibleColumns.map((col) => {
              if (col.field === 'globally_unique_identifier') {
                return (
                  <Column
                  key={col.field}
                    style={{ minWidth: "10rem" }}
                    field="globally_unique_identifier"
                    body={idBodyTemplete}
                    filter
                    filterPlaceholder="Search"
                    sortable
                    header="Globally_unique_identifier"
                  ></Column>
                )
              } else if (col.field === "object_type_label") {
                return (
                  <Column
                    key={col.field}
                    style={{ minWidth: "8rem" }}
                    body={ObjectTypeLabelTemplete}
                    header={col.header}
                    field={col.field}
                  />
                );
              } else if (col.field === "gps_coordinate") {
                return (
                  <Column
                    key={col.field}
                    style={{ width: "3rem" }}
                    body={gpsCoordinateTemplete}
                    sortable
                    filter
                    filterPlaceholder="Search"
                    header={col.header}
                    field={col.field}
                  />
                );
              } else if (col.field === "address") {
                return (
                  <Column
                    key={col.field}
                    style={{ minWidth: "15rem" }}
                    body={addressTemplete}
                    sortable
                    filter
                    filterPlaceholder="Search"
                    header={col.header}
                    field={col.field}
                  />
                );
              } else if (col.field === "gps_polygon_endpoints") {
                return (
                  <Column
                    key={col.field}
                    style={{ minWidth: "17rem" }}
                    body={gpsPolygonEndPointTemplete}
                    sortable
                    filter
                    filterPlaceholder="Search"
                    header={col.header}
                    field={col.field}
                  />
                );
              } else if (col.field === "date") {
                return (
                  <Column
                    key={col.field}
                    style={{ minWidth: "12rem" }}
                    body={dateTemplete}
                    sortable
                    filter
                    filterPlaceholder="Search"
                    header={col.header}
                    field={col.field}
                  />
                );
              } else if (col.field === "IPV4") {
                return (
                  <Column
                    key={col.field}
                    style={{ minWidth: "5rem" }}
                    body={IPV4Templete}
                    sortable
                    filter
                    filterPlaceholder="Search"
                    header={col.header}
                    field={col.field}
                  />
                );
              } else if (col.field === "city") {
                return (
                  <Column
                    key={col.field}
                    style={{ minWidth: "5rem" }}
                    body={cityTemplete}
                    sortable
                    filter
                    filterPlaceholder="Search"
                    header={col.header}
                    field={col.field}
                  />
                );
              } else if (col.field === "state") {
                return (
                  <Column
                    key={col.field}
                    style={{ minWidth: "8rem" }}
                    body={stateTemplete}
                    sortable
                    filter
                    filterPlaceholder="Search"
                    header={col.header}
                    field={col.field}
                  />
                );
              } else if (col.field === "zip") {
                return (
                  <Column
                    key={col.field}
                    style={{ minWidth: "6rem" }}
                    body={zipTemplete}
                    sortable
                    filter
                    filterPlaceholder="Search"
                    header={col.header}
                    field={col.field}
                  />
                );
              } else if (col.field === "port") {
                return (
                  <Column
                    key={col.field}
                    style={{ width: "5rem" }}
                    body={portTemplete}
                    sortable
                    filter
                    filterPlaceholder="Search"
                    header={col.header}
                    field={col.field}
                  />
                );
              } else if (col.field === "username") {
                return (
                  <Column
                    key={col.field}
                    style={{ width: "12rem" }}
                    body={usernameTemplete}
                    sortable
                    filter
                    filterPlaceholder="Search"
                    header={col.header}
                    field={col.field}
                  />
                );
              } else if (col.field === "password") {
                return (
                  <Column
                    key={col.field}
                    style={{ width: "12rem" }}
                    body={passwordTemplete}
                    sortable
                    filter
                    filterPlaceholder="Search"
                    header={col.header}
                    field={col.field}
                  />
                );
              }
            })}
            <Column
              header="Action"
              alignFrozen="right"
              frozen
              style={{ minWidth: "5rem" }}
              body={verifiedBodyTemplate}
            />
          </DataTable>
        </div>
      </div>
      {openModal ? (
        <DeleteModal
          deleteNetwork={deleteNetwork}
          data={data}
          closeDeleteModal={closeDeleteModal}
        />
      ) : null}
      {openCreateModal ? (
        <CreateNetwork
          typeOfForm={typeOfForm}
          datalength={networks.length}
          createOrUpdate={createOrUpdate}
          data={data}
          closeCreateOrEditModal={closeCreateOrEditModal}
        />
      ) : null}
      {openUpdateModal ? (
        <UpdateNetwork
          typeOfForm={typeOfForm}
          datalength={networks.length}
          createOrUpdate={createOrUpdate}
          data={data}
          closeCreateOrEditModal={closeCreateOrEditModal}
        />
      ) : null}
      <Toaster />
    </div>
  );
}
