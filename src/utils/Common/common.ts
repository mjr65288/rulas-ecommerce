import * as Yup from "yup";
/**
 * A function which return the Object with key as field id and value is read from data
 * @param data - data is data values used to initial the values
 * @param typeOfForm - type of the form like create,update and bulkEdit
 * @returns the object with keys and values matching used in formik for initialze value
 */
export function networkInitialValues(data: any, typeOfForm: string) {
  return {
    id: data.id,
    globally_unique_identifier: data.globally_unique_identifier,
    date: typeOfForm === "create" ? formatAMPM() : data.date,
    common_name: data.common_name,
    address: data.address,
    object_type_label: data.object_type_label,
    city: data.city,
    state: data.state,
    zip: data.zip,
    gps_coordinate: data.gps_coordinate,
    gps_polygon_endpoints: data.gps_polygon_endpoints,
    IPV4: data.IPV4,
    port: data.port,
    username: data.username,
    password: data.password,
  };
}
const formatAMPM = () => {
  const date = new Date();
  var hours = date.getHours();
  var minutes = date.getMinutes() as unknown as string;
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = (minutes as unknown as number) < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return `${strTime} ${date.getDate()}-${date.getMonth() + 1
    }-${date.getFullYear()}`;
};

/**
 * @param typeOfForm - type of the form like create,update and bulkEdit
 * @returns the object with validation schema used in formik for validationSchema
 */

export function networkValidationSchema(typeOfForm: string) {
  return typeOfForm === "bulkEdit"
    ? Yup.object().shape({
      common_name: Yup.string().min(6, "Invalid format"),
      address: Yup.string().min(15, "Invalid format"),
      port: Yup.string().matches(
        /^([1-9][0-9]{0,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$/,
        "Port Number allowed is  1 to 65355"
      ),
      city: Yup.string().min(4, "Invalid Format"),
      state: Yup.string().min(4, "Invalid Format"),
      zip: Yup.string().min(5, 'Invalid Format'),
      username: Yup.string().min(4, "Invalid Format"),
      password: Yup.string().matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,16}$/,
        "Invalid Format"
      ),
    })
    : Yup.object().shape({
      globally_unique_identifier: Yup.string()
        .matches(
          /urn:fdc:canogaperkins\.net:[0-9]+:sn:canoga:SM-100:[0-9]+/,
          "Invalid Format"
        )
        .required("Required!!!"),
      common_name: Yup.string()
        .required("Required!!!")
        .min(6, "Invalid Format"),
      address: Yup.string()
        .required("Required!!!")
        .min(15, "Invalid Format"),
      city: Yup.string().
        required("Required!!!").min(4, "Invalid Format"),
      state: Yup.string().
        required("Required!!!").
        min(4, "Invalid Format"),
      zip: Yup.string().
        required("Required!!!").min(5, 'Invalid Format'),
      object_type_label: Yup.string()
        .required("Required!!!")
        .min(2, "Minimum 2 character is required")
        .max(20, "Object Type Label cannot exceeds 20 character"),
      IPV4: Yup.string()
        .required("Required!!!")
        .matches(
          /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
          "Invalid"
        ),
      port: Yup.string()
        .required("Required!!!")
        .matches(
          /^([1-9][0-9]{0,3}|[1-5][0-9]{4}|6[0-4][0-3]{3}|65[0-3][0-5]{2}|653[0-3]|6553[0-3])$/,
          "Invalid"
        ),
      username: Yup.string().required("Required!!!").min(4, "Invalid Format"),
      password: Yup.string()
        .required("Required!!!")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,16}$/,
          "Invalid Format"
        ),
      gps_coordinate: Yup.array().of(
        Yup.object().shape({
          longitude: Yup.string()
            .required("Required!!!")
            .matches(
              /^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$/,
              "Allowed range is -180 to 180"
            ),
          latitude: Yup.string()
            .required("Required!!!")
            .matches(
              /^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/,
              "Allowed range is -90 to 90"
            ),
        })
      ),
      gps_polygon_endpoints: Yup.array().of(
        Yup.object().shape({
          longitude: Yup.string()
            .required("Required!!!")
            .matches(
              /^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$/,
              "Allowed range is -180 to 180"
            ),
          latitude: Yup.string()
            .required("Required!!!")
            .matches(
              /^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/,
              "Allowed range is -90 to 90"
            ),
        })
      ),
    });
}

