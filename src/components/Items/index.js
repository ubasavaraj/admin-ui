import {MdDelete} from 'react-icons/md'

import './index.css'

const Items = props => {
  const {list, onClickbtn, handleChange} = props
  const {id, name, email, role, value} = list
  const onDelete = () => {
    onClickbtn(id)
  }
  const onhandleChange = () => {
    handleChange(id)
  }

  return (
    <li className="list-item">
      <input
        type="checkbox"
        id={id}
        checked={value}
        onChange={onhandleChange}
      />
      <div>
        <label htmlFor={id} className="container">
          <p>{name}</p>
          <p>{email}</p>
          <p>{role}</p>
          <button onClick={onDelete} type="button">
            <MdDelete />
          </button>
        </label>
      </div>
    </li>
  )
}

export default Items
