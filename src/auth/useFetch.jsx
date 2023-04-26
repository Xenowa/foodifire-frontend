const useFetch = (url) => {
    const handleGoogle = async (response) => {
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({ credential: response.credential }),
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                if (data?.user) {
                    localStorage.setItem("user", JSON.stringify(data?.user));
                    localStorage.setItem("userDiseases", JSON.stringify(data?.diseases))
                    localStorage.setItem("userReports", JSON.stringify(data?.savedReports))
                    window.location.reload();
                }

                throw new Error(data?.message || data);
            })
            .catch((error) => {
                console.log(error)
            });
    };

    return { handleGoogle };
};

export default useFetch;