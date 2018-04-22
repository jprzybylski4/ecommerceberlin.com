
import dynamic from 'next/dynamic'
import _get from 'lodash/get'


import {
  MyHead as Head
} from '../next'

import reduxPage from '../redux'

import {
  TicketDownload,
  Typography,
  Wrapper,
  ColumnList,
  MyTypography,
  Schedule,
  Googlemap
} from '../components';

import Layout from '../layouts/main';
import Visitor from '../roles/Visitor'
import {fetcher} from '../helpers'
const Bookingmap = dynamic(import("../components/Bookingmap"))


class PageTicket extends React.Component {


static async getInitialProps({err, req, res, pathname, query, asPath, isServer, store})
{

  const person = `code/${query.hash}`

  const results =  await fetcher({[person] : false, exhibitors : false})

  return {
    person : results.getData(person),
    code : query.hash,
    exhibitors : results.getData("exhibitors"),
    eventId: _get(results.getMeta(person), "active_event_id", 0)
  }

}

render()
{

  const { url, code, person, exhibitors } = this.props;

  console.log(person)

  const name = `${_get(person, "fname", "")} ${_get(person, "lname", "")}`;

  return (<Layout>

    <Head
      url={ url.asPath }
      titleLabel={["visitors.opengraph.title", {
          name : name,
          location : 'Kraków', date : '25 kwietnia 2018'}]}
    />



    <Wrapper first label={["visitors.thankyou", { name : _get(person, "fname", "") }]}>

      <TicketDownload code={code} />

    </Wrapper>


    <Wrapper
      first
      label="presenters.schedule"
      secondaryTitle="Expo start 10:00, Prezentacje start 11:15, Wstęp BEZPŁATNY (wymagana rejestracja)"
    >
      <Schedule  />

    </Wrapper>

    <Wrapper
      label="exhibitors.map.title"
      secondaryTitle="Chcesz się wystawić? Zostało tylko kilka stoisk!"
      >
      {/* <WidthAwareInfo /> */}
      <Bookingmap  />
    </Wrapper>


    <Wrapper label="exhibitors.list_full" color="#ffffff">
      <ColumnList data={ exhibitors } />
    </Wrapper>



    <Wrapper label="visitors.register_alt">
          <Visitor />
    </Wrapper>


    {/* <Googlemap /> */}


  </Layout>)
}

}


export default reduxPage( PageTicket )
