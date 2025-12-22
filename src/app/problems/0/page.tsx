"use client";

import Header from "../../../components/header";
import "../../../styles/subproblems.css";
import Footer from "../../../components/footer";

const Page = () => {
  return (
    <>
      <Header/>
      <div className="main">
        <a className="submit" href="https://codeforces.com/group/eScIVDG1u2/contest/553127/submit?submittedProblemIndex=%22A1%22" target="_blank" rel="noopener noreferrer">
          Submit Code
        </a>
        <div className="pdffile">
          <iframe src="https://docs.google.com/gview?url=https://raw.githubusercontent.com/jun10r-d3v/Pre-POSN1_2024/refs/heads/main/Day1/A1-Beginning/statement.pdf&embedded=true" width="800px" height="600px" sandbox="allow-scripts allow-same-origin"/>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Page;
