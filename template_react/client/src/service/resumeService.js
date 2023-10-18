import axios from "axios";
import * as helpers from "./serviceHelpers";

const baseUrl = "http://localhost:3001";

const generateResume = (data) => {
  const config = {
    method: "POST",
    url: `${baseUrl}/api/generate`,
    crossdomain: true,
    data,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config)
    .then(helpers.onGlobalSuccess)
    .catch(helpers.onGlobalError);
};

const ping = () => {
  const config = {
    method: "GET",
    url: `http://localhost:3001/api/ping`,
    crossdomain: true,

    headers: { "Content-Type": "application/json" },
  };

  return axios(config)
    .then(helpers.onGlobalSuccess)
    .catch(helpers.onGlobalError);
};

const generateJobTitle = (data) => {
  const config = {
    method: "POST",
    url: `http://localhost:3001/api/skills`,
    crossdomain: true,
    data,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config)
    .then(helpers.onGlobalSuccess)
    .catch(helpers.onGlobalError);
};

const reformatJobDescription = (data) => {
  const config = {
    method: "POST",
    url: `http://localhost:3001/api/employement`,
    crossdomain: true,
    data,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config)
    .then(helpers.onGlobalSuccess)
    .catch(helpers.onGlobalError);
};

const generateSummary = (data) => {
  const config = {
    method: "POST",
    url: `http://localhost:3001/api/summary`,
    crossdomain: true,
    data,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config)
    .then(helpers.onGlobalSuccess)
    .catch(helpers.onGlobalError);
};

export {
  generateResume,
  ping,
  generateJobTitle,
  reformatJobDescription,
  generateSummary,
};
