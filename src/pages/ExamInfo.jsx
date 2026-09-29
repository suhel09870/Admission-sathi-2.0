import { Link, useParams } from "react-router-dom";

const examInfo = {
  "jee-main": {
    name: "JEE Main",
    fullName: "Joint Entrance Examination (Main)",
    category: "Engineering",
    level: "National",
    authority: "National Testing Agency (NTA)",

    purpose:
      "JEE Main is conducted for admission to undergraduate engineering and related programs, including B.E. and B.Tech programs at participating institutions.",

    eligibility:
      "Eligibility requirements depend on the applicable examination year, qualifying examination and admission rules. Candidates should check the current official information bulletin before applying.",

    courses:
      "B.E. / B.Tech, B.Arch and B.Planning",

    pattern:
      "The examination includes computer-based papers with subjects and marking schemes defined in the official examination bulletin.",

    dates:
      "Important dates, application windows and examination schedules are announced by NTA through the official JEE Main website.",

    application:
      "Visit the official JEE Main website for the current application process and application portal.",

    officialWebsite: "https://jeemain.nta.nic.in/",
    applicationLink: "https://jeemain.nta.nic.in/",
  },

  "jee-advanced": {
    name: "JEE Advanced",
    fullName: "Joint Entrance Examination (Advanced)",
    category: "Engineering",
    level: "National",
    authority: "JEE (Advanced) Organizing Institute / IITs",

    purpose:
      "JEE Advanced is used for admission to undergraduate academic programs at participating Indian Institutes of Technology (IITs).",

    eligibility:
      "Candidates must satisfy the eligibility requirements specified in the applicable JEE Advanced information brochure, including the qualifying JEE Main requirement where applicable.",

    courses:
      "Undergraduate programs offered through participating IITs",

    pattern:
      "The examination consists of papers and question formats specified in the official JEE Advanced information brochure.",

    dates:
      "Registration dates, examination dates and fee-payment deadlines are published in the official JEE Advanced information brochure.",

    application:
      "Candidates should use the official JEE Advanced website for registration and examination-related services.",

    officialWebsite: "https://jeeadv.ac.in/",
    applicationLink: "https://jeeadv.ac.in/",
  },

  bitsat: {
    name: "BITSAT",
    fullName: "Birla Institute of Technology and Science Admission Test",
    category: "Engineering",
    level: "University",
    authority: "Birla Institute of Technology & Science (BITS) Pilani",

    purpose:
      "BITSAT is an entrance examination used for admission to eligible first-degree programs at BITS Pilani campuses.",

    eligibility:
      "Eligibility depends on the applicable BITSAT admission year and program. Candidates should check the official BITSAT brochure for the current requirements.",

    courses:
      "B.E., M.Sc. and B.Pharm. first-degree programs, subject to applicable admission rules",

    pattern:
      "BITSAT is a computer-based online entrance test. The official brochure provides the detailed examination structure and marking information.",

    dates:
      "Application, test-session, admission and preference-form dates are published by BITS Pilani on the official BITS admission website.",

    application:
      "Applications and admission-related services are provided through the official BITS admission website.",

    officialWebsite: "https://www.bitsadmission.com/",
    applicationLink: "https://www.bitsadmission.com/",
  },

  "neet-ug": {
    name: "NEET UG",
    fullName: "National Eligibility cum Entrance Test (UG)",
    category: "Medical",
    level: "National",
    authority: "National Testing Agency (NTA)",

    purpose:
      "NEET UG is the common national entrance examination used for undergraduate medical education and is also applicable to specified health-related undergraduate programs under the applicable regulations.",

    eligibility:
      "Eligibility requirements are defined in the applicable NEET UG information bulletin and include qualifying examination and other conditions specified for the examination year.",

    courses:
      "MBBS, BDS and other programs covered by the applicable NEET UG admission rules",

    pattern:
      "The examination pattern, subjects, marking scheme and language options are specified in the official NEET UG information bulletin.",

    dates:
      "Application dates, examination dates, correction windows and other important events are announced by NTA through the official NEET UG website.",

    application:
      "Candidates should use the official NEET UG website for the current application process.",

    officialWebsite: "https://neet.nta.nic.in/",
    applicationLink: "https://neet.nta.nic.in/",
  },

  "neet-pg": {
    name: "NEET PG",
    fullName: "National Eligibility cum Entrance Test (Postgraduate)",
    category: "Medical",
    level: "Postgraduate",
    authority: "National Board of Examinations in Medical Sciences (NBEMS)",

    purpose:
      "NEET PG is used as the entrance examination route for postgraduate medical admissions under the applicable national admission framework.",

    eligibility:
      "Eligibility depends on the applicable NEET PG information bulletin and the requirements specified by the relevant medical admission authorities.",

    courses:
      "Postgraduate medical programs such as MD and MS, subject to applicable admission rules",

    pattern:
      "The examination pattern, syllabus, marking scheme and other requirements are specified by NBEMS in the applicable information bulletin.",

    dates:
      "Registration, examination and other important dates are announced by NBEMS through its official NEET PG information page.",

    application:
      "Candidates should use the official NBEMS NEET PG portal for current registration and application information.",

    officialWebsite:
      "https://natboard.edu.in/",
    applicationLink:
      "https://webmail.natboard.edu.in/viewnbeexam?exam=neetpg",
  },

  "cuet-ug": {
    name: "CUET UG",
    fullName: "Common University Entrance Test (UG)",
    category: "University",
    level: "National",
    authority: "National Testing Agency (NTA)",

    purpose:
      "CUET UG provides a common entrance examination route for undergraduate admissions at participating universities and institutions.",

    eligibility:
      "Eligibility varies according to the participating university, program and applicable admission requirements. Candidates must check the current information bulletin and university requirements.",

    courses:
      "Undergraduate programs offered by participating universities and institutions",

    pattern:
      "The test structure, subject choices and examination rules are specified in the current CUET UG information bulletin.",

    dates:
      "Application, examination, correction and result-related dates are announced by NTA through the official CUET UG website.",

    application:
      "Candidates should use the official CUET UG website for the current application process.",

    officialWebsite: "https://cuet.nta.nic.in/",
    applicationLink: "https://cuet.nta.nic.in/",
  },

  "cuet-pg": {
    name: "CUET PG",
    fullName: "Common University Entrance Test (PG)",
    category: "University",
    level: "Postgraduate",
    authority: "National Testing Agency (NTA)",

    purpose:
      "CUET PG provides a common entrance examination route for postgraduate admissions at participating universities and institutions.",

    eligibility:
      "Eligibility depends on the participating university, program and applicable admission requirements. Candidates should check the current CUET PG information bulletin.",

    courses:
      "Postgraduate programs offered by participating universities and institutions",

    pattern:
      "The examination structure, subjects and other rules are specified in the current CUET PG information bulletin.",

    dates:
      "Application and examination schedules are announced by NTA through its official CUET PG information pages.",

    application:
      "Candidates should use the official NTA CUET PG portal for the current application process.",

    officialWebsite:
      "https://exams.nta.nic.in/cuet-pg/",
    applicationLink:
      "https://exams.nta.nic.in/cuet-pg/",
  },
};

