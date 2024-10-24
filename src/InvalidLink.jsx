import Alert from "react-bootstrap/Alert";

const InvalidLink = () => {
  return (
    <div className="text-center my-4">
      <Alert variant="danger">
        <Alert.Heading>Invalid Link</Alert.Heading>
        <p>something went wrong please try again</p>
      </Alert>
    </div>
  );
};

export default InvalidLink;
