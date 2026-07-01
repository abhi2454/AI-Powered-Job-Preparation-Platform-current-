const pdfParse = require('pdf-parse')
const {generateInterviewReport, generateResumePdf} = require('../services/ai.service')
const interviewReportModel = require("../models/interviewReport.model")

/**
 * @description generate new interview report on the basis of user self description ,resume pdf and job description
 */

async function generateInterviewReportController(req, res) {
    try {

        console.log("File:", req.file);
        console.log("Body:", req.body);
        console.log("User:", req.user);

        const resumeContent = await (
            new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))
        ).getText();

        const { selfDescription, jobDescription } = req.body;

        const interviewReportByAi = await generateInterviewReport({
            resume: resumeContent.text,
            selfDescription,
            jobDescription,
        });

        console.log("AI Response:", interviewReportByAi);

        const interviewReport = await interviewReportModel.create({
            user: req.user.id,
            resume: resumeContent.text,
            selfDescription,
            jobDescription,
            ...interviewReportByAi,
        });

        return res.status(201).json({
            message: "Interview Report generated successfully",
            interviewReport,
        });

    } catch (err) {
        console.error("ERROR:", err);

        return res.status(500).json({
            message: err.message,
        });
    }
}


/**
 * @description Controller to get interview report by interviewId
 */

async function getInterviewReportByIdController(req,res){
    
    const {interviewId} = req.params

    const interviewReport = await interviewReportModel.findOne({
        _id: interviewId,
        user: req.user.id,
    })

    if(!interviewReport){
            return res.status(404).json({
                message: "Interview Report not found"
            })
    } 

    res.status(200).json({
        message: "Interview Report fetched successfully",
        interviewReport
    })

}


/**
 * @description Controller to get all interview reports of logged in user
 */


async function getAllInterviewReportsController(req,res){

    const interviewReports = await interviewReportModel.find({ user: req.user.id}).sort({ createdAt: -1 })
    .select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preperationPlan")

    res.status(200).json({
        message: "Interview Reports fetched successfully",
        interviewReports
    })
    

}


/**
 * @description Controller to generate resume pdf on the basis of user self description ,resume pdf and job description
 */


async function generateResumePdfController(req, res) {
    
    const {interviewReportId} = req.params;
    
    
    const interviewReport = await interviewReportModel.findById(interviewReportId)


    if(!interviewReport){ 
        return res.status(404).json({ 
            message: "Interview report not found"
        })
    }

    const {resume, jobDescription, selfDescription} = interviewReport;


    const pdfBuffer = await generateResumePdf({resume, selfDescription, jobDescription})


    res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=resume_${interviewReportId}.pdf`,
    })


    res.send(pdfBuffer);
}


module.exports = { generateInterviewReportController, getInterviewReportByIdController, getAllInterviewReportsController, generateResumePdfController }