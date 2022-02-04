import React from "react";

export const Schedule = ({ type, set_date }) => {

  const onChangeSpecific = () => {
    let result = []
    let date_time = document.querySelectorAll('.specific_date')
    date_time.forEach((data) => {
      let d = data as HTMLInputElement
      result.push(d.value)
    })
    set_date(`${result[0]} at ${result[1]}`)
  }

  const onChangeDaily = () => {
    let time = document.querySelector('.daily') as HTMLInputElement
    set_date(time.value)
  }

  const onChangeWeekly = () => {
    let result = []
    let date_time = document.querySelectorAll('.weekly')
    date_time.forEach((data) => {
      let d = data as HTMLInputElement
      result.push(d.value)
    })
    set_date(`${result[0]} at ${result[1]}`)
  }

  if (type == 'no-repeat') {
    return (
      <></>
    )
  }
  if (type == 'specific-date') {
    return (
      <div className="report_details">
        <p className="report_label">Date</p>
        <input className="specific_date" key={1} type="date" defaultValue="2019-05-22" onChange={onChangeSpecific} />at
        <input className="specific_date" key={2} type="time" defaultValue="13:00" onChange={onChangeSpecific} />
      </div>
    )
  }
  if (type == 'daily') {
    return (
      <div className="report_details">
        <p className="report_label">Everyday at</p>
        <input className="daily" key={3} type="time" defaultValue="13:00" onChange={onChangeDaily} style={{ marginLeft: 0 }} />
      </div>
    )
  }
  if (type == 'weekly') {
    return (
      <div className="report_details">
        <p className="report_label">Every</p>
        <select className="weekly" name="days" defaultValue="Wednesday" onChange={onChangeWeekly}>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
          <option value="Saturday">Saturday</option>
          <option value="Sunday">Sunday</option>
        </select>
        at
        <input className="weekly" key={4} type="time" defaultValue="13:00" onChange={onChangeWeekly} />
      </div>
    )
  }

  return <></>
}

export default Schedule;