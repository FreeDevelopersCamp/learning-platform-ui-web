import { useNavigate } from 'react-router-dom';

import Stat from './Stat.jsx';

function Stats({ users, role }) {
  const navigate = useNavigate();

  const totalAdmins = users.filter((user) => user?.role?.includes('0'));
  const totalOwners = users.filter((user) => user?.role?.includes('1'));
  const totalManagers = users.filter((user) => user?.role?.includes('2'));
  const totalAccountManagers = users.filter((user) =>
    user?.role?.includes('3'),
  );
  const totalContentManagers = users.filter((user) =>
    user?.role?.includes('4'),
  );
  const Instructors = users.filter((user) => user?.role?.includes('5'));
  const totalLearners = users.filter((user) => user?.role?.includes('6'));

  return (
    <>
      <Stat
        title="Total Users"
        data={users}
        onClick={() => navigate(`/${role}/users`)}
      />
      <Stat
        title="Admins"
        data={totalAdmins}
        onClick={() => navigate(`/${role}/users?role=admin`)}
      />
      <Stat
        title="Owners"
        data={totalOwners}
        onClick={() => navigate(`/${role}/users?role=owner`)}
      />
      <Stat
        title="Managers"
        data={totalManagers}
        onClick={() => navigate(`/${role}/users?role=manager`)}
      />
      <Stat
        title="Account Managers"
        data={totalAccountManagers}
        onClick={() => navigate(`/${role}/users?role=account-manager`)}
      />
      <Stat
        title="Content Managers"
        data={totalContentManagers}
        onClick={() => navigate(`/${role}/users?role=content-manager`)}
      />
      <Stat
        title="Instructors"
        data={Instructors}
        onClick={() => navigate(`/${role}/users?role=instructor`)}
      />
      <Stat
        title="Learners"
        data={totalLearners}
        onClick={() => navigate(`/${role}/users?role=learner`)}
      />
    </>
  );
}

export default Stats;
