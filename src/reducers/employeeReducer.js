import {
  ADD_EMPLOYEE,
  GET_EMPLOYEES,
  DELETE_EMPLOYEE,
  DELETE_EMPLOYEES,
  UPDATE_EMPLOYEE,
  GET_EMPLOYEE,
  SET_ID,
} from "actions/types";
const initialState = {
  emply: [],
  selectedEmployee: {
    name: "",
    email: "",
    phone: "",
    dob: "",
  },
  selectedId: "",
};
export const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_EMPLOYEE:
      return {
        ...state,
        emply: [...state.emply, action.payload],
      };

    case GET_EMPLOYEES:
      return {
        ...state,
        emply: [...action.payload],
      };
    case GET_EMPLOYEE:
      console.log("in reducer");
      return {
        ...state,
        selectedEmployee: { ...action.payload.data },
      };
    case DELETE_EMPLOYEE:
      return {
        ...state,
        emply: state.emply.filter((emp) => {
          return emp.id !== action.payload;
        }),
      };

    case DELETE_EMPLOYEES:
      return {
        ...state,
        emply: state.emply.filter((emp) => {
          if (action.payload.delEmp.includes(emp.id)) {
            return false;
          }
          return true;
        }),
      };
    case UPDATE_EMPLOYEE:
      return {
        ...state,
        emply: state.emply.map((item) => {
          if (item.id === +action.payload.id) {
            item.name = action.payload.employee.name;
            item.email = action.payload.employee.email;
            item.dob = action.payload.employee.dob;
            item.phone = action.payload.employee.phone;
          }
          return item;
        }),
      };
    case SET_ID:
      console.log(action);
      return {
        ...state,
        selectedId: action.payload,
      };
    default:
      return state;
  }
};
