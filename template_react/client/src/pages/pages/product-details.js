import React, { useState } from "react";

import InputMask from "react-input-mask";

import { TagsInput } from "react-tag-input-component";
import { PDFViewer } from "@react-pdf/renderer";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "./../../components/card/card.jsx";
import "react-quill/dist/quill.snow.css";
import "bootstrap-daterangepicker/daterangepicker.css";

import * as aiService from "../../service/resumeService.js";
import BasicResume from "../../components/resumes/basic.jsx";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Dna } from "react-loader-spinner";
import {
  employmentData,
  educationData,
  employerStartDate,
  employerEndDate,
  educationStartDate,
  educationEndDate,
} from "./helpers/resumeHelper.js";

function PagesProductDetails() {
  const [xhrInFlight, setXhrInFlight] = useState(false);
  const [createResume, setCreateResume] = useState(false);
  const [employment, setEmployment] = useState([]);
  const [education, setEducation] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [desiredJob, setDesiredJob] = useState("");
  const [phoneNumber, setPhone] = useState("");
  const [skills, setSkills] = useState([]);
  const [summary, setSummary] = useState("");
  const [website, setWebsite] = useState("");
  const [location, setLocation] = useState("");
  const [techResume, setTechResume] = useState({
    title: "",
    workExperiences: [],
    educationExperiences: [],
    skills: [],
    aboutMe: "",
  });

  const [techProfile, setTechProfile] = useState({
    name: "",
    email: "",
    phone: "",
    website: "",
    location: "",
  });

  const handleEmploymentStartDate = (event, index) => {
    let values = employerStartDate(employment, event, index);
    setEmployment(values);
  };

  const handleEmploymentEndDate = (event, index) => {
    const prevEmployment = [...employment];

    let values = employerEndDate(prevEmployment, event, index);
    setEmployment(values);
  };

  const handleEducationStartDate = (event, index) => {
    let prevEducation = [...education];
    let values = educationStartDate(prevEducation, event, index);
    setEducation(values);
  };

  const handleEducationEndDate = (event, index) => {
    const prevEducation = [...education];
    let values = educationEndDate(prevEducation, event, index);

    setEducation(values);
  };

  const addEmployment = () => {
    setEmployment([...employment, employmentData]);
  };

  const handleJobUpdate = (index, event) => {
    const values = [...employment];
    values[index][event.target.name] = event.target.value;
    setEmployment(values);
  };

  const removeEmployment = (index) => {
    const values = [...employment];
    values.splice(index, 1);
    setEmployment(values);
  };

  const addEducation = () => {
    setEducation([...education, educationData]);
  };

  const handleEducationUpdate = (index, event) => {
    const values = [...education];
    values[index][event.target.name] = event.target.value;
    setEducation(values);
  };

  const handleSkillsCall = async (e) => {
    setDesiredJob(e);
    if (e.length > 4) {
      await aiService
        .generateJobTitle({ desiredJob: e })
        .then((res) => {
          let skillItems = res;

          setSkills(skillItems);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  //Submit and create all AI items at once
  const handleSubmit = () => {
    setXhrInFlight(true);
    let newEmployment = [];
    newEmployment = employment.map((item, index) => {
      return {
        employment: item,
        index: index,
      };
    });
    let summaryText = summary.length === 0 ? website : summary;
    let summaryPromise = new Promise((resolve, reject) => {
      aiService
        .generateSummary({ summary: summaryText })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });

    let employmentPromise = new Promise((resolve, reject) => {
      if (newEmployment.length === 0) {
        resolve();
      } else {
        aiService
          .reformatJobDescription({ employment: newEmployment })
          .then((res) => {
            let values = [...employment];
            res.map((r, index) => {
              employment.map((e, i) => {
                if (index === i) {
                  values[i]["description"] = r;
                }
                resolve(values);
              });
            });
          })
          .then(() => {})
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      }
    });

    Promise.all([summaryPromise, employmentPromise])
      .then((res) => {
        setSummary(res[0].summary);
        setTechResume({
          title: desiredJob,
          workExperiences: res[1],
          educationExperiences: education,
          skills: skills,
          aboutMe: res[0].summary,
        });

        setTechProfile({
          name: name,
          email: email,
          phone: phoneNumber,
          website: website,
          location: location,
        });
        setXhrInFlight(false);
        setCreateResume(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeTag = (e, index) => {
    console.log(skills[index]);
    let indexToRemove = skills[index].value
      ? skills[index].value.findIndex((s) => s === e)
      : skills[index].Value.findIndex((s) => s === e);

    let value = [...skills];
    value[index].value
      ? value[index].value.splice(indexToRemove, 1)
      : value[index].Value.splice(indexToRemove, 1);
    setSkills(value);
  };

  const addTag = (e, index) => {
    let value = [...skills];
    value[index].value = e;
    setSkills(value);
  };
  return (
    <div>
      <div className="d-flex align-items-center mb-3">
        <div>
          <h1 className="page-header mb-0">Resume Information</h1>
        </div>
      </div>

      <div className="row gx-4">
        <div className="col-md-6">
          <Card className="mb-4">
            <CardHeader className="d-flex align-items-center bg-inverse bg-opacity-10 fw-400">
              Personal Details
            </CardHeader>
            <CardBody>
              <form>
                <div className="row">
                  <div className="col-xl-6">
                    <div className="form-group mb-3">
                      <label
                        className="form-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Name
                      </label>
                      <input
                        onBlur={(e) => setName(e.target.value)}
                        type="text"
                        className="form-control"
                        id="exampleFormControlInput1"
                        placeholder="John Smith"
                        name="name"
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label
                        className="form-label"
                        htmlFor="exampleFormControlTextarea1"
                      >
                        Email
                      </label>
                      <input
                        onBlur={(e) => setEmail(e.target.value)}
                        type="email"
                        className="form-control"
                        id="exampleFormControlInput1"
                        placeholder="John.Smith@Gmail.com"
                        name="email"
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label
                        className="form-label"
                        htmlFor="exampleFormControlTextarea1"
                      >
                        LinkedIn Profile
                      </label>
                      <input
                        onBlur={(e) => setWebsite(e.target.value)}
                        type="text"
                        className="form-control"
                        id="website"
                        placeholder="https://www.linkedin.com/in/john-smith/"
                        name="website"
                      />
                    </div>
                  </div>
                  <div className="col-xl-6">
                    <div className="form-group mb-3">
                      <label
                        className="form-label"
                        htmlFor="exampleFormControlSelect1"
                      >
                        Desired Job
                      </label>
                      <div className="input-group flex-nowrap">
                        <input
                          onBlur={(e) => {
                            handleSkillsCall(e.target.value);
                          }}
                          type="text"
                          className="form-control"
                          id="exampleFormControlInput1"
                          placeholder="Software Developer"
                          name="desiredJob"
                        ></input>
                      </div>
                    </div>
                    <div className="form-group mb-3">
                      <label className="form-label">Phone</label>
                      <InputMask
                        mask="(999) 999-9999"
                        className="form-control"
                        placeholder="(999) 999-9999"
                        maskChar={null}
                        onChange={(e) => {
                          setPhone(e.target.value);
                        }}
                        name="phoneNumber"
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label className="form-label" htmlFor="location">
                        Location
                      </label>
                      <input
                        onBlur={(e) => setLocation(e.target.value)}
                        type="text"
                        className="form-control"
                        id="location"
                        placeholder="San Diego, CA"
                        name="location"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </CardBody>
          </Card>
          <Card className="mb-4">
            <CardHeader className="d-flex align-items-center bg-inverse bg-opacity-10 fw-400">
              Professional Summary
            </CardHeader>
            <CardBody className="card-body pb-2">
              <div className="mb-2">
                <h6 className="card-subtitle mb-3 text-white text-opacity-50">
                  Write 2-4 short & energetic sentences to interest the reader!
                  Mention your role, experience & most importantly - your
                  biggest achievements, best qualities and skills.
                </h6>
                <div className="d-block d-lg-flex align-items-center">
                  <textarea
                    onBlur={(e) => {
                      setSummary(e.target.value);
                    }}
                    rows={5}
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="e.g. Passionate developer with 8+ years of experience and proven skills in JavaScript, React, Node.js, and Python. Seeking to deliver efficient coding solutions as a Senior Developer at Company X...."
                  />
                </div>
              </div>
            </CardBody>
          </Card>
          <Card className="mb-4">
            <CardHeader className="d-flex align-items-center bg-inverse bg-opacity-10 fw-400">
              Employment History
            </CardHeader>
            <CardBody>
              <h6 className="card-subtitle mb-3 text-white text-opacity-50">
                Show relevant experience for the job you are applying for.
              </h6>
              {employment.length > 0
                ? employment.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="accordion"
                        id="accordionExample"
                      >
                        <div className="accordion-item mt-4 mb-4">
                          <h2 className="accordion-header" id="headingOne">
                            <button
                              className="accordion-button"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target={`#collapse${index}`}
                            >
                              {item.jobTitle
                                ? item.jobTitle
                                : `Job # ${index + 1}`}
                            </button>
                          </h2>

                          <div
                            id={`collapse${index}`}
                            className="accordion-collapse collapse show"
                            data-bs-parent="#accordionExample"
                          >
                            <div className="accordion-body">
                              <div className="row mb-3 gx-3">
                                <div className="col-6">
                                  <label
                                    className="form-label"
                                    htmlFor="jobTitle"
                                  >
                                    Job Title
                                  </label>
                                  <input
                                    onBlur={(event) =>
                                      handleJobUpdate(index, event)
                                    }
                                    type="text"
                                    className="form-control"
                                    name="jobTitle"
                                    id="jobTitle"
                                  />
                                </div>
                                <div className="col-6">
                                  <label
                                    className="form-label"
                                    htmlFor="employer"
                                  >
                                    Employer
                                  </label>
                                  <input
                                    onBlur={(event) =>
                                      handleJobUpdate(index, event)
                                    }
                                    type="text"
                                    className="form-control"
                                    name="employer"
                                    id="employer"
                                  />
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-6 row ">
                                  <div className="col-6">
                                    <div className="form-group mb-3">
                                      <label
                                        className="form-label"
                                        htmlFor="dateRange"
                                      >
                                        From
                                      </label>
                                      <DatePicker
                                        selected={item.startDate}
                                        onChange={(e) =>
                                          handleEmploymentStartDate(e, index)
                                        }
                                        className="form-control"
                                      />
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="form-group mb-3">
                                      <label
                                        className="form-label"
                                        htmlFor="dateRange"
                                      >
                                        To
                                      </label>
                                      <DatePicker
                                        selected={item.endDate}
                                        onChange={(e) =>
                                          handleEmploymentEndDate(e, index)
                                        }
                                        className="form-control"
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-6">
                                  <label className="form-label" htmlFor="city">
                                    City
                                  </label>
                                  <input
                                    onBlur={(event) =>
                                      handleJobUpdate(index, event)
                                    }
                                    type="text"
                                    className="form-control"
                                    name="city"
                                    id="city"
                                  />
                                </div>
                              </div>
                              <div className="row mb-3 gx-3">
                                <div className="col-12">
                                  <label
                                    className="form-label"
                                    htmlFor="description"
                                  >
                                    Description
                                  </label>
                                  <textarea
                                    onBlur={(event) =>
                                      handleJobUpdate(index, event)
                                    }
                                    rows={5}
                                    type="text"
                                    className="form-control"
                                    name="description"
                                    id="description"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className=" row">
                            <div className="col-10"></div>
                            <div className="col-1 pr-2 pb-2">
                              <button
                                onClick={() => {
                                  removeEmployment(index);
                                }}
                                type="button"
                                className="btn btn-outline-secondary btn-lg "
                              >
                                <i className="fa fa-fw fa-trash"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                : null}
            </CardBody>
            <CardFooter className=" d-flex p-3">
              <button
                onClick={() => {
                  addEmployment();
                }}
                className="btn btn-outline-theme me-2 mb-1 ms-2"
              >
                <i className="fa fa-fw fa-plus"></i>
                <span>Add employment</span>
              </button>
            </CardFooter>
          </Card>
          <Card className="mb-4">
            <CardHeader className="d-flex align-items-center bg-inverse bg-opacity-10 fw-400">
              Education
            </CardHeader>
            <CardBody>
              {education.length > 0
                ? education.map((item, index) => {
                    return (
                      <div className="row" key={index}>
                        <div className="col-lg-6">
                          <div className="form-group mb-3">
                            <label className="form-label" htmlFor="school">
                              School
                            </label>
                            <input
                              onBlur={(event) =>
                                handleEducationUpdate(index, event)
                              }
                              name="school"
                              type="text"
                              className="form-control"
                              id="school"
                            />
                          </div>
                          <div className="form-group mb-3">
                            <div>
                              <div className="col-12 row ">
                                <div className="col-5">
                                  <div className="form-group mb-3">
                                    <label
                                      className="form-label"
                                      htmlFor="dateRange"
                                    >
                                      From
                                    </label>
                                    <DatePicker
                                      selected={item.startDate}
                                      onChange={(e) =>
                                        handleEducationStartDate(e, index)
                                      }
                                      className="form-control"
                                    />
                                  </div>
                                </div>
                                <div className="col-5">
                                  <div className="form-group mb-3">
                                    <label
                                      className="form-label"
                                      htmlFor="dateRange"
                                    >
                                      To
                                    </label>
                                    <DatePicker
                                      selected={item.endDate}
                                      onChange={(e) =>
                                        handleEducationEndDate(e, index)
                                      }
                                      className="form-control"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group mb-3">
                            <label className="form-label" htmlFor="degree">
                              Degree
                            </label>
                            <input
                              onBlur={(event) =>
                                handleEducationUpdate(index, event)
                              }
                              type="text"
                              name="degree"
                              className="form-control"
                              id="degree"
                            />
                          </div>
                          <div className="form-group mb-3">
                            <label className="form-label" htmlFor="schoolCity">
                              City
                            </label>
                            <input
                              onBlur={(event) =>
                                handleEducationUpdate(index, event)
                              }
                              name="schoolCity"
                              type="text"
                              className="form-control"
                              id="schoolCity"
                            />
                          </div>
                        </div>
                        <div className=" row">
                          <div className="col-11"></div>
                          <div className="col-1 pb-2">
                            <button
                              onClick={() => {
                                removeEmployment(index);
                              }}
                              type="button"
                              className="btn btn-outline-secondary btn-lg "
                            >
                              <i className="fa fa-fw fa-trash"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                : null}
            </CardBody>
            <CardFooter className=" d-flex p-3">
              <button
                onClick={() => {
                  addEducation();
                }}
                className="btn btn-outline-theme me-2 mb-1 ms-2"
              >
                <i className="fa fa-fw fa-plus"></i>
                <span>Add education</span>
              </button>
            </CardFooter>
          </Card>
          <Card className="mb-4">
            <CardHeader className="d-flex align-items-center bg-inverse bg-opacity-10 fw-400">
              Skills
            </CardHeader>
            <CardBody>
              <div className="row mb-3 gx-3">
                <div className="col-12">
                  <div className="p-3 bg-white bg-opacity-10">
                    <div className="form-group mb-0">
                      <div className="shipping-container">
                        {skills.length > 1
                          ? skills.map((item, index) => {
                              return (
                                <React.Fragment>
                                  {index !== 0 ? (
                                    <hr className="mt-2 mb-2" />
                                  ) : null}

                                  <div
                                    key={index}
                                    className="row align-items-center"
                                  >
                                    <div className="col-6 pt-1 pb-1">
                                      {item.Focus || item.focus}
                                    </div>
                                    <div className="col-6 d-flex align-items-center">
                                      <div className="form-check form-switch ms-auto">
                                        <TagsInput
                                          value={item.value || item.Value}
                                          name="tagColor"
                                          placeHolder="Add another"
                                          onRemoved={(e) => {
                                            removeTag(e, index);
                                          }}
                                          onChange={(e) => {
                                            addTag(e, index);
                                          }}
                                        />
                                        <label
                                          className="form-check-label"
                                          htmlFor="shippingFree"
                                        >
                                          &nbsp;
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                </React.Fragment>
                              );
                            })
                          : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
          <Card className="mb-4">
            <CardBody>
              <div className="row align-items-center">
                <div className="col-9">
                  <p className="h3">Generate PDF Resume</p>
                </div>
                <div className="col-3">
                  <button
                    onClick={handleSubmit}
                    className="btn btn-outline-theme btn-lg rounded-0 w-200vw"
                  >
                    <i className="bi bi-send-check fa-lg"></i>
                    <br />
                    <span className="small">Generate Resume</span>
                  </button>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
        <div
          className="d-flex col-6 align-items-center align-content-center justify-content-center"
          style={{ padding: "8px" }}
        >
          {xhrInFlight ? (
            <Dna
              visible={true}
              height="100vh"
              width="100vw"
              ariaLabel="dna-loading"
              wrapperClass="dna-wrapper"
            />
          ) : null}
          {createResume ? (
            <PDFViewer style={{ height: "100%", width: "100%" }}>
              <BasicResume
                techResume={{
                  title: techResume.title,
                  workExperiences: techResume.workExperiences || [],
                  educationExperiences: techResume.educationExperiences || [],
                  skills: techResume.skills,
                  aboutMe: techResume.aboutMe,
                }}
                techProfile={{
                  name: techProfile.name,
                  email: techProfile.email,
                  phone: phoneNumber,
                  website: techProfile.website,
                  location: techProfile.location,
                }}
              />
            </PDFViewer>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default PagesProductDetails;
