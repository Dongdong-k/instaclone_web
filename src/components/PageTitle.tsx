import { Helmet } from "react-helmet";

const PageTitle = ({ title }: any) => {
  return (
    <Helmet>
      <title>{title} | Instaclone</title>
    </Helmet>
  );
};
export default PageTitle;
