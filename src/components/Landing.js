import { useEffect } from 'react';

function Landing() {
    useEffect(() => {
        console.log("\n\n\nChecking to see if tokens exist...\n\n\n");
        console.log(`Bearer: ${localStorage.getItem("bearerToken")}`)
        console.log(`Refresh: ${localStorage.getItem("refreshToken")}`)
        console.log("\n\n\n");
    }, []);
    return (
        <div>
            <h1>Welcome to My Movie Lookup</h1>
        </div>
    )
}

export default Landing