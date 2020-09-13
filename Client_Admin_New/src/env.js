const ENV = "DEV";

export default {
    API: ENV === "DEV" ? "http://localhost:3001" : "https://api.firesidebot.com",
    CLIENT_ID: ENV === "DEV" ? "523288111321710613" : "441338104545017878",
    REDIRECT: ENV === "DEV" ? "http%3A%2F%2Flocalhost%3A3000%2F" : "https%3A%2F%2Fadmin.firesidebot.com%2F",
    TEST_API: "https://api.firesidebot.com"
};