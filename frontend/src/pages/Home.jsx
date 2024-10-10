import React from 'react'
 import OrderList from '../components/orderList'
 import StatusCards from '../components/StatusCards'
import Heading from '../components/Heading'
import Navbar from '../components/Navbar'
function Home() {
  return (
    <div>
      <Navbar/>
      <Heading/>
      <StatusCards totalEarnings={10000} totalOrders={150} totalCustomers={75} />

      <OrderList/>

    </div>
  )
}

export default Home
