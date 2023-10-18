export const employmentData = {
  jobTitle: "",
  employer: "",
  dateRange: "",
  city: "",
  description: "",
  startDate: new Date(),
  endDate: new Date(),
};

export const educationData = {
  school: "",
  degree: "",
  schoolCity: "",
  dateRange: "",
  startDate: new Date(),
  endDate: new Date(),
};

export const employerStartDate = (employment, event, index) => {
  const values = [...employment];
  values[index]["startDate"] = event;
  return values;
};

export const employerEndDate = (employment, event, index) => {
  const values = [...employment];
  values[index]["endDate"] = event;
  let today = new Date();
  today = today.toString().split(" ");
  today = today[1] + " " + today[3];
  let startDate = values[index].startDate.toString().split(" ");
  let endDate = event.toString().split(" ");
  let startJoined = startDate[1] + " " + startDate[3];

  let endDateJoined = endDate[1] + " " + endDate[3];
  if (today === endDateJoined) {
    endDateJoined = "Present";
  }

  values[index]["endDate"] = event;
  values[index]["dateRange"] = `${startJoined} - ${endDateJoined}`;
  return values;
};


export const educationStartDate = (education, event, index) => {
  const values = [...education];
  values[index]["startDate"] = event;
  return values
};

export const educationEndDate = (education, event, index) => {
  const values = [...education];
  values[index]["endDate"] = event;
  let today = new Date();
  today = today.toString().split(" ");
  today = today[1] + " " + today[3];
  let startDate = values[index].startDate.toString().split(" ");
  let endDate = event.toString().split(" ");
  let startJoined = startDate[1] + " " + startDate[3];

  let endDateJoined = endDate[1] + " " + endDate[3];
  if (today === endDateJoined) {
    endDateJoined = "Present";
  }

  values[index]["endDate"] = event;
  values[index]["dateRange"] = `${startJoined} - ${endDateJoined}`;

  return values
};