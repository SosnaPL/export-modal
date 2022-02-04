import React, { useState, useEffect } from "react";
import '../styles/modal.scss';
import { Button } from 'react-bootstrap';
import Schedule from '../components/schedule';

export const Main = () => {

  const [name, setName] = useState("")
  const [format, setFormat] = useState("excel")
  const [email, setEmail] = useState("")
  const [schedule, setSchedule] = useState("no-repeat")
  const [date, setDate] = useState("")
  const [notification, setNotification] = useState("")
  const [submitDisabled, setSubmitDisabled] = useState(true)

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const onChangeName = (event) => {
    setName(event.target.value)
  }

  const onChangeFormat = (event) => {
    setFormat(event.target.value);
  }

  const onChangeEmail = (event) => {
    if (validateEmail(event.target.value)) {
      setEmail(event.target.value);
    }
  }

  const onChangeSchedule = (event) => {
    setSchedule(event.target.value);
  }

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('name', name)
    formData.append('format', format)
    formData.append('email', email)
    formData.append('schedule', schedule)
    formData.append('date', date)

    fetch("https://postman-echo.com/post", {
      method: "POST",
      body: formData
    })
      .then(response => response.json())
      .then(() => {
        setNotification("Report exported!")
        const confirm = document.querySelector('.notification') as HTMLElement
        confirm.style.color = 'green'
        confirm.style.opacity = '1'
        setTimeout(() => {
          confirm.style.opacity = '0'
        }, 1000)
      })
      .catch(() => {
        setNotification("Failed to export report!")
        const error = document.querySelector('.notification') as HTMLElement
        error.style.color = 'red'
        error.style.opacity = '1'
        setTimeout(() => {
          error.style.opacity = '0'
        }, 1000)
      });
  }

  useEffect(() => {
    if (name && email && date) {
      setSubmitDisabled(false)
    }
    else {
      setSubmitDisabled(true)
    }
  }, [name, email, date])


  return (
    <div className="export_modal">
      <div className="modal_header">
        <p>
          Export Report
        </p>
      </div>
      <div className="modal_body">
        <div className="report_details">
          <p className="report_label">Report Name</p>
          <input type="text" placeholder="Shareablee Report" onChange={onChangeName} />
        </div>
        <div className="report_details">
          <p className="report_label">Report Format</p>
          <div className="report_format" onChange={onChangeFormat}>
            <div className="format_type"><input type="radio" value="excel" name="format" defaultChecked /> Excel</div>
            <div className="format_type"><input type="radio" value="csv" name="format" /> CSV</div>
          </div>
        </div>
        <div className="report_details">
          <p className="report_label">E-mail to</p>
          <input type="email" placeholder="client@company.com" onChange={onChangeEmail} />
        </div>
        <div className="report_details">
          <p className="report_label">Schedule</p>
          <div className="report_format" onChange={onChangeSchedule}>
            <div className="format_type"><input type="radio" value="no-repeat" name="schedule" defaultChecked /> No Repeat</div>
            <div className="format_type"><input type="radio" value="specific-date" name="schedule" /> Specific Date</div>
            <div className="format_type"><input type="radio" value="daily" name="schedule" /> Daily</div>
            <div className="format_type"><input type="radio" value="weekly" name="schedule" /> Weekly</div>
          </div>
        </div>
        <Schedule type={schedule} set_date={setDate} />
      </div>
      <div className="modal_footer">
        <p className="notification">{notification}</p>
        <Button className="btn btn-light">Cancel</Button>
        <Button className="btn btn-dark" disabled={submitDisabled} onClick={(handleSubmit)}>OK</Button>
      </div>
    </div>
  );
};

export default Main;