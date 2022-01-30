const axios = require('axios');
const services = {};

services.getIssueActor = (issueId) => {
    return axios({
        url: `https://api.linear.app/graphql`,
        method: "POST",
        data: {
            query: `
                query Issue($issueId: String!) {
                    issue(id: $issueId) {
                        history(first: 10) {
                            nodes {
                                updatedAt
                                actor {
                                    id
                                    name
                                },
                                fromState {
                                    name
                                    color
                                },
                                toState {
                                    name
                                    color
                                }
                            }
                        }
                    }
                }
            `,
            variables: {
                issueId
            }
        },
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${process.env.LINEAR_API_KEY}`
        }
    })
};

module.exports = services;