/**
* @param typeOfForm - type of the form like create,update and bulkEdit
* @returns it return the object which are used to render the field
* Sample format of Obj
    {
        id:value of field id,
        label:value of field label,
        placeholder:value of the placeholder render inside the field,
        type: text or number,
        disable : boolean value,
        display: boolean value,
        toolTipOnValidation : toolTip value based on validation,
        validations: [
            {
                type: "min",
                params: [6, "Minimum 6 Character"]
            },
            {
                type: "max",
                params: [16, "Maximum 16 Character"]
            }
        ]
        // Validation or toolTipOnValidation are allowed only one at a time
    }
*/
export function networkformData(typeOfForm: string) {
  return {
    globally_unique_identifier: {
      id: "globally_unique_identifier",
      label: `Globally unique Identifier${typeOfForm === "bulkEdit" ? "" : "*"
        }`,
      placeholder: `Globally Unique Identifier`,
      type: "text",
      tooltip: "Enter Globally Unique Identifier",
      toolTipOnValidation:
        "Valid format is urn:fdc:canogaperkins.net:22001:sn:canoga:SM-100:2323",
    },
    common_name: {
      id: "common_name",
      label: `Common Name${typeOfForm === "bulkEdit" ? "" : "*"}`,
      placeholder: `Common name`,
      type: "text",
      tooltip: "Enter common Name",
      validations: [
        {
          type: "min",
          params: [6, "Minimum 6 Character needed"],
        },
        {
          type: "max",
          params: [16, "Maximum 16 Character allowed"],
        },
      ],
    },
    address: {
      id: "address",
      label: `Address${typeOfForm === "bulkEdit" ? "" : "*"}`,
      placeholder: `Mailing Address`,
      type: "text",
      tooltip: "Enter Mailing Address",
      validations: [
        {
          type: "min",
          params: [15, "Minimum 15 Character needed"],
        },
        {
          type: "max",
          params: [46, "Maximum 46 Character allowed"],
        },
      ],
    },
    city: {
      id: "city",
      label: `City${typeOfForm === "bulkEdit" ? "" : "*"}`,
      placeholder: `City`,
      type: "text",
      tooltip: "Enter City Name",
      validations: [
        {
          type: "min",
          params: [4, "Minimum 4 Character needed"],
        },
        {
          type: "max",
          params: [30, "Maximum 30 Character allowed"],
        },
      ],
    },
    state: {
      id: "state",
      label: `State${typeOfForm === "bulkEdit" ? "" : "*"}`,
      placeholder: `State`,
      type: "text",
      tooltip: "Enter State Name",
      validations: [
        {
          type: "min",
          params: [4, "Minimum 4 Character needed"],
        },
        {
          type: "max",
          params: [30, "Maximum 30 Character allowed"],
        },
      ],
    },
    zip: {
      id: "zip",
      label: `Zip${typeOfForm === "bulkEdit" ? "" : "*"}`,
      placeholder: `Zip Code`,
      type: "text",
      tooltip: "Enter Zip Code",
      validations: [
        {
          type: "min",
          params: [5, "Minimum 5 Character needed"],
        },
        {
          type: "max",
          params: [6, "Maximum 6 Character allowed"],
        },
      ],
    },
    IPV4: {
      id: "IPV4",
      label: `IPV4 Address${typeOfForm === "bulkEdit" ? "" : "*"}`,
      placeholder: `Enter IPV4 Address`,
      type: "text",
      tooltip: "Enter IPV4 address",
      toolTipOnValidation: "Valid format 127.0.0.1",
      validations: [
        {
          type: "min",
          params: [7, "Valid format 127.0.0.1"],
        },
        {
          type: "max",
          params: [15, "Valid format 127.0.0.1"],
        },
      ],
    },
    port: {
      id: "port",
      label: `Port ${typeOfForm === "bulkEdit" ? "" : "*"}`,
      placeholder: `Port`,
      type: "number",
      tooltip: "Enter Port Number",
      validations: [
        {
          type: "min",
          params: [1, "Allowed range: 1 to 65355"],
        },
        {
          type: "max",
          params: [65355, "Allowed range: 1 to 65355"],
        },
      ],
    },
    username: {
      id: "username",
      label: `Username${typeOfForm === "bulkEdit" ? "" : "*"}`,
      placeholder: `Username`,
      type: "text",
      tooltip: "Username",
      validations: [
        {
          type: "min",
          params: [4, "Minimum 4 Character needed"],
        },
        {
          type: "max",
          params: [16, "Maximum 16 Character allowed"],
        },
      ],
    },
    password: {
      id: "password",
      label: `Password${typeOfForm === "bulkEdit" ? "" : "*"}`,
      placeholder: `Password`,
      type: "password",
      tooltip: "Enter Password",
      validations: [
        {
          type: "min",
          params: [
            6,
            "Minimum 6 characters, at least one uppercase letter, one lowercase letter, one number and one special character",
          ],
        },
        {
          type: "max",
          params: [
            16,
            "Maximum 16 characters, at least one uppercase letter, one lowercase letter, one number and one special character",
          ],
        },
      ],
    },
  };
}

