const { GoogleGenAI } = require('@google/genai')
const z = require('zod')
const {zodToJsonSchema} = require('zod-to-json-schema')


const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
})

const interviewReportSchema = z.object({
    matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's resume and self-description match the job description."),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked during the interview"),
        intention: z.string().describe("The intention of interviewerbehind asking the question"),
        answer: z.string().describe("How to answer the question, what points to cover, what approach to take, etc.")
    })).describe("Technical questions that can be asked during the interview along with the intention behind asking them and how to answer them."),

    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The behavioral question can be asked during the interview"),
        intention: z.string().describe("The intention of interviewer behind asking the question"),
        answer: z.string().describe("How to answer the question, what points to cover, what approach to take, etc.")
    })).describe("Behavioral questions that can be asked during the interview along with the intention behind asking them and how to answer them."),

    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill that the candidate is lacking"),
        severity: z.enum(["low", "medium", "high"]).describe("The severity of the skill gap"),
    })).describe("List of skill gaps that the candidate has along with the severity."),

    preperationPlan: z.array(z.object({
        day: z.number().describe("The day number in the preparation plan, starting from 1"),
        focus: z.string().describe("The main focus of the day in the preparation plan, e.g., 'Data Structures and Algorithms', 'System Design', 'mock interviews', etc."),
        tasks: z.array(z.string()).describe("The list of tasks to be done on that day in the preparation plan, e.g., read a specific book chapter, solve a set of problems, watch a specific video, etc.")
    })).describe("A day wise preparation plan for the candidate to follow in order to improve their chances of success in the interview."),
    title: z.string().describe("The title of the job for which the interview report is generated"),


})

async function generateInterviewReport({resume, selfDescription, jobDescription}) {

    const prompt = `Generate an interview report for a candidate based on the following information:
                    Resume: ${resume}
                    Self Description: ${selfDescription}
                    Job Description: ${jobDescription}`

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: 'application/json',
            responseSchema: zodToJsonSchema(interviewReportSchema)
        },

    })

    

    return JSON.parse(response.text);
}

module.exports = { generateInterviewReport };