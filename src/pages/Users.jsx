import Heading from "../ui/Heading";
import Row from "../ui/Row";
import UserTable from "../features/users/UserTable";
import UserTableOperations from "../features/users/UserTableOperations";
import { UserSelectionProvider } from "../context/UserSelectionContext";

function Users() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All users</Heading>
        <UserTableOperations />
      </Row>
      <UserSelectionProvider>
        <UserTable />
      </UserSelectionProvider>
    </>
  );
}

export default Users;
