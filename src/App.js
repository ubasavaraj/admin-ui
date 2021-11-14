import {Component} from 'react'
import Loader from 'react-loader-spinner'
import ReactPaginate from 'react-paginate'

import Items from './components/Items'

import './App.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
}

class App extends Component {
  state = {
    list: [],
    apiStatus: apiStatusConstants.initial,
    offset: 0,
    perPage: 10,
    currentPage: 1,
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const apiUrl = `https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    console.log(response)
    if (response.ok) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      const {offset, perPage} = this.state
      const slice = fetchedData.slice(offset, offset + perPage)
      const updatedData = slice.map(item => ({
        ...item,
        value: false,
      }))

      this.setState({
        list: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  onClickbtn = id => {
    const {list} = this.state
    const updatedList = list.filter(each => each.id !== id)

    this.setState({
      list: updatedList,
    })
  }

  handleChange = id => {
    this.setState(prevState => ({
      list: prevState.list.map(li =>
        li.id === id ? {...li, value: !li.value} : li,
      ),
    }))
  }

  handleClick = () => {
    this.setState(prevState => ({
      list: prevState.list.filter(li => !li.value),
    }))
  }

  handlePageClick = () => {
    const {perPage, selectedPage} = this.state
    const offset1 = selectedPage * perPage

    this.setState({
      offset: offset1,
    })
  }

  renderListView = () => {
    const {list, checkedBoxes, currentPage} = this.state
    return (
      <>
        <input type="text" placeholder="search by name, email,role" />
        <ui>
          {list.map(item => (
            <Items
              list={item}
              checkedBoxes={checkedBoxes}
              key={item.id}
              handleChange={this.handleChange}
              onClickbtn={this.onClickbtn}
            />
          ))}
        </ui>
        <button onClick={this.handleClick} type="button">
          Delete
        </button>
        <ReactPaginate
          previousLabel="prev"
          nextLabel="next"
          breakLabel="..."
          breakClassName="break-me"
          pageCount={currentPage}
          marginPagesDisplayed={2}
          pageRangeDisplayed={10}
          onPageChange={this.handlePageClick}
          containerClassName="pagination"
          subContainerClassName="pages pagination"
          activeClassName="active"
        />
      </>
    )
  }

  renderLoadingView = () => (
    <div testId="restaurants-list-loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderListView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }
}

export default App
