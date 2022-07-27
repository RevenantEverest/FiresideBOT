import React, { useState, useEffect } from 'react';
import CountUp from 'react-countup';

function UserSizeNumber({ api, delay=1, ...props }) {

    const timeoutDuration = delay * 1000;
    const [userSize, setUserSize] = useState(0);
    const [renderCounter, setRenderCounter] = useState(false);

    useEffect(() => {
        api.getDiscordUserSize()
        .then(size => setUserSize(size.data.data))
        .catch(err => console.error(err));
    }, [api]);

    useEffect(() => {
        let timeout = null;
        timeout = setTimeout(() => {
            setRenderCounter(true);
        }, timeoutDuration);

        return () => {
            clearTimeout(timeout);
        };
    }, [userSize, timeoutDuration]);

    return(
        <div 
        {...props}
        style={{
            flex: 1,
            alignItems: "center !important"
        }}
        >
            {renderCounter ? <CountUp duration={2} separator="," end={userSize}  /> : 0}
        </div>
    );
};

export default UserSizeNumber;