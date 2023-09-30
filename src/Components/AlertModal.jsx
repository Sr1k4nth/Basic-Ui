import React, { useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { reactLocalStorage } from "reactjs-localstorage";

function AlertModal(props) {
  const getInitialState = () => {
    const initialState = {
      taskData: "",
      personalData: "",
      designData: "",
      tashValidate: false,
      personalValidate: false,
      designValidate: false,
    };
    return initialState;
  };

  const [state, setState] = useState(getInitialState());

  useEffect(() => {
    if (props.schoolId || props.personalId || props.designId) {
      if (props.module === "School") {
        const taskList = reactLocalStorage.getObject("userDataDetails");
        let updateTasklist = taskList.filter(
          (item) => item.id === props.schoolId
        );
        setState((prev) => ({
          ...prev,
          taskData: updateTasklist[0].title,
        }));
      } else if (props.module === "Personal") {
        const personalDataList = reactLocalStorage.getObject("userDataDetails");
        let personalList = personalDataList.filter(
          (item) => item.id === props.personalId
        );
        setState((prev) => ({
          ...prev,
          personalData: personalList[0].title,
        }));
      } else if (props.module === "Design") {
        const designDataList = reactLocalStorage.getObject("userDataDetails");
        let designList = designDataList.filter(
          (item) => item.id === props.designId
        );
        setState((prev) => ({
          ...prev,
          designData: designList[0].title,
        }));
      }
    }
    // eslint-disable-next-line
  }, [props.schoolId, props.personalId, props.designId]);

  const updatefield = (module, fieldValue) => {
    if (module === "School") {
      setState((prev) => ({ ...prev, taskData: fieldValue }));
    } else if (module === "Personal") {
      setState((prev) => ({ ...prev, personalData: fieldValue }));
    } else if (module === "Design") {
      setState((prev) => ({ ...prev, designData: fieldValue }));
    }
  };

  const updateDetails = () => {
    if (props.module === "School") {
      if (state.taskData !== "" && state.taskData.length >= 4) {
        props.submitFrom("School", state.taskData);
        setState((prev) => ({
          ...prev,
          taskData: "",
          tashValidate: false,
        }));
      } else {
        setState((prev) => ({
          ...prev,
          tashValidate: true,
        }));
      }
    } else if (props.module === "Personal") {
      if (state.taskData !== "" && state.taskData.length >= 4) {
        props.submitFrom("Personal", state.personalData);
        setState((prev) => ({
          ...prev,
          personalData: "",
          personalValidate: false,
        }));
      } else {
        setState((prev) => ({
          ...prev,
          personalValidate: true,
        }));
      }
    } else if (props.module === "Design") {
      if (state.taskData !== "" && state.taskData.length >= 4) {
        props.submitFrom("Design", state.designData);
        setState((prev) => ({
          ...prev,
          designData: "",
          designValidate: false,
        }));
      } else {
        setState((prev) => ({
          ...prev,
          designValidate: true,
        }));
      }
    }
  };

  return (
    <div>
      <Modal isOpen={props.showModal} centered className="my-modal">
        <ModalHeader toggle={() => props.toggle()}>
          {props.modalType === "update" ? (
            <>
              {props.module === "School"
                ? "Update Task"
                : props.module === "Personal"
                ? "Update Details"
                : "Update Design"}
            </>
          ) : (
            <>
              {props.module === "School"
                ? "Delete Task"
                : props.module === "Personal"
                ? "Delete Details"
                : "Delete Design"}
            </>
          )}
        </ModalHeader>
        <ModalBody>
          {props.modalType === "update" ? (
            <div className="mt-3 mb-3">
              {!props.isUpdate && (
                <>
                  {props.module === "School"
                    ? state.taskData
                    : props.module === "Personal"
                    ? state.personalData
                    : state.designData}
                </>
              )}
            </div>
          ) : (
            <div className="mt-3 mb-3">
              {props.module === "School"
                ? "You want to delete this Task"
                : props.module === "Personal"
                ? "You want to delete User Details"
                : "You want to delete Design Details"}
            </div>
          )}
          {props.isUpdate && (
            <div
              className="form__group field mt-3 mb-4"
              style={{ width: "100%" }}
            >
              <input
                type="text"
                className="form__field"
                autoFocus='autoFocus'
                value={
                  props.module === "School"
                    ? state.taskData
                    : props.module === "Personal"
                    ? state.personalData
                    : state.designData
                }
                onChange={(e) => {
                  updatefield(props.module, e.target.value);
                }}
              />
              <div>
                {state.tashValidate ||
                state.personalValidate ||
                state.designValidate ? (
                  <div className="text-center mt-3">
                    <span className="text-danger">
                      {" "}
                      Need Minimum 4 Charcters
                    </span>
                  </div>
                ) : null}
              </div>
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          {props.modalType === "update" ? (
            <>
              {props.isUpdate ? (
                <Button color="primary" onClick={() => updateDetails()}>
                  Update
                </Button>
              ) : (
                <Button
                  color="primary"
                  onClick={() => props.updateAjexDetails()}
                >
                  Update
                </Button>
              )}
            </>
          ) : (
            <>
              <Button color="danger" onClick={() => props.deleteAjexDetails()}>
                Delete
              </Button>
            </>
          )}
          <Button color="secondary" onClick={() => props.toggle()}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default AlertModal;
