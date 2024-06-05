import moment from "moment";

const validate = (schema: any) => {
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var numberRegex = /^\d+$/;
  let data = schema;
  let isValidated = true;
  let obj: any = {};
  for (const d in data) {
    if (data[d].validation) {
      for (let i = 0; i < data[d].validation.length; i++) {
        if (
          data[d].validation[i] === "required" &&
          (data[d].value === null || data[d].value === "")
        ) {
          obj[d] = data[d].errors[i] ? data[d].errors[i] : "Error";
          isValidated = false;
        } else if (
          data[d].validation[i] === "validateBirthDate" &&
          data[d].value != null &&
          data[d].value !== ""
        ) {
          var s = data[d].value;
          const dates = s.split("/");
          isValidated = dates.length > 1;
          let checkV = /^\d{2}\/\d{2}$/.test(s);
          if (checkV) {
            isValidated = moment(s, "MM/DD").isValid();
            if (!isValidated) {
              obj[d] = data[d].errors[i] ? data[d].errors[i] : "Error";
            }
          }
        
          //   console.log("checkV ", checkV, s);
          //   if (checkV === false) {
          //     obj[d] = data[d].errors[i] ? data[d].errors[i] : "Error";
          //     isValidated = false;
          //   } else {
          //     let enteredData = s.split("/");
          //     if (enteredData[1] > new Date().getFullYear()) {
          //       obj[d] = data[d].errors[i] ? data[d].errors[i] : "Error";
          //       isValidated = false;
          //     }
          //   }
        } else if (
          data[d].validation[i] === "email" &&
          data[d].value != null &&
          data[d].value != "" &&
          !emailRegex.test(data[d].value)
        ) {
          obj[d] = data[d].errors[i] ? data[d].errors[i] : "Error";

          isValidated = false;
        } else if (
          data[d].validation[i] === "number" &&
          data[d].value != null &&
          data[d].value != "" &&
          !numberRegex.test(data[d].value)
        ) {
          obj[d] = data[d].errors[i] ? data[d].errors[i] : "Error";
          isValidated = false;
        } else if (data[d].validation[i].includes(":")) {
          let type = data[d].validation[i].split(":")[0];
          let range = data[d].validation[i].split(":")[1];

          if (type === "min" && data[d].value?.length < range) {
            obj[d] = data[d].errors[i] ? data[d].errors[i] : "Error";
            isValidated = false;
          } else if (type === "max" && data[d].value?.length > range) {
            obj[d] = data[d].errors[i] ? data[d].errors[i] : "Error";
            isValidated = false;
          } else if (
            type === "len" &&
            Number(data[d].value?.length) !== Number(range)
          ) {
            obj[d] = data[d].errors[i] ? data[d].errors[i] : "Error";
            isValidated = false;
          } else if (
            type === "requiredIf" &&
            data[range].value == 1 &&
            (data[d].value === null || data[d].value === "")
          ) {
            obj[d] = data[d].errors[i] ? data[d].errors[i] : "Error";
            isValidated = false;
          } else if (
            type === "requiredIfNot" &&
            data[range].value == 0 &&
            (data[d].value === null || data[d].value === "")
          ) {
            obj[d] = data[d].errors[i] ? data[d].errors[i] : "Error";
            isValidated = false;
          } else if (
            type === "minIfNot" &&
            data[range].value == 0 &&
            data[d].value?.length < 10
          ) {
            obj[d] = data[d].errors[i] ? data[d].errors[i] : "Error";
            isValidated = false;
          } else if (
            type === "maxIfNot" &&
            data[range].value == 0 &&
            data[d].value?.length > 10
          ) {
            obj[d] = data[d].errors[i] ? data[d].errors[i] : "Error";
            isValidated = false;
          } else if (type === "sameAs") {
            let sameAs = range;
            let check = 1;
            if (range.includes(",")) {
              sameAs = range.split(",")[0];
              let checkKey = range.split(",")[1];
              check = data[checkKey].value;
            }
            if (check == 1) {
              if (data[d].value != data[sameAs].value) {
                obj[d] = data[d].errors[i] ? data[d].errors[i] : "Error";
                isValidated = false;
              }
            }
          }
        }
      }
    }
  }
  return { errors: obj, isValidated: isValidated };
};
export default validate;
