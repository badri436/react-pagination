import { useEffect, useState } from 'react';
import './App.css';
import axios from "axios"
import ReactPaginate from "react-paginate"
import { Spinner } from "react-bootstrap";
function App() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState("")

  const [currentPage, setCurrentPage] = useState(1)
  const fetchComments = async () => {
    const { data } = await axios.get(`https://api.punkapi.com/v2/beers?page=${currentPage}&per_page=10`)
    setItems(data)
    setLoading(true)
  }

  const handlePageClick = async (data) => {
    setCurrentPage(data.selected + 1)

  }
  useEffect(() => {
    fetchComments()
  }, [currentPage])
  return (
    <div className="App">
      <input className='input' style={{ "alignItems": "center" }} placeholder='Enter name' type={"search"} onChange={(e) => setSearch(e.target.value)} />
      {loading ? (

        <table class="table">
          <thead>
            <tr >
              <th scope="col">id</th>
              <th scope="col">name</th>
              <th scope="col">tagline</th>
              <th scope="col">ph</th>
              <th scope='col'>target_fg</th>
              <th scope='col'>ibu</th>
              <th scope='col'>ebc</th>
            </tr>
          </thead>
          {items.filter((val) => {
            if (search == "") {
              return val
            } else if (val.name.toLowerCase().includes(search.toLowerCase())) {
              return val
            }
          }).map((item) => {
            return (
              <tbody>
                <tr key={item.id}>
                  <th scope="row">{item.id}</th>
                  <td>{item.name}</td>
                  <td>{item.tagline}</td>
                  <td>{item.ph}</td>
                  <td>{item.target_fg}</td>
                  <td>{item.ibu}</td>
                  <td>{item.ebc}</td>
                </tr>


              </tbody>
            )
          })}
        </table>
      ) : (
        <Spinner animation="grow" />
      )}

      <ReactPaginate
        previousLabel={'previous'}
        nextLabel={'next'}
        pageCount={33}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={'pagination justify-content-center'}
        pageClassName={'page-item'}
        pageLinkClassName={'page-link'}
        previousClassName={'page-item'}
        previousLinkClassName={'page-link'}
        nextClassName={'page-item'}
        nextLinkClassName={'page-link'}
        breakLinkClassName={'page-link'}
        breakClassName={'page-item'}
        activeClassName={'active'}
      />
    </div>
  );
}

export default App;
