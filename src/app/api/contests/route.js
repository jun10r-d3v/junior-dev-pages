import { NextResponse } from "next/server";
import crypto from "crypto";

export async function GET(){
    const API_KEY = process.env.API_KEY;
    const API_SECRET = process.env.API_SECRET_KEY;
    const GROUP_CODE = "eScIVDG1u2";
    
    if(!API_KEY || !API_SECRET){
        return NextResponse.json(
            {error: "Missing API_KEY or API_SECRET_KEY"},
            {status: 500},
        );
    }

    const method = "contest.list";

    const params = {
        groupCode: GROUP_CODE,
        apiKey: API_KEY,
        time: Math.floor(Date.now() / 1000),
    };

    const paramStr = Object.keys(params)
        .sort()
        .map(k => `${k}=${params[k]}`)
        .join("&");
        
    const rand = Math.floor(100000 + Math.random() * 900000).toString();
    const sigBase = `${rand}/${method}?${paramStr}#${API_SECRET}`;
    
    const hash = crypto
    .createHash("sha512")
    .update(sigBase)
    .digest("hex");
    
    const apiSig = rand + hash;
    
    const url = new URL(`https://codeforces.com/api/${method}`);
    url.search = new URLSearchParams({
        ...params,
        apiSig,
    }).toString();
    
    const res = await fetch(url, { cache: "no-store" });
    const data = await res.json();

    const contests = data.result.map(contest => {
        const start = new Date(contest.startTimeSeconds * 1000);
        const end = new Date((contest.startTimeSeconds + contest.durationSeconds) * 1000);

        const dateFormatter = new Intl.DateTimeFormat("en-GB", {
            timeZone: "Asia/Bangkok",
            day: "2-digit",
            month: "short",
            year: "numeric"
        });

        const timeFormatter = new Intl.DateTimeFormat("en-GB", {
            timeZone: "Asia/Bangkok",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false
        });

        return {
            id: contest.id,
            name: contest.name,
            phase: contest.phase,
            date: `${dateFormatter.format(start)} ${timeFormatter.format(start)} - ${dateFormatter.format(end)} ${timeFormatter.format(end)}`,
            linkTo: `https://codeforces.com/group/${GROUP_CODE}/contest/${contest.id}`,
        }
    });
    
    return NextResponse.json(contests);
}