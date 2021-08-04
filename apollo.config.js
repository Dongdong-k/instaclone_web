module.exports = {
  client: {
    includes: ["./src/**/*.{tsx, ts}"], // 탐색 대상 폴더 및 파일 설정
    tagName: "gql", // Apollo 찾아야 할 태그
    service: {
      name: "Instaclone-backend",
      url: "http://localhost:4000/graphql", // 백엔드 서버주소 설정
    },
  },
};
