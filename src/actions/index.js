import {
  ADD_EMPLOYEE,
  DELETE_EMPLOYEE,
  GET_EMPLOYEES,
  UPDATE_EMPLOYEE,
  GET_EMPLOYEE,
} from "./types";
import instance from "../api/index";

export const addEmployees = (employee) => {
  return (dispatch,getState) => {
    return instance
      .post("/employees", {
        name: employee.name,
        email: employee.email,
        phone: employee.phone,
        dob: employee.dob,
        authorId:getState().user.loggedInUser.id
       
      })
      .then(({ data }) => {
        //   console.log(data);
        dispatch({
          type: ADD_EMPLOYEE,
          payload: data,
        });
      })
      .catch((error) => {
        throw error;
      });
  };
};
export const getEmployees = () => {
  return async (dispatch,getState) => {
    try {
      const authorId = getState().user.loggedInUser.id
      const { data } = await instance.get(`/employees?authorId=${authorId}`);
      dispatch({
        type: GET_EMPLOYEES,
        payload: data,
      });
    } catch (error) {
      throw error;
    }
  };
};
export const getEmployee = () => {
  return async (dispatch, getState) => {
    try {
      const gets = getState();
      console.log("in thunk");
      console.log(gets.employees.selectedId);
      if (gets.employees.selectedId !== "") {
        const { data } = await instance.get(
          `/employees/${gets.employees.selectedId}`
        );
        console.log(data);
        dispatch({
          type: GET_EMPLOYEE,
          payload: {
            data: data,
            uid: data.id,
          },
        });
      }
    } catch (error) {
      throw error;
    }
  };
};

export const deleteEmployee = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await instance.delete(`/employees/${id}`);
      console.log(data);
      dispatch({
        type: DELETE_EMPLOYEE,
        payload: id,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const deleteEmployees = (delEmp) => {
  return async (dispatch) => {
    try {
      delEmp.map((id) => dispatch(deleteEmployee(id)));
    } catch (error) {
      throw error;
    }
  };
};

export const updateEmployee = (employee, id) => {
  return async (dispatch) => {
    try {
      const res = await instance.patch(`/employees/${id}`, {
        name: employee.name,
        email: employee.email,
        phone: employee.phone,
        dob: employee.dob,
      });
      console.log(res);
      dispatch({
        type: UPDATE_EMPLOYEE,
        payload: {
          employee,
          id,
        },
      });
    } catch (error) {
      throw error;
    }
  };
};
