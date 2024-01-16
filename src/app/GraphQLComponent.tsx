import axios from "axios";

const graphqlQuery = `
{
    viewer {
        login
        name
        repositories(first: 10) {
            nodes {
                name
                description
                url
            }
        }
    }
}
`;

export default function GithubGraphqlAPI() {}
