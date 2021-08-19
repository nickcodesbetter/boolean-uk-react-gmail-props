// Description
// In this exercise, we are going to practice props.

// We'll use props to break down our email list into smaller components by passing down relevant data.

// We'll use props to break down our app into smaller components by passing down relevant functions.

// Instructions
// - Export this template: https://codesandbox.io/s/react-gmail-props-starter-x1m7w?from-embed
// - Break down App.js into components
//     - You should have an Emails component that renders a list
//     - You should have an Email component that is a list item
// - Pass through the relevant data as props to each component
// - Pass through the relevant functions as props to each component

// Tips
// - Break down the App component by component and make sure the functionality continues to work before moving onto the next section.

// Challenge 1
// - Get the search input to work in the header section so that users can search for emails by title

// Challenge 2
// - Get the emails to open and display an email using conditional rendering and a component similar to day one.

// - You'll need to use the state to keep track of which email is selected and you'll need a component to display the email.

// - Add a back button so users can return to their inbox



import { useState } from 'react'

import initialEmails from './data/emails'

import './App.css'
import Ul from './components/EmailsList'

const getReadEmails = emails => emails.filter(email => !email.read)

const getStarredEmails = emails => emails.filter(email => email.starred)

function App() {
  const [emails, setEmails] = useState(initialEmails)
  const [hideRead, setHideRead] = useState(false)
  const [currentTab, setCurrentTab] = useState('inbox')

  const unreadEmails = emails.filter(email => !email.read)
  const starredEmails = emails.filter(email => email.starred)

  const toggleStar = targetEmail => {
    const updatedEmails = emails =>
      emails.map(email =>
        email.id === targetEmail.id
          ? { ...email, starred: !email.starred }
          : email
      )
    setEmails(updatedEmails)
  }

  const toggleRead = targetEmail => {
    const updatedEmails = emails =>
      emails.map(email =>
        email.id === targetEmail.id ? { ...email, read: !email.read } : email
      )
    setEmails(updatedEmails)
  }

  let filteredEmails = emails

  if (hideRead) filteredEmails = getReadEmails(filteredEmails)

  if (currentTab === 'starred')
    filteredEmails = getStarredEmails(filteredEmails)

  return (
    <div className="app">
      <header className="header">
        <div className="left-menu">
          <svg className="menu-icon" focusable="false" viewBox="0 0 24 24">
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
          </svg>

          <img
            src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r2.png"
            alt="gmail logo"
          />
        </div>

        <div className="search">
          <input className="search-bar" placeholder="Search mail" />
        </div>
      </header>
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className={`item ${currentTab === 'inbox' ? 'active' : ''}`}
            onClick={() => setCurrentTab('inbox')}
          >
            <span className="label">Inbox</span>
            <span className="count">{unreadEmails.length}</span>
          </li>
          <li
            className={`item ${currentTab === 'starred' ? 'active' : ''}`}
            onClick={() => setCurrentTab('starred')}
          >
            <span className="label">Starred</span>
            <span className="count">{starredEmails.length}</span>
          </li>

          <li className="item toggle">
            <label htmlFor="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={hideRead}
              onChange={e => setHideRead(e.target.checked)}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">
        <Ul filteredEmails={filteredEmails}/>
      </main>
    </div>
  )
}

export default App
