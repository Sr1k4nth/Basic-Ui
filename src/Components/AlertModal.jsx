import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "reactstrap";
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
      <Modal
        isOpen={props.showModal}
        centered
        className="my-modal"
        autoFocus={false}
      >
        <ModalHeader toggle={() => props.toggle()}>
          {!props.isUpdate ? (
            <>
              {props.modalType === "update" ? (
                <>
                  {props.module === "School"
                    ? "Are you Complete the Task ? "
                    : props.module === "Personal"
                    ? "Are you Complete the Details ? "
                    : "Are you Complete the Design ? "}
                </>
              ) : (
                <>
                  {props.module === "School"
                    ? "Do you want to delete Task ? "
                    : props.module === "Personal"
                    ? "Do you want to delete Details ?"
                    : "Do you want to delete Design?"}
                </>
              )}
            </>
          ) : (
            <>
              {props.module === "School"
                ? "Edit Task"
                : props.module === "Personal"
                ? "Edit Details"
                : "Edit Design"}
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
              {props.module === "School" ? (
                <>
                  <div>You want to delete this Task ?</div>
                  <br />
                  <div>{state.taskData}</div>
                </>
              ) : props.module === "Personal" ? (
                <>
                  <div>You want to delete User Details ?</div>
                  <br />
                  <div>{state.personalData}</div>
                </>
              ) : (
                <>
                  <div>You want to delete Design Details ?</div>
                  <br />
                  <div>{state.designData}</div>
                </>
              )}
            </div>
          )}
          {props.isUpdate && (
            <div class="edit_input-main">
              <div className="edit_input-container">
                <Input
                  type="textarea"
                  className="edit_input_field"
                  autoFocus={true}
                  rows={5}
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
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          {props.modalType === "update" ? (
            <>
              {props.isUpdate ? (
                <Button
                  color=""
                  className="btn-defult-color"
                  onClick={() => updateDetails()}
                >
                  Update
                </Button>
              ) : (
                <Button
                  color=""
                  className="btn-defult-color"
                  onClick={() => props.updateAjexDetails()}
                >
                  Complete
                </Button>
              )}
            </>
          ) : (
            <>
              <Button
                color=""
                className="btn-defult-color"
                onClick={() => props.deleteAjexDetails()}
              >
                Delete
              </Button>
            </>
          )}
          <Button
            color=""
            className="btn-defult-color"
            onClick={() => props.toggle()}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default AlertModal;
