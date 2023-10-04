import React, { useEffect, useState } from "react";
import { Button, Card, Col, Input, Row, Label } from "reactstrap";
import { BiLeftArrowCircle } from "react-icons/bi";
import { BsThreeDots, BsCalendar } from "react-icons/bs";
import { AiFillPlusCircle } from "react-icons/ai";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { reactLocalStorage } from "reactjs-localstorage";
import { v4 as uuid } from "uuid";
import AlertModal from "./AlertModal";
import moment from "moment";

function FromComponents(props) {
  const getInitialState = () => {
    const initialState = {
      modalType: "",
      checked: false,
      isUpdate: false,
      deleteModal: false,
      showModal: false,
      isModule: "",
      taskData: "",
      personalData: "",
      designData: "",
      schoolId: "",
      personalId: "",
      designId: "",
      isEdit: "",
      taskValidate: false,
      personalValidate: false,
      designValidate: false,
      taskTitlExists: false,
      personalTitlExists: false,
      designTitlExists: false,
      totalTaskcount: 0,
      totalPersonalcount: 0,
      totalDesigncount: 0,
    };
    return initialState;
  };

  const [state, setState] = useState(getInitialState());
  const [taskDataDetails, setTaskDataDetails] = useState([]);
  const [comtaskDataDetails, setComTaskDataDetails] = useState([]);
  const [personalDetails, setPersonalDetails] = useState([]);
  const [comPersonalDetails, setComPersonalDetails] = useState([]);
  const [designDetails, setDesignDetails] = useState([]);
  const [comDesignDetails, setComDesignDetails] = useState([]);
  const [isShown, setIsShown] = useState(null);

  const updatefieldData = (module, fieldValue) => {
    if (module === "School") {
      setState((prev) => ({ ...prev, taskData: fieldValue }));
    } else if (module === "Personal") {
      setState((prev) => ({ ...prev, personalData: fieldValue }));
    } else if (module === "Design") {
      setState((prev) => ({ ...prev, designData: fieldValue }));
    }
  };

  const submitFrom = (module, titleData) => {
    if (module === "School") {
      if (titleData !== "") {
        setState((prev) => ({
          ...prev,
          taskData: titleData,
          isEdit: "School",
        }));
      } else {
        postAjexTaskDetails();
      }
    } else if (module === "Personal") {
      if (titleData !== "") {
        setState((prev) => ({
          ...prev,
          personalData: titleData,
          isEdit: "Personal",
        }));
      } else {
        postAjexPersonalDetails();
      }
    } else if (module === "Design") {
      if (titleData !== "") {
        setState((prev) => ({
          ...prev,
          designData: titleData,
          isEdit: "Design",
        }));
      } else {
        postAjexDesignDetails();
      }
    }
  };

  const timeFromat = (time, updateTime) => {
    let timeSplit = time.split(",");
    const date = timeSplit[0];
    const nowDate = moment().format("ddd");
    let isDateShow = date;
    return (
      <div
        className={
          date === nowDate
            ? updateTime !== ""
              ? "text-decoration-line-through d-flex text-secondary"
              : "d-flex"
            : "d-flex"
        }
      >
        <BsCalendar size={15} />
        <div className="mx-1">{isDateShow}</div>{" "}
        <div className="text-light mx-1"> {timeSplit[1]}</div>{" "}
      </div>
    );
  };

  const postAjexTaskDetails = () => {
    if (state.taskData !== "" && state.taskData.length >= 4) {
      if (!state.isUpdate) {
        const taskDatas = reactLocalStorage.getObject("userDataDetails");
        const isAlreadyExisit = taskDatas.some(
          (item) => item.title.toLowerCase() === state.taskData.toLowerCase()
        );
        if (!isAlreadyExisit) {
          taskDatas.push({
            id: uuid(),
            title: state.taskData,
            status: "pending",
            createdAt: moment().format("ddd, h:mm a"),
            updatedAt: "",
            moduleName: props.module,
            createdDate: moment().format(),
            completedCount: 0,
            totalCount: 0,
          });
          reactLocalStorage.setObject("userDataDetails", taskDatas);
          setState((prev) => ({
            ...prev,
            isModule: "School",
            taskData: "",
            schoolId: "",
            taskValidate: false,
            taskTitlExists: false,
          }));
        } else {
          setState((prev) => ({
            ...prev,
            taskValidate: false,
            taskTitlExists: true,
          }));
        }
      } else {
        const taskDatas = reactLocalStorage.getObject("userDataDetails");
        taskDatas.forEach((item, index) => {
          if (item.id === state.schoolId) {
            taskDatas[index].title = state.taskData;
            taskDatas[index].updatedAt = moment().format("ddd h:mm a");
          }
        });
        reactLocalStorage.setObject("userDataDetails", taskDatas);
        setState((prev) => ({
          ...prev,
          isModule: "School",
          taskData: "",
          isUpdate: false,
          modalType: "",
          showModal: false,
          isEdit: "",
          schoolId: "",
        }));
      }
    } else {
      setState((prev) => ({
        ...prev,
        taskValidate: true,
        taskTitlExists: false,
      }));
    }
  };

  const postAjexPersonalDetails = () => {
    if (state.personalData !== "" && state.personalData.length >= 4) {
      if (!state.isUpdate) {
        const personalDatas = reactLocalStorage.getObject("userDataDetails");
        const isAlreadyExisit = personalDatas.some(
          (item) =>
            item.title.toLowerCase() === state.personalData.toLowerCase()
        );
        if (!isAlreadyExisit) {
          personalDatas.push({
            id: uuid(),
            title: state.personalData,
            status: "pending",
            createdAt: moment().format("ddd, h:mm a"),
            updatedAt: "",
            moduleName: props.module,
            createdDate: moment().format(),
            completedCount: 0,
            totalCount: 0,
          });
          reactLocalStorage.setObject("userDataDetails", personalDatas);
          setState((prev) => ({
            ...prev,
            isModule: "Personal",
            personalData: "",
            personalValidate: false,
            personalTitlExists: false,
            personalId: "",
          }));
        } else {
          setState((prev) => ({
            ...prev,
            personalValidate: false,
            personalTitlExists: true,
          }));
        }
      } else {
        const personalDatas = reactLocalStorage.getObject("userDataDetails");
        personalDatas.forEach((item, index) => {
          if (item.id === state.personalId) {
            personalDatas[index].title = state.personalData;
            personalDatas[index].updatedAt = moment().format("ddd h:mm a");
          }
        });
        reactLocalStorage.setObject("userDataDetails", personalDatas);
        setState((prev) => ({
          ...prev,
          isModule: "Personal",
          personalData: "",
          isUpdate: false,
          modalType: "",
          showModal: false,
          isEdit: "",
          personalId: "",
        }));
      }
    } else {
      setState((prev) => ({
        ...prev,
        personalValidate: true,
        personalTitlExists: false,
      }));
    }
  };

  const postAjexDesignDetails = () => {
    if (state.designData !== "" && state.designData.length >= 4) {
      if (!state.isUpdate) {
        const designDatas = reactLocalStorage.getObject("userDataDetails");
        const isAlreadyExisit = designDatas.some(
          (item) => item.title.toLowerCase() === state.designData.toLowerCase()
        );
        if (!isAlreadyExisit) {
          designDatas.push({
            id: uuid(),
            title: state.designData,
            status: "pending",
            createdAt: moment().format("ddd, h:mm a"),
            updatedAt: "",
            moduleName: props.module,
            createdDate: moment().format(),
            completedCount: 0,
            totalCount: 0,
          });
          reactLocalStorage.setObject("userDataDetails", designDatas);
          setState((prev) => ({
            ...prev,
            isModule: "Design",
            designData: "",
            designValidate: false,
            designTitlExists: false,
            designId: "",
          }));
        } else {
          setState((prev) => ({
            ...prev,
            designValidate: false,
            designTitlExists: true,
          }));
        }
      } else {
        const designDatas = reactLocalStorage.getObject("userDataDetails");
        designDatas.forEach((item, index) => {
          if (item.id === state.designId) {
            designDatas[index].title = state.designData;
            designDatas[index].updatedAt = moment().format("ddd h:mm a");
          }
        });
        reactLocalStorage.setObject("userDataDetails", designDatas);
        setState((prev) => ({
          ...prev,
          isModule: "Design",
          designData: "",
          isUpdate: false,
          modalType: "",
          showModal: false,
          isEdit: "",
          designId: "",
        }));
      }
    } else {
      setState((prev) => ({
        ...prev,
        designValidate: true,
        designTitlExists: false,
      }));
    }
  };

  const getTaskDetails = () => {
    const userDetailsList = reactLocalStorage.getObject("userDataDetails");
    const taskList = userDetailsList?.filter(
      (item) => item.moduleName === "School"
    );
    let pendingTasklist = taskList?.filter((item) => item.status === "pending");
    let completedTasklist = taskList?.filter(
      (item) => item.status === "completed"
    );
    let datelist = taskList?.filter(
      (item) => moment(item.createdDate).format("L") === moment().format("L")
    );
    let dateComlist = completedTasklist?.filter(
      (item) => moment(item.createdDate).format("L") === moment().format("L")
    );
    const sortedFilteredPendTaskList = [...pendingTasklist]
      .sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      })
      .reverse();
    const sortedFilteredComTaskList = [...completedTasklist]
      .sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      })
      .reverse();
    const newArray = sortedFilteredPendTaskList.reduce((acc, dt, index) => {
      const date = new Date(dt.createdDate);
      const formatedDate = `${date.toLocaleDateString()}`;
      acc[formatedDate] = acc[formatedDate] || {
        date: formatedDate,
        value: [],
      };
      acc[formatedDate].value.push({
        id: dt.id,
        showCount: index,
        title: dt.title,
        status: dt.status,
        createdAt: dt.createdAt,
        updatedAt: dt.updatedAt,
        moduleName: dt.moduleName,
        completedCount: dateComlist.length,
        totalCount: datelist.length,
      });
      return acc;
    }, {});
    const newPendingArray = Object.values(newArray);
    setTaskDataDetails(newPendingArray);
    setComTaskDataDetails(sortedFilteredComTaskList);
    setState((prev) => ({
      ...prev,
      isModule: "",
      totalTaskcount: pendingTasklist.length,
    }));
  };

  const getPersonalDetails = () => {
    const userDetailsList = reactLocalStorage.getObject("userDataDetails");
    const personalList = userDetailsList?.filter(
      (item) => item.moduleName === "Personal"
    );
    let pendingPerlist = personalList?.filter(
      (item) => item.status === "pending"
    );
    let completedPerlist = personalList?.filter(
      (item) => item.status === "completed"
    );
    let datelist = personalList?.filter(
      (item) => moment(item.createdDate).format("L") === moment().format("L")
    );
    let dateComlist = completedPerlist?.filter(
      (item) => moment(item.createdDate).format("L") === moment().format("L")
    );
    const sortedFilteredPendPerList = [...pendingPerlist]
      .sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      })
      .reverse();
    const sortedFilteredComPerList = [...completedPerlist]
      .sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      })
      .reverse();
    const newArray = sortedFilteredPendPerList.reduce((acc, dt, index) => {
      const date = new Date(dt.createdDate);
      const formatedDate = `${date.toLocaleDateString()}`;
      acc[formatedDate] = acc[formatedDate] || {
        date: formatedDate,
        value: [],
      };
      acc[formatedDate].value.push({
        id: dt.id,
        showCount: index,
        title: dt.title,
        status: dt.status,
        createdAt: dt.createdAt,
        updatedAt: dt.updatedAt,
        moduleName: dt.moduleName,
        completedCount: dateComlist.length,
        totalCount: datelist.length,
      });
      return acc;
    }, {});
    const newPendingArray = Object.values(newArray);
    setComPersonalDetails(sortedFilteredComPerList);
    setPersonalDetails(newPendingArray);
    setState((prev) => ({
      ...prev,
      isModule: "",
      totalPersonalcount: pendingPerlist.length,
    }));
  };

  const getDesignDetails = () => {
    const userDetailsList = reactLocalStorage.getObject("userDataDetails");
    const designList = userDetailsList?.filter(
      (item) => item.moduleName === "Design"
    );
    let pendingDesignlist = designList?.filter(
      (item) => item.status === "pending"
    );
    let completedDesignlist = designList?.filter(
      (item) => item.status === "completed"
    );
    let datelist = designList?.filter(
      (item) => moment(item.createdDate).format("L") === moment().format("L")
    );
    let dateComlist = completedDesignlist?.filter(
      (item) => moment(item.createdDate).format("L") === moment().format("L")
    );
    const sortedFilteredPendDesignList = [...pendingDesignlist]
      .sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      })
      .reverse();
    const sortedFilteredComDesignList = [...completedDesignlist]
      .sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      })
      .reverse();

    const newArray = sortedFilteredPendDesignList.reduce((acc, dt, index) => {
      const date = new Date(dt.createdDate);
      const formatedDate = `${date.toLocaleDateString()}`;

      acc[formatedDate] = acc[formatedDate] || {
        date: formatedDate,
        value: [],
      };
      acc[formatedDate].value.push({
        id: dt.id,
        showCount: index,
        title: dt.title,
        status: dt.status,
        createdAt: dt.createdAt,
        updatedAt: dt.updatedAt,
        moduleName: dt.moduleName,
        completedCount: dateComlist.length,
        totalCount: datelist.length,
      });
      return acc;
    }, {});
    const newPendingArray = Object.values(newArray);
    setComDesignDetails(sortedFilteredComDesignList);
    setDesignDetails(newPendingArray);
    setState((prev) => ({
      ...prev,
      isModule: "",
      totalDesigncount: pendingDesignlist.length,
    }));
  };

  const toggle = () => {
    setState((prev) => ({
      ...prev,
      showModal: false,
      modalType: "",
      isUpdate: false,
    }));
  };

  const updateFrom = (id) => {
    if (props.module === "School") {
      setState((prev) => ({
        ...prev,
        schoolId: id,
        isUpdate: true,
        showModal: true,
        modalType: "update",
      }));
    } else if (props.module === "Personal") {
      setState((prev) => ({
        ...prev,
        personalId: id,
        isUpdate: true,
        showModal: true,
        modalType: "update",
      }));
    } else if (props.module === "Design") {
      setState((prev) => ({
        ...prev,
        designId: id,
        isUpdate: true,
        showModal: true,
        modalType: "update",
      }));
    }
  };

  const updateDetails = (id) => {
    if (props.module === "School") {
      setState((prev) => ({
        ...prev,
        showModal: true,
        isUpdate: false,
        modalType: "update",
        schoolId: id,
      }));
    } else if (props.module === "Personal") {
      setState((prev) => ({
        ...prev,
        showModal: true,
        isUpdate: false,
        modalType: "update",
        personalId: id,
      }));
    } else if (props.module === "Design") {
      setState((prev) => ({
        ...prev,
        showModal: true,
        isUpdate: false,
        modalType: "update",
        designId: id,
      }));
    }
  };

  const updateAjexDetails = () => {
    if (props.module === "School") {
      const taskDatas = reactLocalStorage.getObject("userDataDetails");
      taskDatas.forEach((item, index) => {
        if (item.id === state.schoolId) {
          taskDatas[index].status = "completed";
        }
      });
      reactLocalStorage.setObject("userDataDetails", taskDatas);
      setState((prev) => ({
        ...prev,
        isModule: "School",
        showModal: false,
        modalType: "",
        isUpdate: false,
      }));
    } else if (props.module === "Personal") {
      const personalDatas = reactLocalStorage.getObject("userDataDetails");
      personalDatas.forEach((item, index) => {
        if (item.id === state.personalId) {
          personalDatas[index].status = "completed";
        }
      });
      reactLocalStorage.setObject("userDataDetails", personalDatas);
      setState((prev) => ({
        ...prev,
        isModule: "Personal",
        showModal: false,
        modalType: "",
        isUpdate: false,
      }));
    } else if (props.module === "Design") {
      const designDatas = reactLocalStorage.getObject("userDataDetails");
      designDatas.forEach((item, index) => {
        if (item.id === state.designId) {
          designDatas[index].status = "completed";
        }
      });
      reactLocalStorage.setObject("userDataDetails", designDatas);
      setState((prev) => ({
        ...prev,
        isModule: "Design",
        showModal: false,
        modalType: "",
        isUpdate: false,
      }));
    }
  };

  const deleteDetails = (id) => {
    if (props.module === "School") {
      setState((prev) => ({
        ...prev,
        showModal: true,
        modalType: "delete",
        schoolId: id,
        isUpdate: false,
      }));
    } else if (props.module === "Personal") {
      setState((prev) => ({
        ...prev,
        showModal: true,
        modalType: "delete",
        personalId: id,
        isUpdate: false,
      }));
    } else if (props.module === "Design") {
      setState((prev) => ({
        ...prev,
        showModal: true,
        modalType: "delete",
        designId: id,
        isUpdate: false,
      }));
    }
  };

  const deleteAjexDetails = () => {
    if (props.module === "School") {
      const taskList = reactLocalStorage.getObject("userDataDetails");
      let deleteTasklist = taskList.filter(
        (item) => item.id !== state.schoolId
      );
      reactLocalStorage.setObject("userDataDetails", deleteTasklist);
      setState((prev) => ({
        ...prev,
        modalType: "",
        showModal: false,
        isUpdate: false,
      }));
    } else if (props.module === "Personal") {
      const personalList = reactLocalStorage.getObject("userDataDetails");
      let deletePersonallist = personalList.filter(
        (item) => item.id !== state.personalId
      );
      reactLocalStorage.setObject("userDataDetails", deletePersonallist);
      setState((prev) => ({
        ...prev,
        modalType: "",
        showModal: false,
        isUpdate: false,
      }));
    } else if (props.module === "Design") {
      const designList = reactLocalStorage.getObject("userDataDetails");
      let deleteDesignlist = designList.filter(
        (item) => item.id !== state.designId
      );
      reactLocalStorage.setObject("userDataDetails", deleteDesignlist);
      setState((prev) => ({
        ...prev,
        modalType: "",
        showModal: false,
        isUpdate: false,
      }));
    }
  };

  const getInitialFuncation = () => {
    let isAvaiable = reactLocalStorage.get("userDataDetails");
    if (isAvaiable === undefined) {
      reactLocalStorage.setObject("userDataDetails", []);
    }
  };

  useEffect(() => {
    Promise.all([getInitialState(), getInitialFuncation()])
      .then((result) => {
        if (props.module === "School") {
          getTaskDetails();
        } else if (props.module === "Personal") {
          getPersonalDetails();
        } else if (props.module === "Design") {
          getDesignDetails();
        }
      })
      .catch((err) => {
        console.log("initial Fuction Error");
      });

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (state.isModule === "School") {
      getTaskDetails();
    } else if (state.isModule === "Personal") {
      getPersonalDetails();
    } else if (state.isModule === "Design") {
      getDesignDetails();
    }
    // eslint-disable-next-line
  }, [state.isModule]);

  useEffect(() => {
    if (state.isEdit === "School") {
      postAjexTaskDetails();
    } else if (state.isEdit === "Personal") {
      postAjexPersonalDetails();
    } else if (state.isEdit === "Design") {
      postAjexDesignDetails();
    }
    // eslint-disable-next-line
  }, [state.isEdit]);

  useEffect(() => {
    if (props.module === "School") {
      getTaskDetails();
    } else if (props.module === "Personal") {
      getPersonalDetails();
    } else if (props.module === "Design") {
      getDesignDetails();
    }
    // eslint-disable-next-line
  }, [state.modalType]);

  return (
    <div className="maincontainar">
      <Row>
        <Col></Col>
        <Col md="9" className="d-flex justify-content-between">
          <div className="d-flex">
            <Button className="bg-transparent border-0 button-style">
              <BiLeftArrowCircle className="text-light" size={40} />
            </Button>{" "}
            &nbsp;&nbsp;&nbsp;
            <h3 className="text-light mt-2">
              <b>
                {" "}
                {props.module === "School"
                  ? "School"
                  : props.module === "Personal"
                  ? "Personal Details"
                  : "Design"}
              </b>
            </h3>
          </div>
          <div>
            <Button className="bg-transparent border-0 button-style">
              <BsThreeDots className="text-light" size={30} />
            </Button>{" "}
            &nbsp;&nbsp;&nbsp;
          </div>
        </Col>
        <Col></Col>
      </Row>
      <div className="d-flex justify-content-center mt-5 mb-3">
        <div class="input-main">
          <div className="input-container">
            <span className="input-icon">
              <AiFillPlusCircle size={40} />
            </span>
            <form
              className="from-field"
              onSubmit={(e) => {
                e.preventDefault();
                submitFrom(props.module, "");
              }}
            >
              <input
                type="text"
                class="input_field"
                autoFocus={true}
                value={
                  props.module === "School"
                    ? state.taskData
                    : props.module === "Personal"
                    ? state.personalData
                    : state.designData
                }
                onChange={(e) => {
                  updatefieldData(props.module, e.target.value);
                }}
                placeholder={
                  props.module === "School"
                    ? "Add Task"
                    : props.module === "Personal"
                    ? "Add Details"
                    : "Add New Design"
                }
              />
            </form>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        {!state.isUpdate ? (
          <>
            {state.taskValidate ||
            state.personalValidate ||
            state.designValidate ? (
              <div className="mt-3">
                <span className="text-danger"> Need Minimum 4 Charcters</span>
              </div>
            ) : null}
            {state.taskTitlExists ||
            state.personalTitlExists ||
            state.designTitlExists ? (
              <div className=" mt-3">
                <span className="text-danger"> Already Exists Title</span>
              </div>
            ) : null}
          </>
        ) : null}
      </div>
      <div className="text-center mt-4">
        {props.module === "School" ? (
          <>
            {taskDataDetails.length > 0 ? (
              <>
                <Row className="justify-content-center">
                  <Col md="10" sm="12" lg="8">
                    <h4 className="headerList">
                      Task - {state.totalTaskcount}
                    </h4>
                  </Col>
                </Row>
                <div className="pending-list">
                  <Row className="justify-content-center">
                    <Col md="12" sm="12" lg="9">
                      {taskDataDetails.map((item, index) =>
                        item.value.map((taskItem, idx) => (
                          <>
                            <Card
                              className="card-style"
                              onMouseEnter={() =>
                                setIsShown(taskItem.showCount)
                              }
                              onMouseLeave={() => setIsShown(null)}
                            >
                              <Row>
                                <Col className="text-lg-start">
                                  <div className="d-flex">
                                    <Input
                                      size="md"
                                      type="checkbox"
                                      className="checkbox-custom"
                                      checked={state.checked}
                                      onChange={() => {
                                        updateDetails(taskItem.id, idx);
                                      }}
                                    />
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <div className="text-height">
                                      {" "}
                                      <p className="font-style">
                                        {" "}
                                        {taskItem.title}
                                      </p>
                                    </div>
                                  </div>
                                </Col>
                              </Row>
                              <Row>
                                <Col
                                  md="12"
                                  className="fontsize-13 d-flex justify-content-between"
                                >
                                  <div className="d-flex time-space">
                                    <div>{`${taskItem.completedCount}/${taskItem.totalCount}`}</div>{" "}
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <div className="text-pink">
                                      {timeFromat(
                                        taskItem.createdAt,
                                        taskItem.updatedAt
                                      )}
                                    </div>
                                    {taskItem.updatedAt ? (
                                      <div className="mx-2 text-pink">
                                        {timeFromat(taskItem.updatedAt, "")}
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                  {isShown === taskItem.showCount && (
                                    <div className="d-flex">
                                      <Button
                                        className="bg-transparent border-0 button-style"
                                        onClick={() =>
                                          updateFrom(taskItem.id, "edit")
                                        }
                                      >
                                        <FiEdit size={20} />
                                      </Button>
                                      &nbsp;
                                      <Button
                                        className="bg-transparent border-0 button-style"
                                        onClick={() =>
                                          deleteDetails(taskItem.id)
                                        }
                                      >
                                        <FiTrash2 size={20} />
                                      </Button>
                                    </div>
                                  )}
                                </Col>
                              </Row>
                            </Card>
                          </>
                        ))
                      )}
                    </Col>
                  </Row>
                </div>
              </>
            ) : null}
            {comtaskDataDetails.length > 0 ? (
              <>
                <Row className="justify-content-center">
                  <Col md="10" sm="12" lg="8" className="mt-3">
                    <h4 className="headerList">
                      Completed - {comtaskDataDetails.length}
                    </h4>
                  </Col>
                </Row>
                <div className="complted-list">
                  <Row className="justify-content-center">
                    <Col md="12" sm="12" lg="9">
                      {comtaskDataDetails.map((item, idx) => (
                        <>
                          <Card className="card-style text-lg-start">
                            <Row>
                              <Label className="d-flex">
                                <Input
                                  size="md"
                                  type="checkbox"
                                  className="checkbox-custom"
                                  checked={true}
                                />
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <div className="text-height">
                                  {" "}
                                  <p className="font-style text-decoration-line-through">
                                    {" "}
                                    {item.title}
                                  </p>
                                </div>
                              </Label>
                            </Row>
                            <Row>
                              <Col
                                md="12"
                                className="fontsize-13 d-flex justify-content-between"
                              >
                                <div className="d-flex time-space">
                                  <div className="text-pink">
                                    {timeFromat(item.createdAt, item.updatedAt)}
                                  </div>
                                </div>
                              </Col>
                            </Row>
                          </Card>
                        </>
                      ))}
                    </Col>
                  </Row>
                </div>
              </>
            ) : null}
          </>
        ) : null}
        {props.module === "Personal" ? (
          <>
            {personalDetails.length > 0 ? (
              <>
                <Row className="justify-content-center">
                  <Col md="10" sm="12" lg="8" className="mt-3">
                    <h4 className="headerList">
                      User Details - {state.totalPersonalcount}
                    </h4>
                  </Col>
                </Row>
                <div className="pending-list">
                  <Row className="justify-content-center">
                    <Col md="12" sm="12" lg="9">
                      {personalDetails.map((item, index) =>
                        item.value.map((taskItem, idx) => (
                          <>
                            <Card
                              className="card-style"
                              onMouseEnter={() =>
                                setIsShown(taskItem.showCount)
                              }
                              onMouseLeave={() => setIsShown(null)}
                            >
                              <Row>
                                <Col className="text-lg-start">
                                  <div className="d-flex">
                                    <Input
                                      size="md"
                                      type="checkbox"
                                      className="checkbox-custom"
                                      checked={state.checked}
                                      onChange={() => {
                                        updateDetails(taskItem.id, idx);
                                      }}
                                    />
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <div className="text-height">
                                      {" "}
                                      <p className="font-style">
                                        {" "}
                                        {taskItem.title}
                                      </p>
                                    </div>
                                  </div>
                                </Col>
                              </Row>
                              <Row>
                                <Col
                                  md="12"
                                  className="fontsize-13 d-flex justify-content-between"
                                >
                                  <div className="d-flex time-space">
                                    <div>{`${taskItem.completedCount}/${taskItem.totalCount}`}</div>{" "}
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <div className="text-pink">
                                      {timeFromat(
                                        taskItem.createdAt,
                                        taskItem.updatedAt
                                      )}
                                    </div>
                                    {taskItem.updatedAt ? (
                                      <div className="mx-2 text-pink">
                                        {timeFromat(taskItem.updatedAt, "")}
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                  {isShown === taskItem.showCount && (
                                    <div className="d-flex">
                                      <Button
                                        className="bg-transparent border-0 button-style"
                                        onClick={() =>
                                          updateFrom(taskItem.id, "edit")
                                        }
                                      >
                                        <FiEdit size={20} />
                                      </Button>
                                      &nbsp;
                                      <Button
                                        className="bg-transparent border-0 button-style"
                                        onClick={() =>
                                          deleteDetails(taskItem.id)
                                        }
                                      >
                                        <FiTrash2 size={20} />
                                      </Button>
                                    </div>
                                  )}
                                </Col>
                              </Row>
                            </Card>
                          </>
                        ))
                      )}
                    </Col>
                  </Row>
                </div>
              </>
            ) : null}
            {comPersonalDetails.length > 0 ? (
              <>
                <Row className="justify-content-center">
                  <Col md="10" sm="12" lg="8" className="mt-3">
                    <h4 className="headerList">
                      Completed - {comPersonalDetails.length}
                    </h4>
                  </Col>
                </Row>
                <div className="complted-list">
                  <Row className="justify-content-center">
                    <Col md="12" sm="12" lg="9" className="mt-3">
                      {comPersonalDetails.map((item, idx) => (
                        <>
                          <Card className="card-style text-lg-start">
                            <Row>
                              <Label className="d-flex">
                                <Input
                                  size="md"
                                  type="checkbox"
                                  className="checkbox-custom"
                                  checked={true}
                                />
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <div className="text-height">
                                  {" "}
                                  <p className="font-style text-decoration-line-through">
                                    {" "}
                                    {item.title}
                                  </p>
                                </div>
                              </Label>
                            </Row>
                            <Row>
                              <Col
                                md="12"
                                className="fontsize-13 d-flex justify-content-between"
                              >
                                <div className="d-flex time-space">
                                  <div className="text-pink">
                                    {timeFromat(item.createdAt, item.updatedAt)}
                                  </div>
                                </div>
                              </Col>
                            </Row>
                          </Card>
                        </>
                      ))}
                    </Col>
                  </Row>
                </div>
              </>
            ) : null}
          </>
        ) : null}
        {props.module === "Design" ? (
          <>
            {designDetails.length > 0 ? (
              <>
                <Row className="justify-content-center">
                  <Col md="10" sm="12" lg="8" className="mt-3">
                    <h4 className="headerList">
                      New Design - {state.totalDesigncount}
                    </h4>
                  </Col>
                </Row>
                <div className="pending-list">
                  <Row className="justify-content-center">
                    <Col md="12" sm="12" lg="9" className="mt-3">
                      {designDetails.map((item, index) =>
                        item.value.map((taskItem, idx) => (
                          <>
                            <Card
                              className="card-style"
                              onMouseEnter={() =>
                                setIsShown(taskItem.showCount)
                              }
                              onMouseLeave={() => setIsShown(null)}
                            >
                              <Row>
                                <Col className="text-lg-start">
                                  <div className="d-flex">
                                    <Input
                                      size="md"
                                      type="checkbox"
                                      className="checkbox-custom"
                                      checked={state.checked}
                                      onChange={() => {
                                        updateDetails(taskItem.id, idx);
                                      }}
                                    />
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <div className="text-height">
                                      {" "}
                                      <p className="font-style">
                                        {" "}
                                        {taskItem.title}
                                      </p>
                                    </div>
                                  </div>
                                </Col>
                              </Row>
                              <Row>
                                <Col
                                  md="12"
                                  className="fontsize-13 d-flex justify-content-between"
                                >
                                  <div className="d-flex time-space">
                                    <div>{`${taskItem.completedCount}/${taskItem.totalCount}`}</div>{" "}
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <div className="text-pink">
                                      {timeFromat(
                                        taskItem.createdAt,
                                        taskItem.updatedAt
                                      )}
                                    </div>
                                    {taskItem.updatedAt ? (
                                      <div className="mx-2 text-pink">
                                        {timeFromat(taskItem.updatedAt, "")}
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                  {isShown === taskItem.showCount && (
                                    <div className="d-flex">
                                      <Button
                                        className="bg-transparent border-0 button-style"
                                        onClick={() =>
                                          updateFrom(taskItem.id, "edit")
                                        }
                                      >
                                        <FiEdit size={20} />
                                      </Button>
                                      &nbsp;
                                      <Button
                                        className="bg-transparent border-0 button-style"
                                        onClick={() =>
                                          deleteDetails(taskItem.id)
                                        }
                                      >
                                        <FiTrash2 size={20} />
                                      </Button>
                                    </div>
                                  )}
                                </Col>
                              </Row>
                            </Card>
                          </>
                        ))
                      )}
                    </Col>
                  </Row>
                </div>
              </>
            ) : null}
            {comDesignDetails.length > 0 ? (
              <>
                <Row className="justify-content-center">
                  <Col md="10" sm="12" lg="8" className="mt-3">
                    <h4 className="headerList">
                      Completed - {comDesignDetails.length}
                    </h4>
                  </Col>
                </Row>
                <div className="complted-list">
                  <Row className="justify-content-center">
                    <Col md="12" sm="12" lg="9" className="mt-3">
                      {comDesignDetails.map((item, idx) => (
                        <>
                          <Card className="card-style text-lg-start">
                            <Row>
                              <Label className="d-flex">
                                <Input
                                  size="md"
                                  type="checkbox"
                                  className="checkbox-custom"
                                  checked={true}
                                />
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <div className="text-height">
                                  {" "}
                                  <p className="font-style text-decoration-line-through">
                                    {" "}
                                    {item.title}
                                  </p>
                                </div>
                              </Label>
                            </Row>
                            <Row>
                              <Col
                                md="12"
                                className="fontsize-13 d-flex justify-content-between"
                              >
                                <div className="d-flex time-space">
                                  <div className="text-pink">
                                    {timeFromat(item.createdAt, item.updatedAt)}
                                  </div>
                                </div>
                              </Col>
                            </Row>
                          </Card>
                        </>
                      ))}
                    </Col>
                  </Row>
                </div>
              </>
            ) : null}
          </>
        ) : null}
      </div>
      <AlertModal
        schoolId={state.schoolId}
        personalId={state.personalId}
        designId={state.designId}
        showModal={state.showModal}
        isUpdate={state.isUpdate}
        modalType={state.modalType}
        module={props.module}
        toggle={toggle}
        submitFrom={submitFrom}
        updateAjexDetails={updateAjexDetails}
        deleteAjexDetails={deleteAjexDetails}
      />
    </div>
  );
}

export default FromComponents;
