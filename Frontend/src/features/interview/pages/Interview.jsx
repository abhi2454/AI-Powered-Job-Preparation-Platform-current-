import React, { useState } from 'react'
import '../style/interview.scss'
import {useInterview} from "../hooks/useInterview"

const Interview = () => {
  const [activeSection, setActiveSection] = useState('preperationPlan')
  const [expandedTechnical, setExpandedTechnical] = useState(null)
  const [expandedBehavioral, setExpandedBehavioral] = useState(null)
  const {report} = useInterview()

  
 

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
          {activeSection === 'preparationPlan' && (
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