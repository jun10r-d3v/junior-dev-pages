"use client";

import React, { useEffect, useState } from "react";
import Header from '../../components/header';
import Footer from "../../components/footer";
import "../../styles/contests.css";

type Contest = {
    id: string;
    name: string;
    phase: string;
    startTimeSeconds: number;
    durationSeconds: number;
};

function formatContestTime(startSeconds:number, durationSeconds:number) {
    const start = new Date(startSeconds * 1000);
    const end = new Date((startSeconds + durationSeconds) * 1000);

    const dateFormatter = new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });

    const timeFormatter = new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
    });

    return `${dateFormatter.format(start)} ${timeFormatter.format(start)} - ${timeFormatter.format(end)}`;
}


export default function Contests() {
    const [contests, setContests] = useState<Contest[]>([]);
    useEffect(() => {
        const second = 1000, minute = second * 60, hour = minute * 60, day = hour * 24;
        const targetDate = new Date("2024-12-30T11:00:00Z").getTime();

        const x = setInterval(function() {
            const now = new Date().getTime();
            const distance = targetDate - now;

            document.getElementById("days")!.innerText = Math.floor(distance / day).toString();
            document.getElementById("hours")!.innerText = Math.floor((distance % day) / hour).toString();
            document.getElementById("minutes")!.innerText = Math.floor((distance % hour) / minute).toString();
            document.getElementById("seconds")!.innerText = Math.floor((distance % minute) / second).toString();

            if (distance < 0) {
                document.getElementById("countdown")!.innerHTML = "<h2>The contest has started!</h2>";
                clearInterval(x);
            }
        }, 1000);
        return () => clearInterval(x);
    }, []);

    useEffect(() => {
        const fetchContests = async() => {
            try{
                const response = await fetch(`/api/contest`);
                const contests = await response.json();
                setContests(contests.result);
            }catch(err){
                console.error(err);
            }
        };
    
        fetchContests();
    }, []);

    return (
        <>
            <Header />
            <div className="main">
                <div className="aurora-container2">
                    <h1 className="aurora-text2">Contests</h1>
                </div>
                <p className="timezone">(Time is displayed as UTC+7 timezone)</p>
                <div className="main_2">
                    {/* opal_Inwza007x Annocument code */}
                    <div className="hero">
                        <div className="text-reveal-container">
                            <h1 className="Upcoming-Contest-text">Upcoming Contest</h1>
                            <h1 className="first-blinking-dot">.</h1>
                            <h1 className="second-blinking-dot">.</h1>
                            <h1 className="third-blinking-dot">.</h1>
                            <br />
                            {/* <div className="moving-frame">
                                <a href="https://juniordev.contest.codeforces.com/group/eScIVDG1u2/contests" target="_blank" rel="noopener noreferrer">
                                    <img className="poster-img" src="https://beta-jdev.vercel.app/Poster_2567NewYearContest.png" alt="Poster" />
                                </a>
                            </div>
                            <br />
                            <div className="countdown-container">
                                <div className="snowflake">❄</div>
                                <div className="snowflake">❄</div>
                                <div className="snowflake">❄</div>
                                <div className="snowflake">❄</div>
                                <div className="snowflake">❄</div>
                                <div className="snowflake">❄</div>
                                <div className="snowflake">❄</div>
                                <div className="snowflake">❄</div>
                                <div className="snowflake">❄</div>
                                <a href="https://juniordev.contest.codeforces.com/group/eScIVDG1u2/contests" target="_blank" rel="noopener noreferrer">
                                    <div className="text-near-timer">New Year Contest</div>
                                </a>
                                <div id="countdown">
                                    <ul>
                                        <li><span id="days"></span> days</li>
                                        <li><span id="hours"></span> Hours</li>
                                        <li><span id="minutes"></span> Minutes</li>
                                        <li><span id="seconds"></span> Seconds</li>
                                    </ul>
                                </div>
                            </div> */}
                            <h1>There Are No Upcoming Contests</h1>
                        </div>
                    </div>
                    {/* opal_Inwza007x Annocument code */}
                    <div className="cont">
                        <p style={{ fontSize: "30px", margin: "20px" , marginLeft: "80vh"}}>
                            Past Contests
                        </p>
                        <div className="container">
                            <div className="right-half">
                                    <div className="list2">
                                        {/* MisterO Upgrade opal_Inwza007x Code!! */}
                                        {contests
                                        .filter(contest => contest.phase === "FINISHED")
                                        .map(contest => (
                                            <div key={contest.id}>
                                            <a className="contest" href={`https://codeforces.com/group/eScIVDG1u2/contest/${contest.id}`} target="_blank" rel="noopener noreferrer">
                                                <div className="flex" style={{ alignItems: "center" }}>
                                                    <div style={{ textAlign: 'center' }} className="flex flex-1 flex-col">
                                                        <b>{contest.name}</b>
                                                          {formatContestTime(contest.startTimeSeconds,contest.durationSeconds)}
                                                    </div>
                                                    <div>
                                                        <img className="platform" src="/codeforces.webp" alt="Codeforces" />
                                                    </div>
                                                </div>
                                            </a>
                                            <br />
                                            </div>
                                        ))}
                                    </div> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
