"use client";
import React, { useEffect, useState } from "react";
import { Field, FieldArray, Form, Formik } from "formik";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import {
  networkInitialValues,
  networkValidationSchema,
  handleLatitude,
  handleLongitude,
  networkformData,
} from "../../../utils/Common/common";
import TextField from "../../../utils/TextField/textfield";

function createNetworkDetails(props: any) {
  const [visible, setVisible] = useState(true);
  const [count, setCount] = useState(3);
  const [initialValues, setInitiValues] = useState({});
  const [validationSchema, setValidationSchema] = useState({});
  const [formData, setFormData] = useState<any>({});
  useEffect(() => {
    setInitiValues(networkInitialValues(props.data, "create"));
    setValidationSchema(networkValidationSchema("create"));
    setFormData(networkformData(props.typeOfForm));
  }, []);
  const closeModal = () => {
    setVisible(false);
    props.closeCreateOrEditModal();
  };
  const header = () => {
    return (
      <div className="flex items-start justify-between rounded-t dark:border-gray-600">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          {`Create Network Details`}
        </h3>
      </div>
    );
  };
  return (
    <Dialog
      header={header}
      className="relative bg-white rounded-lg shadow dark:bg-gray-700"
      visible={visible}
      position="center"
      onHide={() => closeModal()}
      draggable={false}
      resizable={false}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(e: any) => {
          props.createOrUpdate(e);
          closeModal();
        }}
        render={({ values, errors }) => {
          return (
            <div
              style={{
                width: "630px",
              }}
            >
              <Form>
                <div className="">
                  <div>
                    <div className="grid grid-cols-1 mt-4">
                      <div>
                        <TextField
                          field={formData.globally_unique_identifier}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 mt-4">
                      <div className="">
                        <TextField field={formData.common_name} />
                      </div>
                    </div>
                  </div>
                  <div className="border-b border-gray-900/10 pb-4"></div>
                  <div className="grid grid-cols-1 gap-4 mt-4">
                    <div className="">
                      <TextField field={formData.address} />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 my-4">
                    <div><TextField field={formData.city} /></div>
                    <div><TextField field={formData.state} /></div>
                    <div><TextField field={formData.zip} /></div>
                  </div>
                  <div className="border-b border-gray-900/10 pb-1"></div>
                  <div className="grid grid-cols-4 gap-4 mt-4">
                    <div>
                      <TextField field={formData.IPV4} />
                    </div>
                    <div className="">
                      <TextField field={formData.port} />
                    </div>
                    <div>
                      <TextField field={formData.username} />
                    </div>
                    <div>
                      <TextField field={formData.password} />
                    </div>
                  </div>
                  <div className="">
                    <div className="border-b border-gray-900/10 pb-4"></div>
                    <h1 className="mt-2 font-bold">Element's center Point</h1>
                    <div className="mt-4 grid grid-cols-1 gap-x-6  sm:grid-cols-6">
                      <>
                        <FieldArray
                          name="gps_coordinate"
                          validateOnChange={false}
                        >
                          {({ remove, push }) => (
                            <>
                              <div className="sm:col-span-3">
                                <div className="">
                                  <Field name="gps_coordinate[0].longitude">
                                    {(e: any) => {
                                      let display = false;
                                      if (e.meta.touched && e.meta.error) {
                                        display = true;
                                      }
                                      let toolTip = "";
                                      if (e.field.value.length === 0) {
                                        toolTip = "Enter longitude";
                                      } else {
                                        toolTip =
                                          "Allowed range is -180.00000 to 180.000000";
                                      }
                                      return (
                                        <div>
                                          <span className="p-float-label">
                                            <InputText
                                              id={`gps_coordinate[0].longitude`}
                                              type="number"
                                              tooltipOptions={{
                                                event: "focus",
                                                position: "left",
                                              }}
                                              placeholder="longitude"
                                              tooltip={toolTip}
                                              {...e.field}
                                              onInput={(event: any) => {
                                                handleLongitude(event);
                                              }}
                                              className={
                                                display
                                                  ? "p-invalid block  w-60 rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                  : "block w-60 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                              }
                                            />
                                            <label
                                              htmlFor="username"
                                              className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                              Longitude*
                                            </label>
                                          </span>
                                          {e.meta.touched && e.meta.error && (
                                            <div className="text-rose-600">
                                              {e.meta.error}
                                            </div>
                                          )}
                                        </div>
                                      );
                                    }}
                                  </Field>
                                </div>
                              </div>
                              <div className="sm:col-span-3">
                                <div className="">
                                  <Field name="gps_coordinate[0].latitude">
                                    {(e: any) => {
                                      let display = false;
                                      if (e.meta.touched && e.meta.error) {
                                        display = true;
                                      }
                                      let toolTip = "";
                                      if (e.field.value.length === 0) {
                                        toolTip = "Enter latitude";
                                      } else {
                                        toolTip =
                                          "Allowed range is -90.00000 to 90.00000";
                                      }
                                      return (
                                        <div>
                                          <span className="p-float-label">
                                            <InputText
                                              id={`gps_coordinate[0].latitude`}
                                              tooltip={toolTip}
                                              type="number"
                                              {...e.field}
                                              tooltipOptions={{
                                                event: "focus",
                                                position: "right",
                                              }}
                                              placeholder="latitude"
                                              className={
                                                display
                                                  ? "p-invalid block  w-60 rounded-md  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                  : "block  w-60 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                              }
                                              onInput={(event: any) => {
                                                handleLatitude(event);
                                              }}
                                            />
                                            <label
                                              htmlFor="username"
                                              className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                              Latitude*
                                            </label>
                                          </span>
                                          {e.meta.touched && e.meta.error && (
                                            <div className="text-rose-600">
                                              {e.meta.error}
                                            </div>
                                          )}
                                        </div>
                                      );
                                    }}
                                  </Field>
                                </div>
                              </div>
                            </>
                          )}
                        </FieldArray>
                      </>
                    </div>
                    <div className="border-b border-gray-900/10 pb-4"></div>
                    <h1 className="mt-2 font-bold">
                      Element's bounding box coordinates
                    </h1>
                    <div className="mt-4">
                      <FieldArray name="gps_polygon_endpoints">
                        {({ remove, push }) => {
                          return (
                            <>
                              {values.gps_polygon_endpoints.map(
                                (p: any, index: any) => {
                                  return (
                                    <div
                                      className="mt-2 grid  gap-x-6 "
                                      key={index}
                                    >
                                      <div className="mt-2">
                                        <Field
                                          name={`gps_polygon_endpoints[${index}].longitude`}
                                        >
                                          {(e: any) => {
                                            let display = false;
                                            if (
                                              e.meta.touched &&
                                              e.meta.error
                                            ) {
                                              display = true;
                                            }
                                            let toolTip = "";
                                            if (e.field.value.length === 0) {
                                              toolTip = "Enter longitude";
                                            } else {
                                              toolTip =
                                                "Allowed range is -180.00000 to 180.00000";
                                            }
                                            return (
                                              <div>
                                                <span className="p-float-label">
                                                  <InputText
                                                    type="number"
                                                    tooltipOptions={{
                                                      event: "focus",
                                                      position: "top",
                                                    }}
                                                    tooltip={toolTip}
                                                    id={`gps_polygon_endpoints[${index}].longitude`}
                                                    placeholder="longitude"
                                                    {...e.field}
                                                    className={
                                                      display
                                                        ? "p-invalid block  w-60 rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        : "block  w-60 rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    }
                                                    onInput={(event: any) => {
                                                      handleLongitude(event);
                                                    }}
                                                  />
                                                  <label
                                                    htmlFor="username"
                                                    className="block text-sm font-medium leading-6 text-gray-900"
                                                  >
                                                    longitude*
                                                  </label>
                                                </span>
                                                {e.meta.touched &&
                                                  e.meta.error && (
                                                    <div className="text-rose-600">
                                                      {e.meta.error}
                                                    </div>
                                                  )}
                                              </div>
                                            );
                                          }}
                                        </Field>
                                      </div>
                                      <div className="">
                                        <Field
                                          name={`gps_polygon_endpoints[${index}].latitude`}
                                        >
                                          {(e: any) => {
                                            let display = false;
                                            if (
                                              e.meta.touched &&
                                              e.meta.error
                                            ) {
                                              display = true;
                                            }
                                            let toolTip = "";
                                            if (e.field.value.length === 0) {
                                              toolTip = "Enter latitude";
                                            } else {
                                              toolTip =
                                                "Allowed range is -90.00000 to 90.00000";
                                            }
                                            return (
                                              <div className="grid grid-cols-2 gap-2 mt-2">
                                                <div>
                                                  <span className="p-float-label">
                                                    <InputText
                                                      id={`gps_coordinate[0].latitude`}
                                                      tooltip={toolTip}
                                                      type="number"
                                                      {...e.field}
                                                      tooltipOptions={{
                                                        event: "focus",
                                                        position: "top",
                                                      }}
                                                      placeholder="latitude"
                                                      className={
                                                        display
                                                          ? "p-invalid block  w-60 rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                          : "block  w-60 rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                      }
                                                      onInput={(event: any) => {
                                                        handleLatitude(event);
                                                      }}
                                                    />
                                                    <label
                                                      htmlFor="username"
                                                      className="block text-sm font-medium leading-6 text-gray-900"
                                                    >
                                                      Latitude*
                                                    </label>
                                                  </span>
                                                  {e.meta.touched &&
                                                    e.meta.error && (
                                                      <div className="text-rose-600">
                                                        {e.meta.error}
                                                      </div>
                                                    )}
                                                </div>
                                                <div className="mt-2">
                                                  <Button
                                                    icon="pi pi-plus"
                                                    type="button"
                                                    className={`p-button-rounded p-button-secondary p-button-text mr-2 mb-2 ${count === index
                                                        ? ""
                                                        : "invisible"
                                                      }`}
                                                    onClick={() => {
                                                      push({
                                                        longitude: "",
                                                        latitude: "",
                                                      });
                                                      setCount(count + 1);
                                                    }}
                                                  />
                                                  {values.gps_polygon_endpoints
                                                    .length > 4 ? (
                                                    <Button
                                                      icon="pi pi-minus"
                                                      type="button"
                                                      className={`p-button-rounded p-button-secondary p-button-text mr-2 mb-2 ${values
                                                          .gps_polygon_endpoints
                                                          .length > 10
                                                        }?"":"invisible"`}
                                                      onClick={() => {
                                                        remove(index);
                                                        setCount(count - 1);
                                                      }}
                                                    />
                                                  ) : null}
                                                </div>
                                              </div>
                                            );
                                          }}
                                        </Field>
                                      </div>
                                    </div>
                                  );
                                }
                              )}
                            </>
                          );
                        }}
                      </FieldArray>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-x-6 mt-4">
                  <Button
                    severity="danger"
                    type="button"
                    className=" text-gray-900"
                    onClick={() => {
                      closeModal();
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Save
                  </Button>
                </div>
              </Form>
            </div>
          );
        }}
      />
    </Dialog>
  );
}
export default createNetworkDetails;
