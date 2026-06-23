import {getAllInterviewReports,generateInterviewReport,getInterviewReportById} from "../services/interview.api"
import {useContext} from "react"
import {InterviewContext} from "../interview.context"

export const useInterview = () => {

    const context = useContext(InterviewContext)

    if(!context) {
        throw new Error("useInterview must be used within an InterviewProvider")
    }

    const {loading ,setLoading, report, setReport, reports, setReports} = context

    const generateReport = async ({jobDescription, selfDescription, resumeFile}) => {
        setLoading(true)
        try {
            const response = await generateInterviewReport({jobDescription,selfDescription, resumeFile}) 
            setReport(response.interviewReport)
        } catch(error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const getRportById = async (InterviewId) => {
        setLoading(true)
        try{
            const response = await getInterviewReportById(InterviewId)
            setReport(response.interviewReport)
        }catch(error) {
            console.log(error)
        }finally {
            setLoading(false)
        }
    }

    const getReports = async () => {
        setLoading(true)
        try {
            const response = await getAllInterviewReports();
            // setReport(response.interviewReports)
            console.log(JSON.stringify(response))
        } catch (error) {
            console.log(error)
        }finally {
            setLoading(false)
        }
    }


    return {loading, report, reports, setLoading, setReport, setReports}
}