import React from 'react'
import './Home.scss';
import CustomerCount from '../../components/CustomerCount/CustomerCount'

const Home = () => {

  return (
    <div className="container">

      <h3>BlazeMe Assessment - <a href="https://github.com/Joshykins/blazeme-assessment">Source</a></h3>
      <h5>Project By Joshua Roelle</h5>
      <p>This is the blazeme assessment I wrote, the web application marks off each of the required steps and some bonus.</p>
      <ul>
        <li>
          It uses MongoDB, specifically a free tier of one that <a href="https://www.mongodb.com">mongodb</a> offers.
        </li>
        <li>
          It uses dependency injection to inject the services that the nodeJS backend uses.
        </li>
        <li>
          It has a population script to populate the database. It connects with a 3rd party api by the name of <a href="https://uinames.com">uinames.com</a>.
          <ul>
            <li>
              <CustomerCount />
            </li>
          </ul>
        </li>
        <li>You can create a customer using a form.</li>
        <li>
          It integrates with AG-Grid.
          <ul>
            <li>It uses the infinite scrolling AG grid to connect to the backend endpoints</li>
            <li>Within each of the columns you can run a unique search</li>
            <li>You can also sort by each column</li>
            <li>You can delete customers from the grid</li>
            <li>It paginates perfectly fine with all 100,000+ customers.</li>
          </ul>
        </li>
        <li>Redux was used for customers, logging, and fetching data <ul>
          <li>
            Redux Core Middleware.
            <ul>
              <li>Logger Middleware: Log anything in the application, only in development</li>
            </ul>
            <ul>
              <li>API Middleware: This handles all outgoing requests using axios. It sends out actions based on whether those request succed of fail.</li>
            </ul>
          </li>
          <li>Redux Application Middleware
            <ul>
              <li>Customer Middleware: Handles all the customer related actions</li>
            </ul>
          </li>
        </ul>
        </li>
      </ul>
    </div>
  );
};


export default Home;