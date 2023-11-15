"use client"
import { useEffect, useState } from 'react';

function CountDown({ pageName }) {
    const [countdown, setCountdown] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {

        const countdownDate = new Date("2023/06/10").getTime();

        const updateCountdown = () => {
            const now = new Date().getTime();
            const distance = countdownDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            setCountdown({ days, hours, minutes, seconds });
        };

        const interval = setInterval(updateCountdown, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
    }, []);

    return (
        <div className='container border border-dark text-center mt-5'>
            <h1 className='text-uppercase'>{pageName} Page</h1>
            <hr />
            <div className='container mt-5  text-center'>
                <table className="table table-bordered table-hover table-secondary text-center">
                    <thead>
                        <tr className='h1'>
                            <th>Days</th>
                            <th>Hours</th>
                            <th>Minutes</th>
                            <th>Minutes</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='h1'>
                            <td>{countdown.days}</td>
                            <td>{countdown.hours}</td>
                            <td>{countdown.minutes}</td>
                            <td>{countdown.seconds}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CountDown;
