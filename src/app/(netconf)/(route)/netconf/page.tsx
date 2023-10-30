"use client";
import React, { useState, useEffect } from "react";
import { useAuthContext } from "@/context/AuthContext";
import styles from "@/styles/Home.module.css";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { ProgressBar } from "primereact/progressbar";
import { Form, Formik, useField } from "formik";
import * as Yup from "yup";

//Need to import primereact css, otherwise the prime component will look funcky
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import { NetworkService } from "@/service/NetworkDetails";

// Creating Custom InputTextArea component
const MyInputTextArea = (props: any) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props);
  let display =
    meta.error && meta.touched
      ? "p-invalid text-input w-full"
      : "text-input w-full";
  return (
    <>
      <span className="p-float-label">
        <InputTextarea className={display} {...field} {...props} />
        <label htmlFor={props.name} className="text-base">
          {props.label}
        </label>
        {meta.touched && meta.error ? (
          <div className="p-error">{meta.error}</div>
        ) : null}
      </span>
    </>
  );
};

// Creating Custom MultiSelect component
const MySelect = (props: any) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props);
  let display =
    meta.error && meta.touched
      ? "grid grid-flow-col justify-stretch p-invalid"
      : "grid grid-flow-col justify-stretch";
  return (
    <div>
      <span className="p-float-label">
        <Dropdown className={display} {...field} {...props} />
        <label htmlFor={props.id || props.name}>{props.label}</label>
        {meta.touched && meta.error ? (
          <div className="p-error">{meta.error}</div>
        ) : null}
      </span>
    </div>
  );
};

// Create a validationShema usign Yup.
// See https://github.com/jquense/yup#yup
// Formik has a special configuration prop for Yup called validationSchema which will automatically
// transform Yup’s validation errors messages into a pretty object whose keys match values/initialValues/touched
const validationSchema = () =>
  Yup.object({
    rpcInput: Yup.string()
      .max(501, "Must be 500 characters or less")
      .required("Required"),
    networkElement: Yup.object().required("Required"),
  });

// Initial values for Formik
const initialValues = () => {
  return { rpcInput: "", networkElement: {}, rpcOutput: "" };
};

export default function Netconf() {
  const [networks, setNetworks] = useState<any[]>([]);
  const [processing, setProcessing] = useState(false);

  // Distructuring props from our custom useAuthContext Hook
  const { setIsUserValid } = useAuthContext();

  // Return an [] of Object with the name property.
  // This will be used as the options for the NE dropwdown
  const neNameList: {}[] = networks.map((e) => {
    return { name: e["common_name"] };
  });

  const [showProgressBar, setShowProgressBar] = useState(false);

  const onSubmit = (values: any) => {
    setShowProgressBar(true);
    setProcessing(true);
    setTimeout(() => {
      //console.log("Delayed for 5 second.");
      setShowProgressBar(false);
      setProcessing(false);

      //set rpcOutput to a dummt data
      values.rpcOutput = "Command FAILED. Cannot establish connection";
    }, 5000);
  };

  //This function we will Fecth Dummy Data from NetworkDetails.js file
  const getNetworkElements = () => {
    NetworkService.getNetworksMedium().then((data) => {
      setNetworks(data);
    });
  };

  //UseEffect will call the function before rendring in webpage
  useEffect(() => {
    setIsUserValid(true);
    getNetworkElements();
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      validateOnMount
    >
      {(formik) => {
        return (
          <Form>
            <div className={`${styles["layout-dashboard"]}`}>
              <div className={`${styles["grid"]}`}>
                <div className="col-12 lg:col-2">
                  <div
                    className={`${styles["card"]} ${styles["card-w-title"]}`}
                  >
                    <MySelect
                      label="Network Element*"
                      name="networkElement"
                      options={neNameList}
                      optionLabel="name"
                      placeholder="Network"
                    />
                  </div>
                </div>

                <div className="col-12 lg:col-12">
                  <div
                    className={`${styles["card"]} ${styles["card-w-title"]}`}
                  >
                    <MyInputTextArea
                      label="RPC Input*"
                      name="rpcInput"
                      placeholder="RPC"
                      tooltip="Enter a RPC Command"
                      tooltipOptions={{ position: "top" }}
                      rows={9}
                      cols={35}
                    />
                    <Button
                      label="Execute"
                      type="submit"
                      icon="pi pi-send"
                      className="disabled:cursor-not-allowed mr-2"
                      severity="success"
                      loading={processing}
                      disabled={!formik.isValid || processing}
                    />
                    {/* <Button
                      label="Upload Template"
                      type="button"
                      icon="pi pi-arrow-circle-up"
                      severity="info"
                    /> */}
                  </div>
                </div>

                <div className="col-12 lg:col-12">
                  <div
                    className={`${styles["card"]} ${styles["card-w-title"]}`}
                  >
                    <MyInputTextArea
                      label="RPC Output"
                      name="rpcOutput"
                      placeholder="RPC"
                      tooltip="RPC Output"
                      tooltipOptions={{ position: "top" }}
                      rows={9}
                      cols={35}
                    />
                  </div>
                  <ProgressBar
                    mode="indeterminate"
                    style={{
                      height: "6px",
                      display: showProgressBar ? "flex" : "none",
                    }}
                  ></ProgressBar>
                </div>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