export function handleLongitude(event: any) {
  let value = event.target.value;
  if (value.includes(".")) {
    if (value.slice(0, value.indexOf(".")).length > 3) {
      let beforeDot = value.slice(0, 3);
      let afterDot = value.slice(value.indexOf("."), value.length);
      event.target.value = `${beforeDot}${afterDot}`;
    }
    if (value.slice(0, value.indexOf(".")).length === 1 && value.length > 7) {
      let beforeDot = value.slice(0, value.indexOf("."));
      let afterDot = value.slice(value.indexOf("."), 7);
      event.target.value = `${beforeDot}${afterDot}`;
    } else if (
      value.slice(0, value.indexOf(".")).length === 2 &&
      value.length > 8
    ) {
      let beforeDot = value.slice(0, value.indexOf("."));
      let afterDot = value.slice(value.indexOf("."), 8);
      event.target.value = `${beforeDot}${afterDot}`;
    } else if (
      value.slice(0, value.indexOf(".")).length === 3 &&
      value.length > 9
    ) {
      let beforeDot = value.slice(0, value.indexOf("."));
      let afterDot = value.slice(value.indexOf("."), 9);
      event.target.value = `${beforeDot}${afterDot}`;
    }
  } else {
    if (event.target.value.length > 3) {
      let value = event.target.value;
      event.target.value = value.slice(0, 3);
    }
  }
}

export function handleLatitude(event: any) {
  let value = event.target.value;
  if (value.includes(".")) {
    if (value.slice(0, value.indexOf(".")).length > 2) {
      let beforeDot = value.slice(0, 2);
      let afterDot = value.slice(value.indexOf("."), value.length);
      event.target.value = `${beforeDot}${afterDot}`;
    }
    if (value.slice(0, value.indexOf(".")).length === 1 && value.length > 7) {
      let beforeDot = value.slice(0, value.indexOf("."));
      let afterDot = value.slice(value.indexOf("."), 7);
      event.target.value = `${beforeDot}${afterDot}`;
    } else if (
      value.slice(0, value.indexOf(".")).length === 2 &&
      value.length > 8
    ) {
      let beforeDot = value.slice(0, value.indexOf("."));
      let afterDot = value.slice(value.indexOf("."), 8);
      event.target.value = `${beforeDot}${afterDot}`;
    }
  } else {
    if (event.target.value.length > 2) {
      let value = event.target.value;
      event.target.value = value.slice(0, 2);
    }
  }
}
