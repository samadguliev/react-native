import axios from "axios";
import strings from "../../utils/strings";
import moment from "moment";

export const ADD_TRAINING = 'ADD_TRAINING';

export function addTraining(name, date, time, duration, accessToken) {

  const dataValue = moment(date.toISOString()).format( `YYYY.MM.DD`);
  const timeValue = moment(time.toISOString()).format( `hh:mm:ss`);

  const params = new URLSearchParams({
    name,
    date: `${dataValue} ${timeValue}`,
    duration,
  });

  return dispatch => {
    axios({
      url: `${strings.base_url}/trainings/add/`,
      method: 'post',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: params,
    })
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          dispatch({type: ADD_TRAINING});
        }
      })
  }
}