import { Field } from "formik";
import React from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import styles from "../../styles/form.module.css";

export default function textField(props: any) {
  const Passwordheader = <div className="font-bold mb-3">Pick a password</div>;
  let specificFieldClass = "right";
  if (props.field.id === "globally_unique_identifier") {
    specificFieldClass = styles["globalFieldStyle"];
  } else if (props.field.id === "common_name") {
    specificFieldClass = "w-52";
  } else if (props.field.id === "address") {
    specificFieldClass = styles["mailingFieldStyle"];
  } else if (props.field.id === "IPV4") {
    specificFieldClass = styles["Ipv4FieldStyle"];
  } else if (props.field.id === "username") {
    specificFieldClass = styles["userFieldStyle"];
  } else if (props.field.id === "zip") {
    specificFieldClass = styles["zipFieldStyle"];
  } else if (props.field.id === "city") {
    specificFieldClass = styles["cityFieldStyle"];
  } else if (props.field.id === "state") {
    specificFieldClass = styles["stateFieldStyle"];
  }
  return (
    <>
      <div>
        <Field name={`${props.field.id}`}>
          {(e: any) => {
            let display = false;
            let toolTip = props.field.tooltip;
            if (e.meta.touched && e.meta.error) {
              display = true;
            }
            if (props.field.validations) {
              if (e.field.value.length === 0) {
                toolTip = props.field.tooltip;
              } else if (
                e.field.value.length < props.field.validations[0].params[0]
              ) {
                toolTip = props.field.validations[0].params[1]
                  ? props.field.validations[0].params[1]
                  : props.field.tooltip;
              } else {
                toolTip = props.field.validations[1].params[1]
                  ? props.field.validations[1].params[1]
                  : props.field.tooltip;
              }
            }
            if (props.field.toolTipOnValidation && e.field.value.length > 0) {
              toolTip = props.field.toolTipOnValidation;
            }
            return (
              <div>
                <span className="p-float-label">
                  {props.field.id === "password" ? (
                    <Password
                      id="password"
                      tooltipOptions={{ event: "focus" }}
                      className={display ? "p-invalid" : ""}
                      {...e.field}
                      maxLength={16}
                      header={Passwordheader}
                      placeholder={props.field.placeholder}
                      tooltip={toolTip}
                      toggleMask
                      feedback={false}
                    />
                  ) : (
                    <InputText
                      {...e.field}
                      type={props.field.type}
                      tooltip={props.field.disable ? "Disabled" : toolTip}
                      id={props.field.id}
                      tooltipOptions={{
                        event: "focus",
                        position:
                          props.field.id === "common_name" ||
                            props.field.id === "IPV4" || props.field.id === 'city'
                            ? "left"
                            : props.field.id === "port" ||
                              props.field.id === "username" || props.field.id === 'state'
                              ? "top"
                              : "right",
                      }}
                      disabled={props.field.disable ? true : false}
                      minLength={
                        props.field.validations
                          ? props.field.validations[0].params[0]
                          : ""
                      }
                      min={
                        props.field.validations
                          ? props.field.validations[0].params[0]
                          : ""
                      }
                      maxLength={
                        props.field.validations
                          ? props.field.validations[1].params[0]
                          : ""
                      }
                      max={
                        props.field.validations
                          ? props.field.validations[1].params[0]
                          : ""
                      }
                      placeholder={props.field.placeholder}
                      onInput={(event: any) => {
                        let value = event.target.value;
                        if (props.field.id === "port") {
                          if (event.target.value.length > 5) {
                            event.target.value = value.slice(0, 5);
                          }
                        } else if (props.field.id === 'zip') {
                          if (isNaN(event.nativeEvent.data)) {
                            let non_Number_Index = value.indexOf(event.nativeEvent.data);
                            event.target.value = `${value.slice(0, non_Number_Index)}${value.slice(non_Number_Index + 1, value.length)}`;
                          }
                        }
                      }}
                      onChange={(event: any) => {
                        e.field.onChange(event);
                        if (props.field.id === 'IPV4') {
                          let value = event.target.value;
                          let dataEvent = event.nativeEvent.data;
                          if (isNaN(event.nativeEvent.data) && dataEvent !== ".") { // this condition wrote to allow only numbers and dot
                            let non_Number_Index = value.indexOf(event.nativeEvent.data);
                            e.form.setFieldValue("IPV4", `${value.slice(0, non_Number_Index)}${value.slice(non_Number_Index + 1, value.length)}`);
                          } if (dataEvent && dataEvent.trim().length === 0) { // this condition is allowed not to allow white spaces
                            let non_Number_Index = value.indexOf(event.nativeEvent.data);
                            e.form.setFieldValue("IPV4", `${value.slice(0, non_Number_Index)}${value.slice(non_Number_Index + 1, value.length)}`);
                          } else {
                            if (value.length === 1) {
                              if (isNaN(value.slice(0, 1))) {
                                e.form.setFieldValue("IPV4", value.slice(0, 0));
                              }
                            } else if (value.length === 2) {
                              if (isNaN(value.slice(1, 2))) {
                                e.form.setFieldValue("IPV4", value.slice(0, 1));
                              }
                            } else if (value.length === 3) {
                              if (isNaN(value.slice(2, 3))) {
                                e.form.setFieldValue("IPV4", value.slice(0, 2));
                              }
                            }
                            else if ((value.length === 4)) {
                              if (!(value.slice(3, 4) === '.')) {
                                e.form.setFieldValue("IPV4", value.slice(0, 3));
                              }
                            } else if (value.length === 5) {
                              if (isNaN(value.slice(4, 5))) {
                                e.form.setFieldValue("IPV4", value.slice(0, 4));
                              }
                            } else if (value.length === 7) {
                              if (dataEvent === "." && value.slice(5, 6) === ".") {
                                e.form.setFieldValue("IPV4", value.slice(0, 6));
                              }
                            } else if (value.length === 8) {
                              if (dataEvent === "." && value.slice(6, 7) === ".") {
                                e.form.setFieldValue("IPV4", value.slice(0, 7));
                              }
                              if (!isNaN(dataEvent)) {
                                if (!isNaN(value.slice(4, 5)) && !isNaN(value.slice(5, 6)) && !isNaN(value.slice(6, 7))) {
                                  e.form.setFieldValue("IPV4", value.slice(0, 7));
                                }
                              }
                            } else if (value.length === 9) {
                              if (dataEvent === "." && value.slice(7, 8) === ".") {
                                e.form.setFieldValue("IPV4", value.slice(0, 8));
                              }
                            } else if (value.length ===10){
                              if(dataEvent === "." && value.match(/\./g).length > 3){
                                e.form.setFieldValue("IPV4", value.slice(0, 9));
                              }
                            } else if (value.length === 11) {
                              if (dataEvent === "." && value.slice(9, 10) === ".") {
                                e.form.setFieldValue("IPV4", value.slice(0, 10));
                              }
                            } else if (value.length === 12) {
                              if (!isNaN(dataEvent)) {
                                if (!isNaN(value.slice(8, 9)) && !isNaN(value.slice(9, 10)) && !isNaN(value.slice(10, 11))) {
                                  e.form.setFieldValue("IPV4", value.slice(0, 11));
                                }
                              }
                            } else if (value.length === 13) {
                              if (dataEvent === "." && value.slice(11, 12) === ".") {
                                e.form.setFieldValue("IPV4", value.slice(0, 12));
                              }
                            }
                          }
                          console.log(event.nativeEvent);
                        }
                      }}
                      className={
                        display
                          ? `p-invalid block rounded-md  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${specificFieldClass}`
                          : `block rounded-md  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${specificFieldClass}`
                      }
                    />
                  )}
                  <label
                    htmlFor={`${props.field.id}`}
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    {props.field.label}
                  </label>
                </span>
                {e.meta.touched && e.meta.error && (
                  <div className="text-rose-600">{e.meta.error}</div>
                )}
              </div>
            );
          }}
        </Field>
      </div>
    </>
  );
}
