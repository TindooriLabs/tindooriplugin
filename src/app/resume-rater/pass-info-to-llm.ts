import OpenAI from "openai";
import type { Resume } from "lib/redux/types";

const key = "fill-in-your-key-here";

export const rateResume = async (jobDescription: string, resume: Resume) => {
    const openai = new OpenAI({apiKey: key, dangerouslyAllowBrowser: true});

    const systemContent = "You are an HR Assistant. I will give you a job description, and when you receive resume content, rate the content out of 10 based on the job description and also provide feedback. Here's the job description: \n" + jobDescription;
    const userContent = resumeToString(resume);

    const completion = await openai.chat.completions.create({
        messages: 
        [
            { role: "system", content: systemContent }, 
            { role: "user", content: userContent }
        ],
        model: "gpt-4o-mini",
      });
      console.log("api call complete?\n");
      return completion.choices[0].message.content;
}



export const resumeToString = (resume: Resume): string => {
    var result = "name: " + resume.profile.name + "\n";
    result = result + "email: " + resume.profile.email + "\n";
    result = result + "phone: " + resume.profile.phone + "\n";
    result = result + "url: " + resume.profile.url + "\n";
    result = result + "summary: " + resume.profile.summary + "\n";
    result = result + "location: " + resume.profile.location + "\n\n";

    result = result + "work experiences: \n\n";

    for (var workExp of resume.workExperiences) {
        var Descriptions = "";

        for (var desc of workExp.descriptions) {
            Descriptions = Descriptions + ", " + desc;
        }

        result = result + 
                `company: ${workExp.company}\n\
                 job title: ${workExp.jobTitle}\n\
                 date: ${workExp.date}\n\
                 descriptions: ${Descriptions}\n\n`;
    }

    result = result + "education: \n\n";

    for (var edu of resume.educations) {
        var Descriptions = "";

        for (var desc of edu.descriptions) {
            Descriptions = Descriptions + ", " + desc;
        }

        result = result + 
                `school: ${edu.school}\n\
                 degree: ${edu.degree}\n\
                 date: ${edu.date}\n\
                 gpa: ${edu.gpa}\n\
                 descriptions: ${Descriptions}\n\n`;
    }

    result = result + "projects: \n\n";

    for (var project of resume.projects) {
        var Descriptions = "";

        for (var desc of project.descriptions) {
            Descriptions = Descriptions + ", " + desc;
        }

        result = result + 
                `project: ${project.project}\n\
                 date: ${project.date}\n\
                 descriptions: ${Descriptions}\n\n`;
    }

    // result = result + "skills: \n\n";



    

    return result;
}