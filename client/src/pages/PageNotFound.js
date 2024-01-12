import React from 'react'
import Layout from "../components/Layout/Layout";
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <Layout>
    <div className='container text-center text'>
      <h1 className='text404 p-3'>404</h1>
      <p className='p-4'>Page Not Found</p>
       <Link to="/" className='btn btn-warning'>Back</Link>
    </div>
    </Layout>
  )
}

export default PageNotFound
