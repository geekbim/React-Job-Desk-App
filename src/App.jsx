import React, { Component, Fragment } from 'react'
import Axios from 'axios'
import './App.css'
// import DatePicker from "react-datepicker"
// import DatePicker1 from "react-datepicker"
import $ from 'jquery'

class App extends Component {
  
  state = {
      showdata : [],
      startDate: new Date().toLocaleDateString(),
      startDate1: new Date().toLocaleDateString()
    }

getDataAPI = () => {
  Axios.get('http://localhost:3004/data')
  .then((res) => {
    console.log(res)
    const newSantriData = res.data.map((item) => {
      return {
        todos: [
          // {
          //   title: '',
          //   status: '',
          //   start_date: new Date(),
          //   due_date: new Date() 
          // }
        ],
        ...item
      }
    })
      this.setState({
          showdata: newSantriData
      })
  })
}

// handleChange = date => {
//   this.setState({
//     startDate: date
//   });
// }

// handleChange1 = date => {
//   this.setState({
//     startDate1: date
//   });
// }

componentDidMount() {
  this.getDataAPI()
}

addTodo = (indexKonten) => {
  this.setState( state => {
    const santriList = state.showdata
    santriList[indexKonten].todos.push({
      title: ['title', 'title1', 'title2'],
      status: ['status', 'status1', 'status2'],
      start_date: new Date(),
      due_date: new Date() 
    })
    return {
      showData: santriList
    }
  })
}

handleChangeDate = () => {
  $('[data-toggle="datepicker"]').datepicker({autoHide: true})
}

removeRow = nameClass => {
  console.log(nameClass)
  // const cl = `.tr-class-${nameClass}`
  // const el = document.querySelector(cl)
  // el.parentNode.removeChild(el)
  $(`.tr-class-${nameClass}`).remove()
}

// addRow = element => {
//   const baris = document.querySelector(`.${element}`)
  
//   function insertAfter(el, referenceNode) {
//       referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
//   }
//   let newEl = document.createElement('tr')
//   newEl.innerHTML = `
//   <td onclick=this.parentNode.remove(this)><button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button></td>
//   <td colSpan="2" width="500px"><input type="text" className="input-title" style="border: none;
//   width: 500px; outline-width: 0;" value="asd"/></td>
//   <td width="150px"><input type="text" className="input-status" style="border: none; width: 80%; outline-width: 0;" value="asd"/></td>
//   <td width="0%"><input type="date" className="input-status" style="border: none; width: 100%; outline-width: 0;" value="2019-11-11"/></td>
//   <td width="0%"><input type="date" className="input-status" style="border: none; width: 100%; outline-width: 0;" value="2019-11-14"/></td>
//   `
//   insertAfter(newEl, baris)
// }

render() {
  return (

    <div className="mx-3 my-3">
      <table className="table table-bordered">
          <thead>
              <tr>
                  <th scope="col" width="20px" className="pb-4">No</th>
                  <th scope="col" colSpan="2" width="500px" className="pb-4">Title</th>
                  <th scope="col" width="200px" className="pb-4">Status</th>
                  <th scope="col" width="150px" className="pb-4">Start Date</th>
                  <th scope="col" className="pb-4">Due Date</th>
              </tr>
          </thead>
          <tbody>
              {
                this.state.showdata.map((konten, indexKonten) => {
                    return (
                      <Fragment>
                        <tr key={indexKonten}>
                          <th scope="row">{indexKonten+1}</th>
                          <td colSpan="2" width="500px" className="text-primary font-weight-bold"  onClick={() => this.addTodo(indexKonten)}>{konten.title}</td>
                          <td width="200px"></td>
                          <td width="150px"></td>
                          <td width="150px"></td>
                        </tr>
                        {
                          konten.todos.map((todo, indexTodo) => {
                           return (
                               <tr key={indexTodo} className={`tr-class-${indexTodo}`}>
                                  <td onClick={() => this.removeRow(indexTodo)}><button type="button" className="close" aria-label="Close"><span aria-hidden="true">&times;</span></button></td>
                                  
                                  <td colSpan="2" width="500px"><input type="text" className="input-title" defaultValue={todo.title[indexTodo]}/></td>

                                  <td width="150px"><input type="text" className="input-status" defaultValue={todo.status[indexTodo]} /></td>

                                  <td >
                                    <input data-toggle="datepicker" className="input-date" onClick={this.handleChangeDate} defaultValue={this.state.startDate}/>
                                  </td>
                                  
                                  {/* <td>
                                    <DatePicker1
                                      className="input-date"
                                      selected={this.state.startDate1}
                                      onChange={this.handleChange1}
                                    />
                                  </td> */}

                                  <td >
                                    <input data-toggle="datepicker" className="input-date" onClick={this.handleChangeDate} defaultValue={this.state.startDate1}/>
                                  </td>
                               </tr>
                           ) 
                          })
                        }
                      </Fragment>
                      )
                  })
              }
            </tbody>
        </table>
    </div>
    );
  }
}




export default App
