import React, { useState, useContext, useEffect } from 'react'
import { TableContainer, TableHead, TableBody, TableCell, TableRow, Table, Button, TableFooter, TablePagination } from '@material-ui/core';
import { multiStepContext } from '../Register/StepContext';
import { Link, useNavigate } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import InfoIcon from '@material-ui/icons/Info';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import './Listing.css'
const Listing = () => {
    const { deleteData, setIsLoggedIn } = useContext(multiStepContext);
    const navigate = useNavigate()
    const [empData, setEmpData] = useState([]);
    const [postsPerPage, setpostPerpage] = useState(2);
    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = empData.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= Math.ceil(empData.length / postsPerPage)) {
          setCurrentPage(pageNumber);
        }
      };
      
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(empData.length / postsPerPage); i++) {
        pageNumbers.push(i)
    }

    useEffect(() => {
        fetch("http://localhost:3001/contacts").then((res) => {
            return res.json();
        }).then((data) => {
            // console.log(data);
            setEmpData(data);
        }).catch((err) => console.log(err))
    }, [])

    useEffect(() => {
        let userName = sessionStorage.getItem('email');
        if (userName == "" || userName == null) {
            navigate('/')
        }
    })

    return (
        <div>
            <Link style={{ marginLeft: '50px', fontSize: '20px' }} to={'/'}><ArrowBackIcon /></Link>
            <TableContainer style={{ display: 'flex', justifyContent: 'center' }}>
                <Table border='1' style={{ width: '70%', justifyContent: 'center' }} size='small'>

                    <TableHead>
                        <TableRow className='tableHead' style={{ backgroundColor: 'rgb(101 178 67)', color: 'white', textAlign: "center" }}>
                            <TableCell >ID</TableCell>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Contact Number</TableCell>
                            <TableCell>Email Address</TableCell>
                            <TableCell>Country</TableCell>
                            {/* <TableCell>District</TableCell> */}
                            <TableCell>City</TableCell>
                            <TableCell>Landmark</TableCell>
                            <TableCell>Postal Code</TableCell>
                            <TableCell>Actions</TableCell>
                            <TableCell>View</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody className='empdisplaybody'>
                        {
                            currentPosts &&
                            currentPosts.map((data, index) => {
                                return (
                                    <>
                                        <TableRow key={data.id} className='emptablerow'>
                                            <TableCell>{data.id}</TableCell>
                                            <TableCell>{data.firstname}</TableCell>
                                            <TableCell>{data.lastname}</TableCell>
                                            <TableCell>{data.contact}</TableCell>
                                            <TableCell>{data.email}</TableCell>
                                            <TableCell>{data.country}</TableCell>
                                            {/* <TableCell>{data.password}</TableCell> */}
                                            <TableCell>{data.city}</TableCell>
                                            <TableCell>{data.landmark}</TableCell>
                                            <TableCell>{data.pincode}</TableCell>
                                            <TableCell style={{ display: 'flex', gap: '4px' }}>
                                                <Button startIcon={<EditIcon />} onClick={() => { navigate('/edit/' + data.id, { state: { data: data } }); }} color='primary' variant='outlined'> </Button>
                                                <Button startIcon={<DeleteIcon />} onClick={() => deleteData(data.id)} color='secondary' variant='outlined'> </Button>
                                            </TableCell>
                                            <TableCell>
                                                <Button startIcon={<InfoIcon />} onClick={() => navigate('/details/' + data.id)} variant='outlined'>INFO </Button>
                                            </TableCell>
                                        </TableRow>
                                    </>
                                )
                            })
                        }
                    </TableBody>
                    {/* <TableFooter>
                        <TablePagination
                        rowsPerPage={[5,10,25,{label:'All',value:-1}]}
                        count={empData.length}
                        />
                    </TableFooter> */}
                </Table>
            </TableContainer>
            <br />
            <div className="paginate">
                <ul style={{ display: 'flex',alignItems:'center', textDecoration: 'none', listStyle: 'none', gap: '10px' }}>
                <button onClick={()=>{paginate(currentPage-1);console.log(currentPage)}}>prev</button>
                    {
                        pageNumbers.map((page) => (
                            <li key={page}><a onClick={() => paginate(page)} href="#">{page}</a></li>
                        ))
                    }
                <button onClick={()=>{paginate(currentPage+1);console.log(currentPage)}}>next</button>
                </ul>
            </div>
            <div className="logoutBtn" style={{ display: 'felx', position: "absolute", bottom: "20px", right: '20px' }}>
                <Button style={{ backgroundColor: 'red', color: 'white' }} startIcon={<ExitToAppIcon />} onClick={() => { setIsLoggedIn(false); navigate('/') }} color='primary' variant='outlined'> Log Out</Button>
            </div>
        </div>
    )
}

export default Listing