export default function ExamInfo() {
  const { examId } = useParams();

  const exam = examInfo[examId?.toLowerCase()];

  if (!exam) {
    return (
      <main className="exam-info-page">
        <section className="exam-info-empty">
          <span className="page-eyebrow">
            EXAM DISCOVERY
          </span>

          <h1>Exam not found.</h1>

          <p>
            The exam information you are looking for is not
            available.
          </p>

          <Link
            to="/exams"
            className="exam-info-back"
          >
            ← Back to Exams
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="exam-info-page">

      <section className="exam-info-hero">

        <Link
          to={`/exams/${exam.category.toLowerCase()}`}
          className="exam-info-back-link"
        >
          ← Back to {exam.category} Exams
        </Link>

        <div className="exam-info-hero-content">

          <div>
            <span className="page-eyebrow">
              EXAM INFORMATION
            </span>

            <h1>{exam.name}</h1>

            <p className="exam-info-full-name">
              {exam.fullName}
            </p>

            <div className="exam-info-badges">
              <span>{exam.category}</span>
              <span>{exam.level}</span>
              <span>{exam.authority}</span>
            </div>
          </div>

        </div>

      </section>


      <section className="exam-info-content">

        <div className="exam-info-heading">
          <span>ABOUT THE EXAM</span>

          <h2>
            Everything you need to know.
          </h2>

          <p>
            Review the purpose, eligibility, courses,
            examination information and official resources
            before applying.
          </p>
        </div>


        <div className="exam-info-grid">

          <article className="exam-info-card">
            <span>PURPOSE</span>

            <h3>
              Why is it conducted?
            </h3>

            <p>
              {exam.purpose}
            </p>
          </article>


          <article className="exam-info-card">
            <span>ELIGIBILITY</span>

            <h3>
              Who can apply?
            </h3>

            <p>
              {exam.eligibility}
            </p>
          </article>


          <article className="exam-info-card">
            <span>COURSES</span>

            <h3>
              What can you apply for?
            </h3>

            <p>
              {exam.courses}
            </p>
          </article>


          <article className="exam-info-card">
            <span>AUTHORITY</span>

            <h3>
              Who conducts it?
            </h3>

            <p>
              {exam.authority}
            </p>
          </article>


          <article className="exam-info-card">
            <span>EXAM PATTERN</span>

            <h3>
              How is the exam conducted?
            </h3>

            <p>
              {exam.pattern}
            </p>
          </article>


          <article className="exam-info-card">
            <span>IMPORTANT DATES</span>

            <h3>
              What dates should you track?
            </h3>

            <p>
              {exam.dates}
            </p>
          </article>

        </div>


        <section className="exam-info-apply">

          <div>
            <span>
              OFFICIAL INFORMATION
            </span>

            <h2>
              Ready to check the official details?
            </h2>

            <p>
              Admission Saathi provides an overview.
              Always verify the latest eligibility, dates,
              fees and application instructions on the
              official examination website.
            </p>
          </div>


          <div className="exam-info-buttons">

            <a
              href={exam.applicationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="exam-apply-button"
            >
              Apply / Registration ↗
            </a>

            <a
              href={exam.officialWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="exam-official-button"
            >
              Official Website ↗
            </a>

          </div>

        </section>


        <section className="exam-info-notice">

          <strong>
            Important
          </strong>

          <p>
            Examination dates, eligibility criteria,
            application fees, admission rules and other
            requirements can change. Always verify the
            latest information from the official examination
            authority before applying.
          </p>

        </section>

      </section>

    </main>
  );
}