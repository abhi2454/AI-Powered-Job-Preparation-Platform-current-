import React,{useState, useRef} from 'react'
import "../style/home.scss"
import { useInterview } from '../hooks/useInterview'
import { useNavigate } from 'react-router'

const Home = () => {
    
    const {loading, generateReport} = useInterview()
    const [jobDescription, setJobDescription] = useState("")
    const [selfDescription, setSelfDescription] = useState("")
    const resumeInputRef = useRef()

    const navigate = useNavigate()


    const handleGenerateReport = async () => {
        const resumeFile = resumeInputRef.current.files[0]

        const data = await generateReport({jobDescription, selfDescription, resumeFile})
        navigate(`/interview/${data._id}`)
    }

    if(loading) {
        return (
            <main className='loading-screen'>
                <h1>Loading your interview plan...</h1>
            </main>
        )
    }

  return (
        <main className='home'>
            <section className='home-shell'>
                <header className='hero'>
                    <h1>
                        Create Your Custom <span>Interview Plan</span>
                    </h1>
                    <p>
                        Let our AI analyze the job requirements and your unique profile to build a winning strategy.
                    </p>
                </header>

                <section className='interview-card'>
                    <div className='columns'>
                        <section className='panel left-panel'>
                            <div className='panel-head'>
                                <h2>
                                    <span className='title-icon' aria-hidden='true'>
                                        <svg viewBox='0 0 24 24' fill='none' role='presentation'>
                                            <path
                                                d='M4.5 8a2.5 2.5 0 0 1 2.5-2.5h10A2.5 2.5 0 0 1 19.5 8v8a2.5 2.5 0 0 1-2.5 2.5H7A2.5 2.5 0 0 1 4.5 16V8Z'
                                                stroke='currentColor'
                                                strokeWidth='2'
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                            />
                                            <path
                                                d='M9 5.5v13M15 5.5v13M4.5 10.5h15'
                                                stroke='currentColor'
                                                strokeWidth='2'
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                            />
                                        </svg>
                                    </span>
                                    Target Job Description
                                </h2>
                                <span className='badge'>Required</span>
                            </div>

                            <div className='textarea-wrap large'>
                                <textarea
                                    onChange={(e) =>{setJobDescription(e.target.value)}}
                                    name='jobDescription'
                                    id='jobDescription'
                                    maxLength={5000}
                                    placeholder="Paste the full job description here...
e.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'"
                                />
                                <span className='counter'>0 / 5000 chars</span>
                            </div>
                        </section>

                        <section className='panel right-panel'>
                            <div className='panel-head'>
                                <h2>
                                    <span className='title-icon' aria-hidden='true'>
                                        <svg viewBox='0 0 24 24' fill='none' role='presentation'>
                                            <path
                                                d='M12 11.5a3.25 3.25 0 1 0 0-6.5 3.25 3.25 0 0 0 0 6.5Z'
                                                stroke='currentColor'
                                                strokeWidth='2'
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                            />
                                            <path
                                                d='M5.5 18.5a6.5 6.5 0 0 1 13 0'
                                                stroke='currentColor'
                                                strokeWidth='2'
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                            />
                                        </svg>
                                    </span>
                                    Your Profile
                                </h2>
                            </div>

                            <div className='upload-group'>
                                <p className='field-label'>
                                    Upload Resume <span className='badge badge-inline'>Best Results</span>
                                </p>
                                <input ref= {resumeInputRef} hidden type='file' name='resume' id='resume' accept='.pdf,.doc,.docx' />
                                <label className='dropzone' htmlFor='resume'>
                                    <span className='dropzone-icon' aria-hidden='true'>
                                        <svg viewBox='0 0 24 24' fill='none' role='presentation'>
                                            <path
                                                d='M6.5 17.5a3.7 3.7 0 0 1 .2-7.4 5 5 0 0 1 9.6-1.7 3.4 3.4 0 1 1 1 9.1H6.5Z'
                                                stroke='currentColor'
                                                strokeWidth='2'
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                            />
                                            <path
                                                d='M12 14.5V10m0 0-2 2M12 10l2 2'
                                                stroke='currentColor'
                                                strokeWidth='2'
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                            />
                                        </svg>
                                    </span>
                                    <strong>Click to upload or drag and drop</strong>
                                    <small>PDF or DOCX (Max 5MB)</small>
                                </label>
                            </div>

                            <div className='divider'>OR</div>

                            <div className='self-group'>
                                <p className='field-label'>Quick Self-Description</p>
                                <div className='textarea-wrap'>
                                    <textarea
                                        onChange={(e) =>{setSelfDescription(e.target.value)}}
                                        name='selfDescription'
                                        id='selfDescription'
                                        placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
                                    />
                                </div>
                            </div>

                            <p className='note'>
                                Either a Resume or a Self Description is required to generate a personalized plan.
                            </p>
                        </section>
                    </div>

                    <footer className='card-footer'>
                        <p>AI-Powered Strategy Generation · Approx 30s</p>
                        <button 

                            type='button' className='generate-btn' onClick={handleGenerateReport}>
                            Generate My Interview Strategy
                        </button>
                    </footer>
                </section>

                <nav className='legal-links' aria-label='Legal and support'>
                    <a href='#'>Privacy Policy</a>
                    <a href='#'>Terms of Service</a>
                    <a href='#'>Help Center</a>
                </nav>
            </section>
        </main>
  )
}

export default Home