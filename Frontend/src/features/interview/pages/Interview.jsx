import React, { useState, useEffect} from 'react'
import '../style/interview.scss'
import {useInterview} from "../hooks/useInterview"
import {useNavigate, useParams} from "react-router"

const Interview = () => {
  const [activeSection, setActiveSection] = useState('roadmap')
  const [expandedTechnical, setExpandedTechnical] = useState(null)
  const [expandedBehavioral, setExpandedBehavioral] = useState(null)
  const {report, getRportById, loading, getResumePdf} = useInterview()

  const {interviewId} = useParams()
  
 useEffect(() => {
    if (interviewId) {
      getRportById(interviewId)
    } 
 }, [interviewId])

    if(loading || !report) {
        return (
            <main className = 'loading-screen'>
              <h1>Loading your interview plan...</h1>
            </main>
        )
    }

    console.log(report);                   // <-- Add this
    console.log(report?.preperationPlan);  // <-- And this
        

  return (
    <main className='interview'>
      <div className='interview-container'>
        {/* Left Sidebar */}
        <aside className='sidebar left-sidebar'>
          <nav className='sidebar-nav'>
            <div className='nav-section'>
              <h3 className='nav-section-title'>SECTIONS</h3>
              <button 
                className={`nav-item ${activeSection === 'technical' ? 'active' : ''}`}
                onClick={() => setActiveSection('technical')}
              >
                <span className='nav-icon' aria-hidden='true'>
                  <svg viewBox='0 0 24 24' fill='none'>
                    <path d='M4 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7Z' stroke='currentColor' strokeWidth='1.8' />
                  </svg>
                </span>
                Technical Questions
              </button>
              <button 
                className={`nav-item ${activeSection === 'behavioral' ? 'active' : ''}`}
                onClick={() => setActiveSection('behavioral')}
              >
                <span className='nav-icon' aria-hidden='true'>
                  <svg viewBox='0 0 24 24' fill='none'>
                    <path d='M12 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z' stroke='currentColor' strokeWidth='1.8' />
                    <path d='M5 19a7 7 0 0 1 14 0' stroke='currentColor' strokeWidth='1.8' />
                  </svg>
                </span>
                Behavioral Questions
              </button>
              <button 
                className={`nav-item ${activeSection === 'roadmap' ? 'active' : ''}`}
                onClick={() => setActiveSection('roadmap')}
              >
                <span className='nav-icon' aria-hidden='true'>
                  <svg viewBox='0 0 24 24' fill='none'>
                    <path d='M12 2v20M2 12h20' stroke='currentColor' strokeWidth='1.8' />
                  </svg>
                </span>
                Road Map
              </button>
            </div>
          </nav>
        <button 
        onClick={() => getResumePdf(interviewId)}
        className = "button primary-button" >
          <svg  height= {"0.8rem"} style ={{marginRight:"0.8rem"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10.6144 17.7956 11.492 15.7854C12.2731 13.9966 13.6789 12.5726 15.4325 11.7942L17.8482 10.7219C18.6162 10.381 18.6162 9.26368 17.8482 8.92277L15.5079 7.88394C13.7092 7.08552 12.2782 5.60881 11.5105 3.75894L10.6215 1.61673C10.2916.821765 9.19319.821767 8.8633 1.61673L7.97427 3.75892C7.20657 5.60881 5.77553 7.08552 3.97685 7.88394L1.63658 8.92277C.868537 9.26368.868536 10.381 1.63658 10.7219L4.0523 11.7942C5.80589 12.5726 7.21171 13.9966 7.99275 15.7854L8.8704 17.7956C9.20776 18.5682 10.277 18.5682 10.6144 17.7956ZM19.4014 22.6899 19.6482 22.1242C20.0882 21.1156 20.8807 20.3125 21.8695 19.8732L22.6299 19.5353C23.0412 19.3526 23.0412 18.7549 22.6299 18.5722L21.9121 18.2532C20.8978 17.8026 20.0911 16.9698 19.6586 15.9269L19.4052 15.3156C19.2285 14.8896 18.6395 14.8896 18.4628 15.3156L18.2094 15.9269C17.777 16.9698 16.9703 17.8026 15.956 18.2532L15.2381 18.5722C14.8269 18.7549 14.8269 19.3526 15.2381 19.5353L15.9985 19.8732C16.9874 20.3125 17.7798 21.1156 18.2198 22.1242L18.4667 22.6899C18.6473 23.104 19.2207 23.104 19.4014 22.6899Z"></path></svg>
          Download Resume 
        </button>
          
        </aside>

        {/* Center Content */}
        <section className='main-content'>
          {/* Technical Questions Section */}
          {activeSection === 'technical' && (
            <>
              <div className='roadmap-header'>
                <div>
                  <h1>Technical Questions</h1>
                  <p className='roadmap-duration'>{report?.technicalQuestions.length} questions</p>
                </div>
              </div>

              <div className='questions-list'>
                {report?.technicalQuestions.map((item, idx) => (
                  <div key={idx} className='question-card'>
                    <button 
                      className='question-header'
                      onClick={() => setExpandedTechnical(expandedTechnical === idx ? null : idx)}
                    >
                      <span className='question-number'>{idx + 1}</span>
                      <h3 className='question-text'>{item.question}</h3>
                      <span className={`dropdown-icon ${expandedTechnical === idx ? 'expanded' : ''}`}>
                        <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                          <path d='M6 9l6 6 6-6' />
                        </svg>
                      </span>
                    </button>
                    {expandedTechnical === idx && (
                      <div className='question-details'>
                        <div className='detail-item'>
                          <span className='detail-label'>Intention:</span>
                          <p className='detail-content'>{item.intention}</p>
                        </div>
                        <div className='detail-item'>
                          <span className='detail-label'>Answer Guide:</span>
                          <p className='detail-content'>{item.answer}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Behavioral Questions Section */}
          {activeSection === 'behavioral' && (
            <>
              <div className='roadmap-header'>
                <div>
                  <h1>Behavioral Questions</h1>
                  <p className='roadmap-duration'>{report?.behavioralQuestions.length} questions</p>
                </div>
              </div>

              <div className='questions-list'>
                {report?.behavioralQuestions.map((item, idx) => (
                  <div key={idx} className='question-card'>
                    <button 
                      className='question-header'
                      onClick={() => setExpandedBehavioral(expandedBehavioral === idx ? null : idx)}
                    >
                      <span className='question-number'>{idx + 1}</span>
                      <h3 className='question-text'>{item.question}</h3>
                      <span className={`dropdown-icon ${expandedBehavioral === idx ? 'expanded' : ''}`}>
                        <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                          <path d='M6 9l6 6 6-6' />
                        </svg>
                      </span>
                    </button>
                    {expandedBehavioral === idx && (
                      <div className='question-details'>
                        <div className='detail-item'>
                          <span className='detail-label'>Intention:</span>
                          <p className='detail-content'>{item.intention}</p>
                        </div>
                        <div className='detail-item'>
                          <span className='detail-label'>Answer Guide:</span>
                          <p className='detail-content'>{item.answer}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Preparation Plan Section */}
          {activeSection === 'roadmap' && (
            <>
              <div className='roadmap-header'>
                <div>
                  <h1>Preperation Road Map</h1>
                  <p className='roadmap-duration'>7-day plan</p>
                </div>
              </div>

              <div className='timeline'>
                {report?.preperationPlan.map((item, idx) => (
                  <div key={item.day} className='timeline-item'>
                    <div className='timeline-dot'></div>
                    {idx !== report?.preperationPlan.length - 1 && <div className='timeline-line'></div>}

                    <div className='timeline-content'>
                      <div className='day-header'>
                        <span className='day-label'>Day {item.day}</span>
                        <h3 className='day-title'>{item.focus}</h3>
                      </div>
                      <ul className='day-tasks'>
                        {item.tasks.map((task, taskIdx) => (
                          <li key={taskIdx}>{task}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </section>

        {/* Right Sidebar */}
        <aside className='sidebar right-sidebar'>
          <div className='sidebar-section match-section'>
            <h2 className='section-label'>MATCH SCORE</h2>
            <div className='match-circle'>
              <span className='match-value'>{report.matchScore}</span>
              <span className='match-percent'>%</span>
            </div>
            <p className='match-message'>{report?.skillMessage}</p>
          </div>

          <div className='sidebar-section'>
            <h2 className='section-label'>SKILL GAPS</h2>
            <div className='skill-tags'>
              {report?.skillGaps.map((gap, idx) => (
                <span key={idx} className={`skill-tag severity-${gap.severity}`}>
                  {gap.skill}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </main>
  )
}

export default Interview