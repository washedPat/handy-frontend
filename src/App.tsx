import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import './App.css';

// Components
import Header from './Header';
import NewIssue from './NewIssue';
import SearchIssues from './SearchIssues';
import IssueCard, { Issue } from './IssueCard';

interface APIResponse {
  top3: Issue[];
}

function App() {
  const [popularIssues, updateIssues] = useState([] as Issue[]);

  useEffect(() => {
    async function fetchData() {
      const url = 'https://handy-os.herokuapp.com/api/getpopular';
      try {
        const response = await fetch(url);
        const issuesData: APIResponse = await response.json();

        const issues = (await issuesData).top3;
        updateIssues(issues);
      } catch {
        console.log('API not running');
      }
    }

    fetchData();
  }, []);

  return (
    <div className="App h-screen overflow-y-auto w-screen bg-gray-800">
      <Header></Header>

      <div className='w-5/6 h-2 mx-auto rounded
      bg-gradient-to-r from-purple-800 to-purple-900'>
      </div>

      <Router>
        <Switch>
          <Route path="/newissue">
            <NewIssue></NewIssue>
          </Route>
          <Route path="/issues">
            <SearchIssues></SearchIssues>
          </Route>
          <Route path="/">
            <div>
              <h2 className='text-center my-6 text-5xl'>Who Are You?</h2>

                <div className='grid grid-cols-2 content-evenly place-items-center text-center'>
                <div className='landing-card'>
                  <h2 className='text-3xl'>
                    Project Manager
                  </h2>
                  <p className='w-2/3 text-lg'>
                    Do you need help on your open source projects, but they can't seem to gain any traction?
                    Upload your projects and issues to our platform, and we'll automatically
                    send bright coders your way!
                  </p>
                  <button className='button'>
                    <Link to="/newissue">Start Now!</Link>
                  </button>
                </div>

                <div className='landing-card'>
                  <h2 className='text-3xl'>
                    Open Source Contributor
                  </h2>
                  <p className='w-2/3 text-lg'>
                    Do you want to contribute to open source software, but don't know
                    where to start? Don't know where you can help? Don't worry! Our system
                    will match you with the issues you're equipped to deal with.
                  </p>
                  <button className='button'>
                    <Link to="/issues">Start Now!</Link>
                  </button>
                </div>
              </div>
              
              {
                (popularIssues.length !== 0)
                ? <div className='w-2/3 mx-auto h-auto my-6 mt-12
                bg-gray-800 hover:bg-gray-900
                transition duration-300 ease-in-out
                border-gray-900 border-2 rounded-md'>
                    <h2 className='text-center text-5xl my-6'>Check Out These Popular Issues</h2>
                    {
                      popularIssues.map((issue, i) => {
                        return <IssueCard issue={issue} key={i}></IssueCard>
                      })
                    }
                </div>
                : <div></div>
              }  
            </div>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
